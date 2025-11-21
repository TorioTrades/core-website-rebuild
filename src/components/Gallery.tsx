import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import gallery1 from "@/assets/gallery-1.jpeg";
import gallery2 from "@/assets/gallery-2.jpeg";
import gallery3 from "@/assets/gallery-3.jpeg";
import gallery4 from "@/assets/gallery-4.jpeg";
import gallery5 from "@/assets/gallery-5.jpeg";

const Gallery = () => {
  const galleryImages = [
    { src: gallery1, alt: "CJ Hair Lounge transformation 1" },
    { src: gallery2, alt: "CJ Hair Lounge transformation 2" },
    { src: gallery3, alt: "CJ Hair Lounge transformation 3" },
    { src: gallery4, alt: "CJ Hair Lounge transformation 4" },
    { src: gallery5, alt: "CJ Hair Lounge transformation 5" },
  ];

  return (
    <section id="gallery" className="py-12 md:py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 md:mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-3 md:mb-4">
            Our Gallery
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Explore stunning transformations and beautiful hair artistry from CJ Hair Lounge
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {galleryImages.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <div className="relative overflow-hidden rounded-xl shadow-lg aspect-[3/4] group">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default Gallery;
