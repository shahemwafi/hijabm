export default function ContactPage() {
  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full border border-blue-100 text-center">
        <h1 className="text-2xl font-bold text-green-900 mb-4">Contact Us</h1>
        <form className="space-y-4 mb-4">
          <input className="input" type="text" placeholder="Your Name" required />
          <input className="input" type="email" placeholder="Your Email" required />
          <textarea className="input" placeholder="Your Message" rows={4} required />
          <button className="w-full bg-green-600 text-white py-3 rounded-full font-semibold shadow hover:bg-green-700 transition">Send Message</button>
        </form>
        <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 text-white px-6 py-2 rounded-full shadow hover:bg-green-600 transition mb-2">WhatsApp Support</a>
        <p className="text-green-700 mt-2">Email: support@hijabm.com</p>
        <style jsx>{`
          .input {
            @apply border border-green-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 text-green-900;
          }
        `}</style>
      </div>
    </main>
  );
} 