const Footer = () => {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content mt-10 flex flex-col md:flex-row justify-between gap-3">
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
      </nav>
      <aside className="footer-center p-4">
        <p>Copyright © 2025 - All right reserved by Gadget Shop Ltd</p>
      </aside>
    </footer>
  );
};

export default Footer;
