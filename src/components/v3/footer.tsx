import Image from "next/image";
import Link from "next/link";

// Footer for version 3: the version 2 layout in the Rocket Llama colors,
// with the stacked logo (mascot, then Rocket / Llama on two lines).
export function V3Footer({ note }: { note: string }) {
  return (
    <footer>
      <div className="wrap in">
        <Link className="wm" href="/" aria-label="Rocket Llama Labs home">
          <Image
            src="/brand/logo-stacked.svg"
            alt="Rocket Llama Labs"
            width={137}
            height={40}
          />
        </Link>
        <span>
          <b>Rocket Llama Labs</b> · Phoenix, Arizona · Branson, Brian and
          Madison
        </span>
        <span>
          {note} · not indexed ·{" "}
          <Link href="/admin/website">Website versions</Link>
        </span>
      </div>
    </footer>
  );
}
