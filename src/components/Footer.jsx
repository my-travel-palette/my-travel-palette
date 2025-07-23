function Footer() {
  return (
    <footer className="footer flex flex-col sm:flex-row justify-center items-center gap-2 bg-emerald-950 text-neutral-content p-4 text-center">
      <a
        href="https://github.com/my-travel-palette/my-travel-palette"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:text-white transition"
      >
        <span className="text-2xl">
          <i className="fa fa-github" aria-hidden="true"></i>
        </span>
        <span className="text-sm md:text-base">View our project on GitHub</span>
      </a>
    </footer>
  );
}

export default Footer;
