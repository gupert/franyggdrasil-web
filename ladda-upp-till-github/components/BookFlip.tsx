/* Bokomslaget: vänds till baksidan när man för musen över (eller trycker på mobil). */
export default function BookFlip({ alt, backAlt }: { alt: string; backAlt: string }) {
  return (
    <div className="book3d" tabIndex={0}>
      <div className="book3d-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="face front" src="/art/omslag.webp" alt={alt} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="face back" src="/art/baksida.webp" alt={backAlt} />
      </div>
    </div>
  );
}
