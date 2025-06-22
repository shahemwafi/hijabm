export default function TermsPage() {
  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full border border-green-100">
        <h1 className="text-3xl font-bold text-green-900 mb-4">Terms & Conditions</h1>
        <h2 className="text-xl font-semibold text-green-800 mt-6 mb-2">Shariah Compliance</h2>
        <ul className="list-disc list-inside text-green-700 mb-4">
          <li>No contact info sharing in profiles</li>
          <li>All profiles are reviewed for Islamic values</li>
          <li>Respectful, dignified communication only</li>
        </ul>
        <h2 className="text-xl font-semibold text-green-800 mt-6 mb-2">Privacy Policy</h2>
        <ul className="list-disc list-inside text-green-700 mb-4">
          <li>Your data is protected and never sold</li>
          <li>Images are stored securely</li>
          <li>You may request profile removal at any time</li>
        </ul>
      </div>
    </main>
  );
} 