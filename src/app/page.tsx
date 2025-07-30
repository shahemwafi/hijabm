// Sample comment: This is the main home page for Hijab Marriage Bureau
import Link from 'next/link';
import { FaUserShield, FaHeart, FaLock, FaStar, FaCheckCircle, FaUsers, FaShieldAlt, FaPray, FaGlobe } from 'react-icons/fa';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10"></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto px-4">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl sm:text-2xl">H</span>
              </div>
            </div>
            <h1 className="section-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6">
              Hijab Marriage Bureau
            </h1>
            <p className="section-subtitle text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 px-4">
              Dignified, Shariah-compliant matchmaking for Muslims worldwide. 
              Find your soulmate with respect and Islamic values.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link href="/pay" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                Start Your Journey
              </Link>
              <Link href="/about" className="btn-outline text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">Why Choose Hijab Marriage Bureau?</h2>
          <p className="section-subtitle text-base sm:text-lg">
            We provide a secure, dignified, and Islamic approach to finding your life partner
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
            <div className="card-hover text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-white text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Privacy & Security</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Your personal information is protected with the highest security standards. 
                No contact details are shared without your consent.
              </p>
            </div>

            <div className="card-hover text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPray className="text-white text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Shariah Compliant</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Our platform follows Islamic principles and values. 
                We ensure halal interactions and maintain Islamic etiquette throughout.
              </p>
            </div>

            <div className="card-hover text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-white text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Verified Profiles</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                All profiles are manually reviewed and verified by our team. 
                We ensure authenticity and quality of information provided.
              </p>
            </div>

            <div className="card-hover text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGlobe className="text-white text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Global Reach</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Connect with Muslims from around the world. 
                Our platform serves the global Muslim community with dignity.
              </p>
            </div>

            <div className="card-hover text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-white text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Personalized Matching</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Our intelligent system matches profiles based on compatibility, 
                values, and preferences for better success rates.
              </p>
            </div>

            <div className="card-hover text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-white text-lg sm:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Success Stories</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Join thousands of successful couples who found their soulmates 
                through our platform. Your success story could be next!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container-custom">
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">How It Works</h2>
          <p className="section-subtitle text-base sm:text-lg">
            Simple, secure, and dignified process to find your life partner
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
            <div className="card text-center relative">
              <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                  1
                </div>
              </div>
              <FaUserShield className="text-3xl sm:text-4xl text-green-600 mb-4 mx-auto" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Register & Pay</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Create your account and make a secure payment to access our premium matchmaking service.
              </p>
            </div>

            <div className="card text-center relative">
              <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                  2
                </div>
              </div>
              <FaLock className="text-3xl sm:text-4xl text-green-600 mb-4 mx-auto" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Submit Profile</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Fill out your detailed rishta profile with privacy and dignity. 
                No contact information is shared publicly.
              </p>
            </div>

            <div className="card text-center relative">
              <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                  3
                </div>
              </div>
              <FaHeart className="text-3xl sm:text-4xl text-green-600 mb-4 mx-auto" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Get Matched</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Our team reviews and matches profiles, upholding Islamic values 
                and ensuring compatibility for successful relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">Success Stories</h2>
          <p className="section-subtitle text-base sm:text-lg">
            Hear from couples who found their soulmates through our platform
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
            <div className="card-hover">
              <div className="flex items-center mb-4">
                <FaStar className="text-yellow-400 text-lg sm:text-xl mr-2" />
                <FaStar className="text-yellow-400 text-lg sm:text-xl mr-2" />
                <FaStar className="text-yellow-400 text-lg sm:text-xl mr-2" />
                <FaStar className="text-yellow-400 text-lg sm:text-xl mr-2" />
                <FaStar className="text-yellow-400 text-lg sm:text-xl" />
              </div>
              <p className="text-gray-700 italic mb-4 text-sm sm:text-base">
                "A truly dignified and private experience. I found my match in just a few weeks! 
                The process was respectful and aligned with our Islamic values."
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3 text-sm sm:text-base">
                  A
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm sm:text-base">Ayesha, Karachi</div>
                  <div className="text-xs sm:text-sm text-gray-600">Married 2023</div>
                </div>
              </div>
            </div>

            <div className="card-hover">
              <div className="flex items-center mb-4">
                <FaStar className="text-yellow-400 text-lg sm:text-xl mr-2" />
                <FaStar className="text-yellow-400 text-lg sm:text-xl mr-2" />
                <FaStar className="text-yellow-400 text-lg sm:text-xl mr-2" />
                <FaStar className="text-yellow-400 text-lg sm:text-xl mr-2" />
                <FaStar className="text-yellow-400 text-lg sm:text-xl" />
              </div>
              <p className="text-gray-700 italic mb-4 text-sm sm:text-base">
                "The process was so easy and respectful. Highly recommended for Muslims! 
                We appreciate the privacy and Islamic approach to matchmaking."
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3 text-sm sm:text-base">
                  A
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm sm:text-base">Ahmed, Lahore</div>
                  <div className="text-xs sm:text-sm text-gray-600">Married 2023</div>
                </div>
              </div>
            </div>

            <div className="card-hover">
              <div className="flex items-center mb-4">
                <FaStar className="text-yellow-400 text-lg sm:text-xl mr-2" />
                <FaStar className="text-yellow-400 text-lg sm:text-xl mr-2" />
                <FaStar className="text-yellow-400 text-lg sm:text-xl mr-2" />
                <FaStar className="text-yellow-400 text-lg sm:text-xl mr-2" />
                <FaStar className="text-yellow-400 text-lg sm:text-xl" />
              </div>
              <p className="text-gray-700 italic mb-4 text-sm sm:text-base">
                "I appreciate the privacy and Islamic values. Thank you for this service! 
                We found each other through this platform and couldn't be happier."
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-600 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3 text-sm sm:text-base">
                  F
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm sm:text-base">Fatima, Islamabad</div>
                  <div className="text-xs sm:text-sm text-gray-600">Married 2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Find Your Soulmate?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 px-4">
            Join thousands of Muslims who have found their life partners through our platform
          </p>
          <Link href="/pay" className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-white text-green-600 hover:bg-gray-50">
            Start Your Journey Today
          </Link>
        </div>
      </section>
    </main>
  );
}
