import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-4">CommanderForge.ai</h1>
      <p className="mb-6">Build smarter decks with AI.</p>
      <Link href="/forge" className="px-4 py-2 bg-primary rounded">
        Forge a Deck
      </Link>
    </main>
  );
}
