import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-primary-800">
      <div className="text-center">
        <h1 className="font-serif text-5xl text-white mb-4">LandIQ</h1>
        <p className="font-body text-lg text-primary-200 mb-8">
          AI-Powered Property Development Platform
        </p>
        <Link
          href="/pitch"
          className="inline-block rounded-full border-[1.5px] border-white px-8 py-3 text-white font-sans text-sm tracking-wide hover:bg-white/10 transition-all duration-200"
        >
          View Pitch Deck →
        </Link>
      </div>
    </main>
  );
}
