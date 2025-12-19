import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoEspaconave from "@/assets/logo-espaconave.jpg";

interface CarouselSlide {
  id: number;
  type: "artist" | "release" | "news" | "radio";
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    type: "artist",
    title: "Maria Santos",
    subtitle: "Nova Voz do MPB",
    description: "Descubra o talento que está revolucionando a música brasileira contemporânea.",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&h=800&fit=crop",
    tag: "Artista em Destaque",
  },
  {
    id: 2,
    type: "release",
    title: "Horizonte Infinito",
    subtitle: "Novo Álbum • João Silva",
    description: "12 faixas que exploram as fronteiras entre o eletrônico e o orgânico.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=800&fit=crop",
    tag: "Lançamento",
  },
  {
    id: 3,
    type: "news",
    title: "Estúdio Renovado",
    subtitle: "Novas instalações inauguradas",
    description: "Equipamentos de última geração para produções de qualidade internacional.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=800&fit=crop",
    tag: "Notícias",
  },
  {
    id: 4,
    type: "radio",
    title: "Rádio 24 Horas",
    subtitle: "Sempre no ar",
    description: "O melhor da produção do estúdio, 24 horas por dia, 7 dias por semana.",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&h=800&fit=crop",
    tag: "Ao Vivo",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-foreground/40 rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Background Image */}
      <div className="absolute inset-0">
        {slides.map((s, index) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            {/* Logo */}
            <div
              className={`mb-8 transition-all duration-500 ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              <img
                src={logoEspaconave}
                alt="Espaço Nave"
                className="w-20 h-20 rounded-2xl object-cover shadow-glow"
              />
            </div>

            {/* Tag */}
            <div
              className={`inline-block mb-6 transition-all duration-500 ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <span className="px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30">
                {slide.tag}
              </span>
            </div>

            {/* Title */}
            <h1
              className={`font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4 transition-all duration-500 ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p
              className={`text-xl md:text-2xl text-primary font-medium mb-6 transition-all duration-500 ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              {slide.subtitle}
            </p>

            {/* Description */}
            <p
              className={`text-lg text-muted-foreground mb-8 max-w-lg transition-all duration-500 ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              {slide.description}
            </p>

            {/* CTA */}
            <div
              className={`transition-all duration-500 ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <Button variant="hero" className="rounded-full">
                <Rocket size={18} />
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-1/2 translate-y-1/2 left-6 right-6 flex justify-between pointer-events-none">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-foreground hover:text-primary transition-colors pointer-events-auto"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-foreground hover:text-primary transition-colors pointer-events-auto"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-primary"
                : "w-2 bg-foreground/30 hover:bg-foreground/50"
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-12 right-12 hidden lg:block">
        <span className="text-5xl font-display font-bold text-primary">
          {String(currentSlide + 1).padStart(2, "0")}
        </span>
        <span className="text-2xl text-muted-foreground font-display">
          /{String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
};

export default HeroCarousel;
