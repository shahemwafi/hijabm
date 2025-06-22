export default function PayPage() {
  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full border border-blue-100 text-center">
        <h1 className="text-2xl font-bold text-green-900 mb-4">Payment Required</h1>
        <p className="mb-4 text-green-800">To submit your rishta profile, please pay securely via PayFast. We accept Easypaisa, JazzCash, Raast, Bank, and Cards.</p>
        <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-green-700 transition mb-4">Pay with PayFast</button>
        <div className="flex justify-center gap-4 mt-4 text-green-700">
          <span>Easypaisa</span>
          <span>JazzCash</span>
          <span>Raast</span>
          <span>Bank</span>
          <span>Cards</span>
        </div>
        <p className="mt-6 text-xs text-green-600">Your payment is secure and required to access the profile submission form.</p>
      </div>
    </main>
  );
} 