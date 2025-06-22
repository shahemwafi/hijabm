export default function AboutPage() {
  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full border border-green-100">
        <h1 className="text-3xl font-bold text-green-900 mb-4">About Us</h1>
        <p className="mb-4 text-green-800">Hijab Marriage Bureau was founded to provide a safe, Shariah-compliant matchmaking platform for Muslims in Pakistan and worldwide. Our mission is to help you find your life partner with dignity, privacy, and respect.</p>
        <h2 className="text-xl font-semibold text-green-800 mt-6 mb-2">Our Values</h2>
        <ul className="list-disc list-inside text-green-700 space-y-1">
          <li>Islamic principles & modesty</li>
          <li>Privacy and data protection</li>
          <li>Transparency and trust</li>
          <li>Respect for all users</li>
        </ul>
      </div>
    </main>
  );
} 