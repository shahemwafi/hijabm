export default function AdminPage() {
  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full border border-blue-100 text-center">
        <h1 className="text-2xl font-bold text-green-900 mb-4">Admin Dashboard</h1>
        <p className="mb-4 text-green-800">This page is protected. Please log in to manage rishta profiles.</p>
        <input className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900 mb-4" type="password" placeholder="Admin Password" />
        <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-green-700 transition">Login</button>
      </div>
    </main>
  );
} 