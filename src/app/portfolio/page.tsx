export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-bold text-green-900 mb-8 text-center">Approved Rishta Profiles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Placeholder cards, replace with dynamic data later */}
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-green-100">
            <div className="w-24 h-24 bg-green-100 rounded-full mb-4" />
            <div className="font-semibold text-green-800">Name {i}</div>
            <div className="text-green-700 text-sm">Age: 25</div>
            <div className="text-green-700 text-sm">Gender: Female</div>
            <div className="text-green-700 text-sm">Marital Status: Single</div>
            <div className="text-green-700 text-sm">Country: Pakistan</div>
          </div>
        ))}
      </div>
    </main>
  );
} 