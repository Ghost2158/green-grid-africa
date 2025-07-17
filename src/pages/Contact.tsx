import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    sponsorship: '',
    inquiry: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // HD images for left side (solar, african people, etc.)
  const images = [
    '/src/assets/solar-africa-1.jpg',
    '/src/assets/solar-africa-2.jpg',
    '/src/assets/solar-africa-3.jpg',
    '/src/assets/solar-background.jpg',
  ];
  const [imgIdx, setImgIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate sending email (replace with actual email API integration)
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen h-screen w-screen bg-gradient-hero animate-fade-in overflow-x-hidden">
      <Navigation />
      <main className="pt-16 h-full w-full">
        <section className="h-[calc(100vh-4rem)] w-full flex items-center justify-center p-0 m-0">
          <div className="flex flex-col lg:flex-row h-full w-full max-w-none shadow-2xl rounded-none overflow-hidden">
            {/* Left: HD Rotating Image */}
            <div className="lg:w-2/3 w-full h-full">
              <img
                src={images[imgIdx]}
                alt="GreenGrid Africa Context"
                className="object-cover w-full h-full transition-all duration-1000"
              />
            </div>
            {/* Right: Contact Form and Text */}
            <div className="lg:w-1/3 w-full flex items-center justify-center bg-gradient-hero h-full">
              <div className="w-full max-w-sm mx-auto p-4 md:p-6 rounded-2xl shadow-xl text-center space-y-6 font-sans">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 animate-bounce font-sans drop-shadow-lg">Contact Us</h1>
                <p className="text-base md:text-lg text-white leading-relaxed animate-fade-in font-sans">
                  Thank you for showing interest in GreenGrid Africa AI. Please provide your contact information below, and we will reach out to schedule a personalised discussion about how we can collaborate on this exciting innovation.
                </p>
                <form className="space-y-6 animate-fade-in" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-left text-white font-semibold mb-2 font-sans">Your Name (Required)</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="First and Last Name" className="w-full px-3 py-2 rounded-lg bg-white/90 text-black border border-grid-yellow focus:outline-none focus:ring-2 focus:ring-grid-yellow transition-all duration-300 font-sans text-sm" />
                  </div>
                  <div>
                    <label className="block text-left text-white font-semibold mb-2 font-sans">Your Email Address (Required)</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="Email" className="w-full px-3 py-2 rounded-lg bg-white/90 text-black border border-grid-yellow focus:outline-none focus:ring-2 focus:ring-grid-yellow transition-all duration-300 font-sans text-sm" />
                  </div>
                  <div>
                    <label className="block text-left text-white font-semibold mb-2 font-sans">Your phone number (Optional)</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+254 720 000 000" className="w-full px-3 py-2 rounded-lg bg-white/90 text-black border border-grid-yellow focus:outline-none focus:ring-2 focus:ring-grid-yellow transition-all duration-300 font-sans text-sm" />
                  </div>
                  <div>
                    <label className="block text-left text-white font-semibold mb-2 font-sans">Where Are you from? (Optional)</label>
                    <input type="text" name="organisation" value={form.organisation} onChange={handleChange} placeholder="Organisation" className="w-full px-3 py-2 rounded-lg bg-white/90 text-black border border-grid-yellow focus:outline-none focus:ring-2 focus:ring-grid-yellow transition-all duration-300 font-sans text-sm" />
                  </div>
                  <div>
                    <label className="block text-left text-white font-semibold mb-2 font-sans">Detailed inquiry (Optional)</label>
                    <textarea name="inquiry" value={form.inquiry} onChange={handleChange} placeholder="Type Inquiry" className="w-full px-3 py-2 rounded-lg bg-white/90 text-black border border-grid-yellow focus:outline-none focus:ring-2 focus:ring-grid-yellow transition-all duration-300 font-sans text-sm" rows={2} />
                  </div>
                  <button type="submit" disabled={sending} className="w-full py-2 bg-gradient-to-r from-grid-yellow to-grid-green text-black font-bold rounded-xl shadow-glow hover:scale-105 transition-all duration-300 animate-pulse font-sans text-base">
                    {sending ? 'Sending...' : 'Send Message'}
                  </button>
                  {sent && (
                    <div className="text-green-400 font-semibold mt-4 animate-fade-in-up font-sans">Thank you! Your message has been sent.</div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Contact;