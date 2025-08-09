import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const FORM_ENDPOINT = "https://formspree.io/f/xdkdppnp" || ""; 


export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" }); // "company" is honeypot
  const [status, setStatus] = useState({ sending: false, ok: null, msg: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, form[name]);
  };

  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (value.trim().length < 2) error = "Name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Please enter a valid email";
        break;
      case "message":
        if (!value.trim()) error = "Message is required";
        else if (value.trim().length < 10) error = "Message must be at least 10 characters";
        break;
    }
    
    setErrors({ ...errors, [name]: error });
    return !error;
  };

  const validateForm = () => {
    const fields = ["name", "email", "message"];
    let isValid = true;
    const newErrors = {};
    
    fields.forEach(field => {
      if (!validateField(field, form[field])) {
        isValid = false;
      }
      if (errors[field]) {
        newErrors[field] = errors[field];
      }
    });
    
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });
    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (!FORM_ENDPOINT) {
      setStatus({ sending: false, ok: false, msg: "Form endpoint not set. Ask me to help you configure it." });
      return;
    }
    // Honeypot check (bots fill hidden fields)
    if (form.company) return;

    setStatus({ sending: true, ok: null, msg: "" });
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus({ sending: false, ok: true, msg: "Thanks! I’ll get back to you shortly." });
        setForm({ name: "", email: "", message: "", company: "" });
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus({
          sending: false,
          ok: false,
          msg: data?.errors?.[0]?.message || "Something went wrong. Try again?",
        });
      }
    } catch (err) {
      setStatus({ sending: false, ok: false, msg: "Network error. Please try again." });
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <div className="text-center mb-8">
            <div className="text-accent-primary font-mono text-sm mb-2">
              <span className="text-text-secondary">~/contact</span>
              <span className="text-accent-primary"> $ </span>
              <span>send_message --to=rishikesh</span>
            </div>
            <h2 className="text-3xl font-semibold text-text-primary">Contact Me</h2>
            <p className="text-text-secondary mt-2 max-w-2xl mx-auto">
              Have a project, role, or idea you'd like to jam on? Drop a note — I'll get back within a day.
            </p>
            <div className="mt-3 flex items-center justify-center gap-3 flex-wrap">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <span>View Resume</span>
              </a>
              <a
                href="mailto:rishikesh.menon@queensu.ca"
                className="btn btn-ghost font-mono text-sm"
              >
                rishikesh.menon@queensu.ca
              </a>
            </div>
          </div>
        </Reveal>

        <motion.form
          onSubmit={onSubmit}
          className="max-w-2xl mx-auto card-hover p-8 relative"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
        >
          {/* Terminal-style header */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-accent-tertiary"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-accent-primary"></div>
            </div>
            <div className="text-text-tertiary font-mono text-xs">message_form.tsx</div>
          </div>

          {/* Honeypot (hidden) */}
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={onChange}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-mono text-text-secondary mb-2">
                <span className="text-accent-primary">const</span> name <span className="text-text-tertiary">=</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                onBlur={onBlur}
                className={`w-full rounded-xl px-4 py-3 outline-none transition-all duration-200 font-mono text-sm ${
                  errors.name && touched.name
                    ? 'bg-accent-tertiary/10 border-2 border-accent-tertiary focus:border-accent-tertiary'
                    : 'bg-bg-secondary/50 border-2 border-transparent focus:border-accent-primary hover:border-accent-primary/50'
                } text-text-primary placeholder-text-tertiary`}
                placeholder='"Your name here"'
              />
              {errors.name && touched.name && (
                <p className="text-accent-tertiary text-xs font-mono mt-1 flex items-center gap-1">
                  <span>⚠</span> {errors.name}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-mono text-text-secondary mb-2">
                <span className="text-accent-primary">const</span> email <span className="text-text-tertiary">=</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                onBlur={onBlur}
                className={`w-full rounded-xl px-4 py-3 outline-none transition-all duration-200 font-mono text-sm ${
                  errors.email && touched.email
                    ? 'bg-accent-tertiary/10 border-2 border-accent-tertiary focus:border-accent-tertiary'
                    : 'bg-bg-secondary/50 border-2 border-transparent focus:border-accent-primary hover:border-accent-primary/50'
                } text-text-primary placeholder-text-tertiary`}
                placeholder='"your@email.com"'
              />
              {errors.email && touched.email && (
                <p className="text-accent-tertiary text-xs font-mono mt-1 flex items-center gap-1">
                  <span>⚠</span> {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-mono text-text-secondary mb-2">
              <span className="text-accent-primary">const</span> message <span className="text-text-tertiary">=</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              onBlur={onBlur}
              rows={5}
              className={`w-full rounded-xl px-4 py-3 outline-none transition-all duration-200 font-mono text-sm resize-y ${
                errors.message && touched.message
                  ? 'bg-accent-tertiary/10 border-2 border-accent-tertiary focus:border-accent-tertiary'
                  : 'bg-bg-secondary/50 border-2 border-transparent focus:border-accent-primary hover:border-accent-primary/50'
              } text-text-primary placeholder-text-tertiary`}
              placeholder={`"Tell me about your project, role, or idea.\nI'd love to learn more about what you're building!"`}
            />
            {errors.message && touched.message && (
              <p className="text-accent-tertiary text-xs font-mono mt-1 flex items-center gap-1">
                <span>⚠</span> {errors.message}
              </p>
            )}
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <button 
                type="submit" 
                className={`btn-solid flex items-center gap-2 ${
                  status.sending ? 'opacity-75 cursor-not-allowed' : ''
                }`} 
                disabled={status.sending}
              >
                {status.sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-bg-primary border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </button>

              <div className="flex flex-wrap items-center gap-4 text-text-secondary">
                <span className="font-mono text-xs text-text-tertiary">// Or connect with me on:</span>
                <a
                  href="https://www.linkedin.com/in/rishikesh-menon"
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline font-mono text-sm flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/rishikeshmenon"
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline font-mono text-sm flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a
                  href="mailto:rishikesh.menon@queensu.ca"
                  className="link-underline font-mono text-sm flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  rishikesh.menon@queensu.ca
                </a>
              </div>
            </div>
          </div>

          {/* Status messages */}
          {status.ok === true && (
            <motion.div 
              className="mt-6 p-4 bg-accent-primary/10 border border-accent-primary/20 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-accent-primary font-mono text-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {status.msg}
              </p>
            </motion.div>
          )}
          {status.ok === false && (
            <motion.div 
              className="mt-6 p-4 bg-accent-tertiary/10 border border-accent-tertiary/20 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-accent-tertiary font-mono text-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {status.msg}
              </p>
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
