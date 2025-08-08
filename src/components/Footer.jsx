export default function Footer() {
  return (
    <footer className="pt-10 pb-16">
      <div className="container">
        <div className="card px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} Rishikesh Menon. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <a href="#hero" className="link-underline">Back to top</a>
            <span className="text-white/30">|</span>
            <a href="#contact" className="link-underline">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
