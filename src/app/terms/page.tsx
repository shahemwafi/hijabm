import { 
  FaCheckCircle, 
  FaInfoCircle, 
  FaQuran, 
  FaLock, 
  FaHandshake, 
  FaTimesCircle, 
  FaBalanceScale, 
  FaUserSecret 
} from 'react-icons/fa';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 sm:py-12">
      <div className="container-custom max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-900 mb-4 drop-shadow">
            Terms & Conditions
          </h1>
          <p className="text-green-700 text-sm sm:text-base max-w-2xl mx-auto">
            Our commitment to providing a safe, respectful, and Islamic-compliant matchmaking service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Shariah Compliance */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-green-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                <FaQuran className="text-white text-lg" />
              </div>
              <h2 className="text-2xl font-bold text-green-900">Shariah Compliance</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-green-700">No contact information sharing in profiles</p>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-green-700">All profiles are reviewed for Islamic values</p>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-green-700">Respectful, dignified communication only</p>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-green-700">Modest profile photos and descriptions</p>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-green-700">Family involvement encouraged</p>
              </div>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-green-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                <FaLock className="text-white text-lg" />
              </div>
              <h2 className="text-2xl font-bold text-green-900">Privacy Policy</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-green-700">Your data is protected and never sold</p>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-green-700">Images are stored securely</p>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-green-700">You may request profile removal at any time</p>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-green-700">No personal information shared without consent</p>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-green-700">Secure payment processing</p>
              </div>
            </div>
          </div>

          {/* Service Rules */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-green-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                <FaHandshake className="text-white text-lg" />
              </div>
              <h2 className="text-2xl font-bold text-green-900">Service Rules</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-green-700">One profile per person</p>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-green-700">Accurate information required</p>
              </div>
              <div className="flex items-start gap-3">
                <FaTimesCircle className="text-red-500 mt-1 flex-shrink-0" />
                <p className="text-red-600">No fake profiles or misrepresentation</p>
              </div>
              <div className="flex items-start gap-3">
                <FaTimesCircle className="text-red-500 mt-1 flex-shrink-0" />
                <p className="text-red-600">No inappropriate content or behavior</p>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-green-700">Respectful communication mandatory</p>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-green-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                <FaBalanceScale className="text-white text-lg" />
              </div>
              <h2 className="text-2xl font-bold text-green-900">Payment Terms</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">Easypaisa Payment</h3>
                <p className="text-green-700 text-sm">Number: 03340051076</p>
                <p className="text-green-700 text-sm">Title: Shehla Gul</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-green-700 text-sm">One-time payment for profile creation</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-green-700 text-sm">No recurring charges</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-green-700 text-sm">Secure payment processing</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-green-100 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaInfoCircle className="text-green-600 text-xl" />
              <h3 className="text-xl font-bold text-green-900">Questions?</h3>
            </div>
            <p className="text-green-700 mb-4">
              For any questions about our terms and conditions, please contact our support team.
            </p>
            <div className="flex items-center justify-center gap-2 text-green-700 text-sm">
              <FaUserSecret />
              <span>Contact: +92 334 0051076 | support@hijabm.com</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 