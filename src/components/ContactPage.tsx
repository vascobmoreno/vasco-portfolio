import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 1. Go to web3forms.com and enter vascobmoreno@gmail.com to get your free key
// 2. Replace the string below with your key
const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const inputClass =
  'bg-transparent border-b border-[#00ffcc]/20 pb-2 font-mono text-sm text-white outline-none focus:border-[#00ffcc]/50 transition-colors placeholder:text-gray-700 w-full';

export default function ContactPage({ onBack }: { onBack: () => void }) {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const set = (f: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [f]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject:    form.subject || `Portfolio contact from ${form.name}`,
          from_name:  form.name,
          email:      form.email,
          message:    form.message,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="flex-1 overflow-y-auto pt-24 pb-16 px-6"
    >
      <div className="max-w-xl mx-auto">

        {/* Back */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[#00ffcc]/40 hover:text-[#00ffcc]/80 transition-colors uppercase mb-12"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
          </svg>
          Back
        </button>

        {/* Heading */}
        <p className="font-mono text-[10px] tracking-[0.5em] text-[#00ffcc]/35 uppercase mb-3">Get in touch</p>
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Let's work<br />together.</h1>
        <p className="text-gray-400 text-sm font-mono mb-12 leading-relaxed">
          Open to freelance projects, consulting, and full-time opportunities.<br />
          I'll get back to you within 24 hours.
        </p>

        <AnimatePresence mode="wait">
          {status === 'sent' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-5 py-16 text-center"
            >
              <div className="w-14 h-14 rounded-full border border-[#00ffcc]/40 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#00ffcc]" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-mono text-[#00ffcc] tracking-[0.3em] uppercase text-sm mb-1">Message sent</p>
                <p className="font-mono text-xs text-gray-500">I'll be in touch soon.</p>
              </div>
              <button
                onClick={() => { setForm({ name: '', email: '', subject: '', message: '' }); setStatus('idle'); }}
                className="font-mono text-[10px] tracking-[0.3em] text-[#00ffcc]/40 hover:text-[#00ffcc]/80 transition-colors uppercase mt-2"
              >
                Send another →
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={submit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] tracking-[0.4em] text-[#00ffcc]/40 uppercase">Name *</label>
                  <input required value={form.name} onChange={set('name')} className={inputClass} placeholder="Vasco Moreno" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] tracking-[0.4em] text-[#00ffcc]/40 uppercase">Email *</label>
                  <input required type="email" value={form.email} onChange={set('email')} className={inputClass} placeholder="you@example.com" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] tracking-[0.4em] text-[#00ffcc]/40 uppercase">Subject</label>
                <input value={form.subject} onChange={set('subject')} className={inputClass} placeholder="Project inquiry, collaboration..." />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] tracking-[0.4em] text-[#00ffcc]/40 uppercase">Message *</label>
                <textarea
                  required
                  value={form.message}
                  onChange={set('message')}
                  rows={6}
                  className="bg-transparent border border-[#00ffcc]/15 p-4 font-mono text-sm text-white outline-none focus:border-[#00ffcc]/35 transition-colors resize-none placeholder:text-gray-700 rounded-sm"
                  placeholder="Tell me about your project..."
                />
              </div>

              {status === 'error' && (
                <p className="font-mono text-xs text-red-400/80">Something went wrong — please try again or email me directly.</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="self-start inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-[#00ffcc]/70 border border-[#00ffcc]/30 px-8 py-3 hover:bg-[#00ffcc]/8 hover:text-[#00ffcc] hover:border-[#00ffcc]/60 transition-all uppercase disabled:opacity-40"
              >
                {status === 'sending' ? (
                  <>
                    <span className="animate-spin w-3 h-3 border border-[#00ffcc]/40 border-t-[#00ffcc] rounded-full" />
                    Sending...
                  </>
                ) : 'Send Message →'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
