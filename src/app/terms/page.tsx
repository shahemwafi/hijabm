import { FaBalanceScale, FaShieldAlt, FaUserSecret } from 'react-icons/fa';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl w-full border border-green-100">
        <h1 className="text-4xl font-extrabold text-green-900 mb-6 text-center drop-shadow">Terms & Conditions</h1>
        <div className="flex items-center gap-2 mb-2 text-green-800 font-semibold text-lg"><FaBalanceScale /> Shariah Compliance</div>
        <ul className="list-disc list-inside text-green-700 mb-6 ml-6">
          <li>No contact info sharing in profiles</li>
          <li>All profiles are reviewed for Islamic values</li>
          <li>Respectful, dignified communication only</li>
        </ul>
        <hr className="my-6 border-green-100" />
        <div className="flex items-center gap-2 mb-2 text-green-800 font-semibold text-lg"><FaShieldAlt /> Privacy Policy</div>
        <ul className="list-disc list-inside text-green-700 mb-4 ml-6">
          <li>Your data is protected and never sold</li>
          <li>Images are stored securely</li>
          <li>You may request profile removal at any time</li>
        </ul>
        <div className="flex items-center gap-2 mt-8 text-green-700 text-sm justify-center"><FaUserSecret /> For questions, contact our support team.</div>
      </div>
    </main>
  );
} 