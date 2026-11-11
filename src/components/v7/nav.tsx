/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages -- same markup as the generated pages */

// The site navigation, as it appears on every version 7 page. The generated
// pages carry this markup inline (scripts/make-v3.py); hand-written pages use
// this component. Keep the two in step.
export function V7Nav() {
  return (
    <>
      <nav className="nav" aria-label="Main"><div className="wrap in">
        <a className="wm" href="/" aria-label="Rocket Llama Labs home"><img src="/brand/logo-nav.svg" alt="Rocket Llama Labs" /></a>
        <div className="links"><a href="/services">Services</a><a href="/industries">Industries</a><a href="/about">About</a></div>
        <div className="navbtns"><a className="btn sm" href="/book">Schedule a call</a><a className="btn sm ghost" href="/audit">Run an instant audit</a></div>
        <details className="menu">
          <summary aria-label="Menu"><span></span></summary>
          <div className="panel">
            <a href="/services">Services</a><a href="/industries">Industries</a><a href="/about">About</a>
            <a className="btn sm" href="/book">Schedule a call</a>
            <a className="btn sm ghost" href="/audit">Run an instant audit</a>
          </div>
        </details>
      </div></nav>
      <script dangerouslySetInnerHTML={{__html:"document.addEventListener('click',function(e){var m=e.target.closest('.v7 .nav .menu');if(m){if(e.target.closest('a'))m.removeAttribute('open');}else{document.querySelectorAll('.v7 .nav .menu[open]').forEach(function(x){x.removeAttribute('open')})}})"}} />
    </>
  );
}
