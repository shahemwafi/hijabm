import { FaUserShield, FaLock } from 'react-icons/fa';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full border border-green-100 text-center">
        <div className="flex flex-col items-center mb-4">
          <FaUserShield className="text-4xl text-green-700 mb-2" />
          <h1 className="text-3xl font-extrabold text-green-900 mb-2 drop-shadow">Admin Dashboard</h1>
        </div>
        <p className="mb-6 text-green-800">This page is protected. Please log in to manage rishta profiles.</p>
        <div className="flex items-center gap-2 mb-4">
          <FaLock className="text-green-600" />
          <input className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900" type="password" placeholder="Admin Password" />
        </div>
        <button className="w-full bg-gradient-to-r from-green-600 to-blue-500 text-white py-3 rounded-full font-bold shadow-xl hover:scale-105 hover:from-green-700 hover:to-blue-600 transition-all text-lg">Login</button>
      </div>
    </main>
  );
} 