import { FaWhatsapp, FaEnvelope, FaUser, FaCommentDots } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full border border-green-100 text-center">
        <h1 className="text-3xl font-extrabold text-green-900 mb-6 drop-shadow">Contact Us</h1>
        <form className="space-y-5 mb-6">
          <div className="flex items-center gap-2">
            <FaUser className="text-green-600" />
            <input className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900" type="text" placeholder="Your Name" required />
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-green-600" />
            <input className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900" type="email" placeholder="Your Email" required />
          </div>
          <div className="flex items-start gap-2">
            <FaCommentDots className="text-green-600 mt-2" />
            <textarea className="border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900" placeholder="Your Message" rows={4} required />
          </div>
          <button className="w-full bg-gradient-to-r from-green-600 to-blue-500 text-white py-3 rounded-full font-bold shadow-xl hover:scale-105 hover:from-green-700 hover:to-blue-600 transition-all text-lg">Send Message</button>
        </form>
        <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full shadow hover:bg-green-600 transition mb-2"><FaWhatsapp /> WhatsApp Support</a>
        <div className="flex items-center justify-center gap-2 text-green-700 mt-2"><FaEnvelope /> <span>Email: support@hijabm.com</span></div>
      </div>
    </main>
  );
} 