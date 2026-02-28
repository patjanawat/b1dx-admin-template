# Auth Specification

> **Spec version:** v2.0 (2026-02-28)
> **BE service:** `auth-service` (.NET 8, Dapper, PostgreSQL schema `auth`)
> **FE implementation:** `apps/saas-starter`

---

## 1. Overview

Authentication uses **JWT Access Token + Refresh Token Rotation**.

| Token | Storage | TTL | Notes |
|---|---|---|---|
| Access Token | Memory (JS variable) | 15 min | Lost on page refresh — recovered via refresh flow |
| Refresh Token | `localStorage` (`b1dx_rft`) | 30 days | Opaque `rft_...`, hash-only in DB |

The frontend never stores the access token in `localStorage` or cookies — only the refresh token persists across sessions.

---

## 2. Architecture

```
Browser
  └─ authStore (memory)       ← accessToken, AuthUser
  └─ localStorage             ← refreshToken (b1dx_rft)
  └─ AuthProvider (React)     ← bootstrap / login / logout
  └─ authApi                  ← HTTP calls via gateway proxy

Next.js (server)
  └─ /gateway/proxy/[upstreamKey]/[...path]
       └─ createGatewayHandler (CORE_API_BASE_URL)

BE: auth-service
  └─ POST /api/auth/login
  └─ POST /api/auth/refresh
  └─ POST /api/auth/logout
  └─ GET  /api/auth/me
```

All API calls from the browser go through the **Next.js gateway proxy**:

```
Browser → /gateway/proxy/core/api/auth/*
        → CORE_API_BASE_URL/api/auth/*
```

---

## 3. Token Flow

### 3.1 Login

```
1. POST /api/auth/login { username, password }
2. BE returns { accessToken, refreshToken, expiresIn, user }
3. accessToken  → memory (authStore)
4. refreshToken → localStorage (b1dx_rft)
5. user         → memory (authStore)
6. status       → "authenticated"
```

### 3.2 Bootstrap (page refresh / app load)

```
1. Read refreshToken from localStorage
2. If none → status = "unauthenticated" (redirect to /login)
3. POST /api/auth/refresh { refreshToken }
4. BE rotates token, returns new { accessToken, refreshToken, user }
5. Update memory + localStorage with new tokens
6. status → "authenticated"
```

> Refresh response includes the full `user` profile — no separate `/me` call needed at bootstrap.

### 3.3 Logout

```
1. Read refreshToken from localStorage
2. POST /api/auth/logout { refreshToken }  → BE marks token as LOGOUT
3. Clear memory (accessToken, user)
4. Remove localStorage (b1dx_rft)
5. status → "unauthenticated"
```

> Server errors during logout are silently ignored — client state is always cleared.

### 3.4 Refresh Token Rotation (BE)

Every refresh call atomically:
- Revokes old token (`revoked_reason = ROTATED`)
- Inserts new token (hash-only, SHA-256 UPPERCASE hex)

Both operations run in a single DB transaction.

### 3.5 FE Implementation Flow (Visual)

**App Bootstrap**

```
AuthProvider mount
       │
       ▼
localStorage.getItem("b1dx_rft")
       │
   ┌───┴────────────────────────────┐
  ไม่มี                            มี
   │                                │
   ▼                                ▼
status = "unauthenticated"    authApi.refresh(refreshToken)
(→ redirect /login)               │  POST /api/auth/refresh
                              ┌───┴────┐
                            สำเร็จ   ล้มเหลว
                              │          │
                              ▼          ▼
                        store tokens  clearAuth()
                        status =      status =
                        "authenticated" "unauthenticated"
```

**Login**

```
LoginForm → useLogin() → useAuth().login()
                               │
                               ▼
                         authApi.login({ username, password })
                               │
                               ▼
              apiRequest → fetch /gateway/proxy/core/api/auth/login
                               │
                               ▼
                    Gateway (Next.js route handler)
                               │ forward
                               ▼
                          BE  POST /api/auth/login
                               │
                       ┌───────┴────────┐
                    error              200 { success: true, data: LoginData }
                       │                       │
                       ▼                       ▼
                  throw AuthError       store:
                                        ├─ accessToken → memory (authStore)
                                        ├─ refreshToken → localStorage "b1dx_rft"
                                        └─ user → memory (authStore)
                                        status = "authenticated"
                                        router.replace("/")
```

