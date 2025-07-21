function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-emerald-950 text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <a
          href="https://github.com/my-travel-palette/my-travel-palette"
          target="_blank"
          className="footer-link"
        >
          <span className="text-2xl p-4">
            <i className="fa fa-github" aria-hidden="true"></i>
          </span>
          View our project on Github
        </a>
      </aside>
    </footer>
  );
}

export default Footer;
