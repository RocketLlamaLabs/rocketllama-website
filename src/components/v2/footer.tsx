import Image from "next/image";
import Link from "next/link";

// Footer for the version 2 sample pages. The mockup's BBM wordmark is swapped
// for the Rocket Llama Labs wordmark; the note says which page this is.
export function V2Footer({ note }: { note: string }) {
  return (
    <footer>
      <div className="wrap in">
        <Link className="wm" href="/v2" aria-label="Rocket Llama Labs home">
          <Image
            src="/brand/wordmark-horizontal-rocket-o.svg"
            alt="Rocket Llama Labs"
            width={160}
            height={16}
          />
        </Link>
        <span>
          <b>Rocket Llama Labs</b> · Phoenix, Arizona · Branson, Brian and
          Madison
        </span>
        <span>
          {note} · not indexed ·{" "}
          <Link href="/admin/website/v2">Version 2 kit</Link>
        </span>
      </div>
    </footer>
  );
}
