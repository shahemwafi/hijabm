import { FaCreditCard, FaMobileAlt, FaUniversity, FaArrowRight } from 'react-icons/fa';

export default function PayPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full border border-green-100 text-center">
        {/* Progress Stepper */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-600 text-white font-bold">1</div>
            <span className="text-green-800 text-xs mt-1">Pay</span>
          </div>
          <FaArrowRight className="text-green-400 text-xl" />
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-200 text-green-700 font-bold">2</div>
            <span className="text-green-700 text-xs mt-1">Submit</span>
          </div>
          <FaArrowRight className="text-green-200 text-xl" />
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-400 font-bold">3</div>
            <span className="text-green-400 text-xs mt-1">Approve</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-green-900 mb-4">Post Your Rishta</h1>
        <p className="mb-6 text-green-800 text-base">To submit your rishta profile, please pay securely via PayFast. We accept Easypaisa, JazzCash, Raast, Bank, and Cards.</p>
        <button className="bg-gradient-to-r from-green-600 to-blue-500 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 hover:from-green-700 hover:to-blue-600 transition-all text-lg mb-6">Pay with PayFast</button>
        <div className="flex justify-center gap-6 mt-2 text-green-700 text-2xl">
          <span title="Easypaisa"><FaMobileAlt /></span>
          <span title="JazzCash"><FaMobileAlt /></span>
          <span title="Raast"><FaUniversity /></span>
          <span title="Bank"><FaUniversity /></span>
          <span title="Cards"><FaCreditCard /></span>
        </div>
        <p className="mt-8 text-xs text-green-600">Your payment is secure and required to access the profile submission form. All major Pakistani payment methods are supported.</p>
      </div>
    </main>
  );
} 