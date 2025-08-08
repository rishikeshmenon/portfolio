import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const FORM_ENDPOINT = "https://formspree.io/f/xdkdppnp" || ""; 


export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" }); // "company" is honeypot
  const [status, setStatus] = useState({ sending: false, ok: null, msg: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
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
        <Reveal><h2 className="text-3xl font-semibold mb-6 text-center">Contact Me</h2></Reveal>

        <motion.p
          className="text-white/80 max-w-2xl mx-auto text-center mb-8"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
        >
          Have a project, role, or idea you’d like to jam on? Drop a note — I’ll get back within a day.
        </motion.p>

        <motion.form
          onSubmit={onSubmit}
          className="max-w-2xl mx-auto card p-6"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
        >
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-white/70">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                required
                className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-blue-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm text-white/70">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                required
                className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-blue-500"
                placeholder="Email"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm text-white/70">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              required
              rows={5}
              className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-blue-500 resize-y"
              placeholder="Tell me a bit about what you’re looking for…"
            />
          </div>

          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <button type="submit" className="btn disabled:opacity-60" disabled={status.sending}>
              {status.sending ? "Sending…" : "Send"}
            </button>

            <div className="flex flex-wrap items-center gap-3 text-white/70">
              <a
                href="https://www.linkedin.com/in/rishikesh-menon"
                target="_blank"
                rel="noreferrer"
                className="link-underline"
              >
                LinkedIn
              </a>
              <span>•</span>
              <a
                href="https://github.com/rishikeshmenon"
                target="_blank"
                rel="noreferrer"
                className="link-underline"
              >
                GitHub
              </a>
              <span>•</span>
              <a
                href="mailto:rishikesh.menon@queensu.ca"
                className="link-underline"
              >
                Email
              </a>
            </div>
          </div>

          {status.ok === true && (
            <p className="mt-4 text-sm text-emerald-400">✅ {status.msg}</p>
          )}
          {status.ok === false && (
            <p className="mt-4 text-sm text-red-400">⚠️ {status.msg}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