**Authenticated API Call**

```
component → withAuth()
                │
                ▼
         getAccessToken()   ← memory (authStore)
                │  เพิ่ม Authorization: Bearer <token>
                ▼
         apiRequest → Gateway → BE
```

**Logout**

```
useLogout() → useAuth().logout()
       │
       ▼
authApi.logout({ refreshToken })   ← ยิงไป BE ก่อน (error → ignore)
       │
       ▼
clearAuth()                ← clear memory
setStoredRefreshToken(null) ← clear localStorage
status = "unauthenticated"
```

---

## 4. API Contract

Base URL (via proxy): `/gateway/proxy/core`

### 4.1 POST `/api/auth/login`

**Request**
```json
{
  "username": "string",
  "password": "string",
  "device": { "deviceId": "string?", "userAgent": "string?" },
  "requestedWarehouseId": "number? (optional)"
}
```

**Response `data`**
```json
{
  "accessToken": "eyJ...",
  "tokenType": "Bearer",
  "expiresIn": 900,
  "refreshToken": "rft_...",
  "refreshExpiresIn": 2592000,
  "user": { ...UserProfile }
}
```

### 4.2 POST `/api/auth/refresh`

**Request**
```json
{
  "refreshToken": "rft_...",
  "device": { "deviceId": "string?", "userAgent": "string?" }
}
```

**Response `data`** — same shape as login (includes full `user` profile)

### 4.3 POST `/api/auth/logout`

**Request**
```json
{
  "refreshToken": "rft_...",
  "device": { "deviceId": "string?", "userAgent": "string?" }
}
```

**Response `data`**: `null`

### 4.4 GET `/api/auth/me`

**Authorization:** `Bearer {accessToken}`

**Response `data`** — UserProfile object (fresh roles + scopes from DB)

### 4.5 Response Envelope

All endpoints return:

```json
{
  "success": true,
  "correlationId": "uuid",
  "data": { ... },
  "error": null
}
```

On error:
```json
{
  "success": false,
  "correlationId": "uuid",
  "data": null,
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "Human readable message",
    "details": [{ "field": "username", "issue": "required" }]
  }
}
```

---

## 5. User Profile Shape (`AuthUser`)

```ts
type AuthUser = {
  userId: string;          // bigint as string
  username: string;
  displayName: string;
  status: "ACTIVE" | "LOCKED" | "SUSPENDED";
  tenantId: string | null;
  tenantCode: string | null;
  level: string | null;    // "VIP" | "PREMIUM" | "NORMAL"
  roles: string[];         // e.g. ["SYSTEM_ADMIN"]
  warehouseIds: number[];
  brandIds: string[];
  shopIds: string[];
}
```

---

## 6. Error Handling

### `AuthError` class

All auth API calls throw `AuthError` on failure (not `ApiRequestError`):

```ts
import { AuthError } from "@/lib/auth/authApi";

if (error instanceof AuthError) {
  error.code;       // "AUTH_INVALID_CREDENTIALS"
  error.message;    // Human-readable from BE
  error.httpStatus; // 400 | 401 | 403 | 423 | 500
}
```

### Known Issues

**Error details lost through gateway (2026-02-28)**

BE returns errors as `AuthEnvelope` (`application/json`), แต่ gateway แปลง non-2xx responses ทุกตัวให้เป็น `application/problem+json` (ProblemDetails) โดยทิ้ง body ของ BE ทิ้ง:

```
BE: HTTP 401, application/json
    { "success": false, "error": { "code": "AUTH_INVALID_CREDENTIALS" } }
       │
Gateway: ไม่ใช่ application/problem+json
       → buildUpstreamErrorProblem()
       → { status: 401, detail: "Upstream request failed with status 401." }
       │
apiRequest.tryParseJson: ตรวจ content-type "application/problem+json"
       → ".includes('application/json')" = FALSE → data = null
       │
authRequest: err.data = undefined
       → code = "AUTH_INTERNAL_ERROR"   ← error code จาก BE หาย
       → msg  = "Request failed with 401"
```

