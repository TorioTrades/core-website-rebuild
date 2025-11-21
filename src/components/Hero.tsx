import { Button } from "@/components/ui/button";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";

interface HeroProps {
  onBookingClick: () => void;
}

const Hero = ({ onBookingClick }: HeroProps) => {

  return (
    <section className="relative min-h-[65vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden -mt-16">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://i.imgur.com/b19YYix.mp4#t=2" type="video/mp4" />
      </video>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="container mx-auto max-w-7xl relative z-10 px-4 py-12 md:py-16">
        <div className="flex flex-col items-center justify-center text-center space-y-6 md:space-y-8">
          {/* Text Content */}
          <div className="animate-fade-in-up space-y-4 md:space-y-6 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-serif text-balance leading-tight">
              <span className="text-white">YOUR ONE STOP </span>
              <span className="text-primary">BEAUTY SHOP</span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto text-balance">
              Experience premium hair transformations with Brazilian Keratin, expert coloring, balayage, and precision styling. Your journey to stunning, healthy hair starts here.
            </p>
            
            <Button 
              size="lg" 
              onClick={onBookingClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-5 md:px-8 md:py-6 text-base md:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-auto"
            >
              Book Your Transformation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
