import Link from 'next/link';

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-red-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full border border-red-100 text-center">
        <h1 className="text-2xl font-bold text-red-700 mb-4">Payment Cancelled</h1>
        <p className="mb-4 text-red-800">Your payment was not completed. Please try again to access the profile submission form.</p>
        <Link href="/pay" className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-red-700 transition">Retry Payment</Link>
      </div>
    </main>
  );
} 