import { FaQuran, FaUserShield, FaLock, FaHandshake, FaUserTie, FaHeart, FaGlobe, FaUsers, FaShieldAlt } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 sm:py-12">
      <div className="container-custom max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-900 mb-4 drop-shadow">
            About Us
          </h1>
          <p className="text-green-700 text-sm sm:text-base max-w-3xl mx-auto">
            Hijab Marriage Bureau was founded to provide a safe, Shariah-compliant matchmaking platform for Muslims in Pakistan and worldwide. Our mission is to help you find your life partner with dignity, privacy, and respect.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-green-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeart className="text-white text-2xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4">Our Mission</h2>
            <p className="text-green-700 text-sm sm:text-base max-w-2xl mx-auto">
              To create a dignified, private, and truly Islamic matchmaking experience that helps Muslims find their life partners in a halal, respectful, and secure environment.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaQuran className="text-white" />
            </div>
            <h3 className="font-semibold text-green-800 mb-2">Islamic Principles</h3>
            <p className="text-green-700 text-sm">Modesty and Islamic values in all interactions</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLock className="text-white" />
            </div>
            <h3 className="font-semibold text-green-800 mb-2">Privacy Protection</h3>
            <p className="text-green-700 text-sm">Your data is secure and never shared</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHandshake className="text-white" />
            </div>
            <h3 className="font-semibold text-green-800 mb-2">Trust & Transparency</h3>
            <p className="text-green-700 text-sm">Honest and open communication</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUserShield className="text-white" />
            </div>
            <h3 className="font-semibold text-green-800 mb-2">Respect for All</h3>
            <p className="text-green-700 text-sm">Dignified treatment of every user</p>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-green-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4">Our Leadership</h2>
            <p className="text-green-700 text-sm sm:text-base">
              Meet the dedicated team behind Hijab Marriage Bureau
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
                <FaUserTie className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-2">Operational Head</h3>
              <p className="text-green-700 font-semibold mb-4">Shehla Gul</p>
              <p className="text-green-700 text-sm sm:text-base">
                "Inspired by the need for a dignified, private, and truly Islamic matchmaking experience, we created Hijab Marriage Bureau. Our journey began with a vision to help Muslims find their life partners in a halal, respectful, and secure environment. We are committed to upholding Islamic values, privacy, and trust for every user."
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <FaGlobe className="text-green-600" />
                  <h4 className="font-semibold text-green-900">Global Reach</h4>
                </div>
                <p className="text-green-700 text-sm">Serving Muslims worldwide</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <FaUsers className="text-green-600" />
                  <h4 className="font-semibold text-green-900">Community Focus</h4>
                </div>
                <p className="text-green-700 text-sm">Building strong Muslim families</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <FaShieldAlt className="text-green-600" />
                  <h4 className="font-semibold text-green-900">Security First</h4>
                </div>
                <p className="text-green-700 text-sm">Your privacy is our priority</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <FaQuran className="text-green-600" />
                  <h4 className="font-semibold text-green-900">Islamic Values</h4>
                </div>
                <p className="text-green-700 text-sm">Shariah-compliant service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}