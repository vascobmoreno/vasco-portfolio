import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from './SectionHeading';

const contacts = [
  {
    label: 'Email',
    value: 'vascobmoreno@gmail.com',
    href: 'mailto:vascobmoreno@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Fafe, Braga — Portugal',
    href: 'https://maps.google.com/?q=Fafe,+Braga,+Portugal',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading label="05 — contact" title="Get In Touch" />

      <div ref={ref} className="grid md:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-400 leading-relaxed mb-8">
            I'm always open to new opportunities and interesting projects. Whether you want to discuss
            a role, collaborate on something exciting, or just say hello — my inbox is always open.
          </p>

          <div className="space-y-4">
            {contacts.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.label === 'Location' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  {c.icon}
                </div>
                <div>
                  <div className="text-xs text-gray-600 font-mono uppercase tracking-widest">{c.label}</div>
                  <div className="text-sm text-gray-300 group-hover:text-primary transition-colors">{c.value}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card border border-white/5 rounded-xl p-6 md:p-8 glow-border"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const name = (form.elements.namedItem('name') as HTMLInputElement).value;
              const email = (form.elements.namedItem('email') as HTMLInputElement).value;
              const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
              window.location.href = `mailto:vascobmoreno@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${email}`;
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 font-mono uppercase tracking-widest block mb-2">
                  Name
                </label>
                <input
                  name="name"
                  required
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-mono uppercase tracking-widest block mb-2">
                  Email
                </label>
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-mono uppercase tracking-widest block mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="What's on your mind?"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-dark font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,204,0.3)] text-sm"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
