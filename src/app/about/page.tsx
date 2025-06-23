import { FaQuran, FaUserShield, FaLock, FaHandshake, FaUserTie } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-3xl w-full border border-green-100">
        <h1 className="text-4xl font-extrabold text-green-900 mb-4 text-center drop-shadow">About Us</h1>
        <p className="mb-8 text-green-800 text-lg text-center max-w-2xl mx-auto">
          Hijab Marriage Bureau was founded to provide a safe, Shariah-compliant matchmaking platform for Muslims in Pakistan and worldwide. Our mission is to help you find your life partner with dignity, privacy, and respect.
        </p>
        <h2 className="text-2xl font-bold text-green-800 mt-8 mb-4 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center gap-4 bg-green-50 rounded-lg p-4 border border-green-100">
            <FaQuran className="text-2xl text-green-600" />
            <span className="font-semibold text-green-800">Islamic principles &amp; modesty</span>
          </div>
          <div className="flex items-center gap-4 bg-green-50 rounded-lg p-4 border border-green-100">
            <FaLock className="text-2xl text-green-600" />
            <span className="font-semibold text-green-800">Privacy and data protection</span>
          </div>
          <div className="flex items-center gap-4 bg-green-50 rounded-lg p-4 border border-green-100">
            <FaHandshake className="text-2xl text-green-600" />
            <span className="font-semibold text-green-800">Transparency and trust</span>
          </div>
          <div className="flex items-center gap-4 bg-green-50 rounded-lg p-4 border border-green-100">
            <FaUserShield className="text-2xl text-green-600" />
            <span className="font-semibold text-green-800">Respect for all users</span>
          </div>
        </div>
        <h2 className="text-xl font-bold text-green-800 mt-10 mb-2 text-center">Our Story</h2>
        <div className="flex flex-col md:flex-row items-center gap-6 mt-4">
          <div className="flex-shrink-0 flex flex-col items-center">
            <FaUserTie className="text-5xl text-green-700 mb-2" />
            <div className="font-semibold text-green-900">Founder</div>
            <div className="text-green-700 text-sm">Shahem Wafi</div>
          </div>
          <div className="text-green-800 text-base bg-green-50 rounded-lg p-4 border border-green-100 w-full">
            <p>
              &quot;Inspired by the need for a dignified, private, and truly Islamic matchmaking experience, we created Hijab Marriage Bureau. Our journey began with a vision to help Muslims find their life partners in a halal, respectful, and secure environment. We are committed to upholding Islamic values, privacy, and trust for every user.&quot;
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}