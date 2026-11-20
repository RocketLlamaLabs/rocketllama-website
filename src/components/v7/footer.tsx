import Image from "next/image";
import Link from "next/link";

// Footer for version 7: the version 2 layout in the Rocket Llama colors,
// with the stacked logo (mascot, then Rocket / Llama on two lines).
export function V7Footer({ note: _note }: { note: string }) {
  return (
    <footer>
      <div className="wrap in">
        <Link className="wm" href="/" aria-label="Rocket Llama Labs home">
          <Image
            src="/brand/logo-nav.svg"
            alt="Rocket Llama Labs"
            width={249}
            height={40}
          />
        </Link>
        <span className="copy">&copy; 2026 Rocket Llama Labs LLC<span className="contact"><a href="mailto:info@rocketllamalabs.com">info@rocketllamalabs.com</a><span className="gap" aria-hidden="true"> · </span><a className="social" href="https://www.facebook.com/rocketllamalabs" target="_blank" rel="me noopener" aria-label="Rocket Llama Labs on Facebook" title="Facebook"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/></svg></a><span className="gap" aria-hidden="true"> · </span><a className="social" href="https://www.instagram.com/rocketllamalabs/" target="_blank" rel="me noopener" aria-label="Rocket Llama Labs on Instagram" title="Instagram"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><defs><radialGradient id="ig-grad" cx="30%" cy="107%" r="150%"><stop offset="0" stopColor="#fdf497" /><stop offset=".05" stopColor="#fdf497" /><stop offset=".45" stopColor="#fd5949" /><stop offset=".6" stopColor="#d6249f" /><stop offset=".9" stopColor="#285aeb" /></radialGradient></defs><rect width="24" height="24" rx="6" fill="url(#ig-grad)" /><rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" /><circle cx="12" cy="12" r="3.3" fill="none" stroke="#fff" strokeWidth="1.8" /><circle cx="16.3" cy="7.7" r="1.05" fill="#fff" /></svg></a></span></span>
        <span className="legal"><Link href="/privacy">Privacy Policy</Link> / <Link href="/terms">Website Policy</Link> / <Link href="/ai-policy">AI Policy</Link></span>
      </div>
    </footer>
  );
}