ผลกระทบ: `AuthError.code` จะเป็น `"AUTH_INTERNAL_ERROR"` เสมอแทนที่จะเป็น code จริงจาก BE เช่น `"AUTH_INVALID_CREDENTIALS"`

---

### Error Codes

| Code | HTTP | Trigger |
|---|---|---|
| `AUTH_INVALID_CREDENTIALS` | 401 | Username not found or wrong password |
| `AUTH_ACCOUNT_SUSPENDED` | 403 | Account manually suspended |
| `AUTH_ACCOUNT_LOCKED` | 423 | Lockout active (5 failures → 15 min lock) |
| `AUTH_ACCOUNT_INACTIVE` | 401 | Account not ACTIVE (and not SUSPENDED/LOCKED) |
| `AUTH_INVALID_TOKEN` | 401 | JWT invalid or user not found (`/me`) |
| `SCOPE_WAREHOUSE_FORBIDDEN` | 403 | `requestedWarehouseId` not in user's scope |
| `AUTH_REFRESH_BAD_REQUEST` | 400 | Empty or missing refresh token field |
| `AUTH_REFRESH_INVALID` | 401 | Token hash not found in DB |
| `AUTH_REFRESH_REVOKED` | 401 | Token already revoked |
| `AUTH_REFRESH_EXPIRED` | 401 | Token past `expires_at` |
| `AUTH_REFRESH_FAILED` | 500 | Unexpected error during rotation |
| `AUTH_LOGOUT_FAILED` | 500 | Unexpected error during logout |

---

## 7. Security Model

| Concern | Approach |
|---|---|
| Password | BCrypt (`$2a$10$...`) — BE only |
| JWT algorithm | HS256 (symmetric) |
| Refresh token storage | Hash-only (SHA-256 UPPERCASE hex) |
| Lockout | 5 failures → 15 min lock (configurable) |
| Token rotation | Atomic transaction — old revoked + new inserted in one TX |
| Reuse detection | vNext (revoked token → `AUTH_REFRESH_REVOKED` for now) |

---

## 8. Environment Variables

| Variable | Side | Description |
|---|---|---|
| `CORE_API_BASE_URL` | Server | Auth service base URL, e.g. `http://localhost:5000` |
| `NEXT_PUBLIC_MSW` | Client | `1` = enable MSW mock, `0` or unset = hit real BE |

Configure in `.env.local` (use `.env.example` as template).

---

## 9. Key Files

| File | Purpose |
|---|---|
| `src/lib/auth/authStore.ts` | Memory state + localStorage refresh token helpers |
| `src/lib/auth/authApi.ts` | `AuthError`, `authRequest` envelope helper, all auth endpoints |
| `src/lib/auth/AuthProvider.tsx` | React Context — bootstrap, login, logout |
| `src/lib/auth/ProtectedRoute.tsx` | Auth guard (redirects to `/login` if unauthenticated) |
| `src/features/auth/hooks/index.ts` | `useLogin`, `useLogout`, `useForgotPassword` mutations |
| `src/features/auth/components/LoginForm.tsx` | Login UI |
| `src/features/auth/schema/login.schema.ts` | Zod schema for login form |
| `src/app/gateway/proxy/[upstreamKey]/[...path]/route.ts` | Next.js gateway proxy handler |

---

## 10. Account Status

| Status | Behavior |
|---|---|
| `ACTIVE` | Normal login |
| `LOCKED` | Locked by lockout policy → 423 `AUTH_ACCOUNT_LOCKED` |
| `SUSPENDED` | Manually disabled by admin → 403 `AUTH_ACCOUNT_SUSPENDED` |

---

## 11. Backlog (vNext)

- Refresh token family + reuse-detection (revoke entire family on reuse)
- Logout-all (revoke all sessions for a user)
- Device binding enforcement (`device_id`)
- Rate limiting (per IP / tenant / username)
- MFA / OIDC Federation (EntraID / Keycloak)
