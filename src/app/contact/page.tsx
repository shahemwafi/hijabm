import { FaWhatsapp, FaEnvelope, FaUser, FaCommentDots, FaPhone, FaMapMarkerAlt, FaClock, FaShieldAlt } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 sm:py-12">
      <div className="container-custom max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-900 mb-4 drop-shadow">
            Contact Us
          </h1>
          <p className="text-green-700 text-sm sm:text-base max-w-2xl mx-auto">
            Get in touch with us for any questions, support, or feedback. We&rsquo;re here to help you on your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-green-100">
            <h2 className="text-2xl font-bold text-green-900 mb-6">Send us a Message</h2>
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    type="text" 
                    placeholder="Your Name" 
                    required 
                  />
                </div>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    type="email" 
                    placeholder="Your Email" 
                    required 
                  />
                </div>
              </div>
              <div className="relative">
                <FaCommentDots className="absolute left-3 top-4 text-gray-400" />
                <textarea 
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  placeholder="Your Message" 
                  rows={4} 
                  required 
                />
              </div>
              <button className="w-full bg-gradient-to-r from-green-600 to-blue-500 text-white py-3 sm:py-4 rounded-lg font-semibold shadow-lg hover:scale-105 hover:from-green-700 hover:to-blue-600 transition-all text-base sm:text-lg">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-green-100">
              <h2 className="text-2xl font-bold text-green-900 mb-6">Quick Contact</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                    <FaPhone className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">+92 334 0051076</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                    <FaWhatsapp className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">WhatsApp</p>
                    <a href="https://wa.me/923271832505" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">
                      +92 327 1832505
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">support@hijabm.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-green-100">
              <h2 className="text-2xl font-bold text-green-900 mb-6">Office Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">Pakistan</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                    <FaClock className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Business Hours</p>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center">
                    <FaShieldAlt className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Operational Head</p>
                    <p className="text-gray-600">Shehla Gul</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
      </div>
    </main>
  );
} 