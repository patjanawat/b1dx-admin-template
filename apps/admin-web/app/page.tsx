import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-sans, system-ui, sans-serif)",
        padding: "2rem",

        // ✅ ใช้ theme variables
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <section
        style={{
          textAlign: "center",
          maxWidth: 520,
          border: "1px solid var(--border)",
          padding: "2rem",
          borderRadius: "12px",
        }}
      >
        <p
          style={{
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--primary)",
          }}
        >
          Admin Web (Next.js)
        </p>

        <h1
          style={{
            fontSize: "2.5rem",
            margin: "0.75rem 0 1rem",
          }}
        >
          Skeleton
        </h1>

        <p style={{ opacity: 0.75, marginBottom: "1.5rem" }}>
          This is a minimal App Router shell. Build out routes and layouts from
          here.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            textDecoration: "none",
          }}
        >
          Go to Home
        </Link>
      </section>
    </main>
  );
}