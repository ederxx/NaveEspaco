export default function RadioPlayer() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-4">
          Rádio Espaconave 🎶
        </h2>

        <p className="text-white/70 mb-8">
          Playlist oficial com a vibração da nave — reggae, rap e rock em rotação contínua.
        </p>

        <iframe
          style={{ borderRadius: "16px" }}
          src="https://open.spotify.com/embed/playlist/14nHdc5nM2I9t6VdOqCWgs"
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </section>
  );
}
