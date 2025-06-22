import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full border border-green-100 text-center">
        <h1 className="text-2xl font-bold text-green-900 mb-4">Payment Successful!</h1>
        <p className="mb-4 text-green-800">JazakAllah Khair! Your payment was received. You can now submit your rishta profile.</p>
        <Link href="/submit" className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-green-700 transition">Continue to Profile Submission</Link>
      </div>
    </main>
  );
} 