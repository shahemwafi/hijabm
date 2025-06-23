import Link from 'next/link';
import { FaUserShield, FaHeart, FaLock, FaStar } from 'react-icons/fa';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex flex-col items-center justify-center">
      {/* Cover Image */}
      <div className="w-full flex justify-center bg-gradient-to-b from-green-100/60 to-blue-100/0 pt-8">
        <Image
          src="/.png"
          alt="Hijab Marriage Bureau Cover"
          width={800}
          height={320}
          className="rounded-3xl shadow-xl object-cover w-full max-w-4xl h-64 md:h-80 lg:h-96"
          priority
        />
      </div>
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-8 mb-12">
        <h1 className="text-5xl md:text-7xl font-extrabold text-green-900 mb-4 drop-shadow-lg">Hijab Marriage Bureau</h1>
        <p className="text-xl md:text-2xl text-green-800 mb-8 max-w-2xl">
          A secure, Shariah-compliant rishta platform for Pakistan & the world. Dignified, private, and easy matchmaking for Muslims everywhere.
        </p>
        <Link href="/pay" className="px-10 py-4 bg-gradient-to-r from-green-600 to-blue-500 text-white rounded-full shadow-xl hover:scale-105 hover:from-green-700 hover:to-blue-600 transition-all font-bold text-2xl animate-bounce">
          Get Started
        </Link>
        <div className="mt-12 text-green-700 max-w-xl">
          <p className="mb-2 text-lg font-semibold">Our Mission:</p>
          <p className="italic text-base">To help Muslims find their life partners in a halal, respectful, and secure environment, upholding Islamic values and privacy.</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-5xl mx-auto my-12 bg-white/80 rounded-2xl shadow-lg p-8 border border-green-100">
        <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <FaUserShield className="text-4xl text-green-600 mb-2" />
            <div className="font-semibold text-green-800">1. Register & Pay</div>
            <div className="text-green-700 text-sm">Start your journey by registering and making a secure payment.</div>
          </div>
          <div className="flex flex-col items-center">
            <FaLock className="text-4xl text-green-600 mb-2" />
            <div className="font-semibold text-green-800">2. Submit Profile</div>
            <div className="text-green-700 text-sm">Fill out your rishta profile with privacy and dignity. No contact info is shared.</div>
          </div>
          <div className="flex flex-col items-center">
            <FaHeart className="text-4xl text-green-600 mb-2" />
            <div className="font-semibold text-green-800">3. Get Matched</div>
            <div className="text-green-700 text-sm">Our team reviews and matches profiles, upholding Islamic values.</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full max-w-5xl mx-auto my-12">
        <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow p-6 border border-green-100 flex flex-col items-center">
            <FaStar className="text-yellow-400 text-2xl mb-2" />
            <p className="text-green-800 italic mb-2">“A truly dignified and private experience. I found my match in just a few weeks!”</p>
            <div className="text-green-700 font-semibold">— Ayesha, Karachi</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-green-100 flex flex-col items-center">
            <FaStar className="text-yellow-400 text-2xl mb-2" />
            <p className="text-green-800 italic mb-2">“The process was so easy and respectful. Highly recommended for Muslims!”</p>
            <div className="text-green-700 font-semibold">— Ahmed, Lahore</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-green-100 flex flex-col items-center">
            <FaStar className="text-yellow-400 text-2xl mb-2" />
            <p className="text-green-800 italic mb-2">“I appreciate the privacy and Islamic values. Thank you for this service!”</p>
            <div className="text-green-700 font-semibold">— Fatima, Islamabad</div>
          </div>
        </div>
      </section>
    </main>
  );
}
