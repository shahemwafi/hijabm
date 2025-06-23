import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex flex-col items-center justify-center">
      <section className="flex flex-col items-center text-center mt-12">
        <h1 className="text-4xl md:text-6xl font-bold text-green-900 mb-4">Hijab Marriage Bureau</h1>
        <p className="text-lg md:text-2xl text-green-800 mb-6 max-w-xl">
          A secure, Shariah-compliant rishta platform for Pakistan & the world. Dignified, private, and easy matchmaking for Muslims everywhere.
        </p>
        <Link href="/pay" className="px-8 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition font-semibold text-lg">
          Get Started
        </Link>
        <div className="mt-10 text-green-700 max-w-lg">
          <p className="mb-2">Our Mission:</p>
          <p className="italic">To help Muslims find their life partners in a halal, respectful, and secure environment, upholding Islamic values and privacy.</p>
        </div>
      </section>
    </main>
  );
}
