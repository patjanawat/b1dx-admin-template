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
      }}
    >
      <section style={{ textAlign: "center", maxWidth: 520 }}>
        <p style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Admin Web (Next.js)
        </p>
        <h1 style={{ fontSize: "2.5rem", margin: "0.75rem 0 1rem" }}>
          Skeleton
        </h1>
        <p style={{ opacity: 0.75, marginBottom: "1.5rem" }}>
          This is a minimal App Router shell. Build out routes and layouts from
          here.
        </p>
        <Link href="/">Go to /</Link>
      </section>
    </main>
  );
}
