import { Card } from "@/components/ui/card";

interface ServicesProps {
  onBookingClick: () => void;
}

const Services = ({ onBookingClick }: ServicesProps) => {
  const packageServices = [
    {
      title: "Hair Color",
      prices: [
        { length: "Starting at", price: "₱1500" },
      ],
    },
    {
      title: "Hair Mask or Treatment",
      prices: [
        { length: "Starting at", price: "₱1500" },
      ],
    },
    {
      title: "Highlights and Tone with Hair Mask Treatment",
      prices: [
        { length: "Starting at", price: "₱3000" },
      ],
    },
    {
      title: "Balayage & Tone with Hair Mask Treatment",
      prices: [
        { length: "Starting at", price: "₱3500" },
      ],
    },
    {
      title: "Keratin & Brazilian with Hair Color and Hair Mask",
      prices: [
        { length: "Starting at", price: "₱3000" },
      ],
    },
    {
      title: "Keratin with Hair Color and Hair Mask",
      prices: [
        { length: "Starting at", price: "₱3500" },
      ],
    },
    {
      title: "Brazilian Blow Out Original with Hair Color and Hair Mask",
      prices: [
        { length: "Starting at", price: "₱4000" },
      ],
    },
    {
      title: "One Step Rebond with Hair Color and Hair Mask",
      prices: [
        { length: "Starting at", price: "₱2500" },
      ],
    },
  ];

  return (
    <section id="services" className="py-12 md:py-20 px-4 bg-background relative overflow-hidden">
      {/* Wave decoration */}
      <div className="absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-20 fill-secondary/50">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
        </svg>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <p className="text-primary font-medium tracking-wider uppercase text-xs md:text-sm mb-2">Price List</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-foreground mb-3 md:mb-4">Hair Services</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional hair care and styling services with transparent pricing
          </p>
        </div>

        {/* Package Services */}
        <div className="mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold font-serif text-foreground mb-6 text-center">Packages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {packageServices.map((service, index) => (
              <Card 
                key={service.title}
                className="overflow-hidden border border-border shadow-md hover:shadow-lg transition-shadow duration-300 bg-card animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-4 md:p-6">
                  <h4 className="text-base md:text-lg font-serif font-bold text-foreground mb-4">
                    {service.title}
                  </h4>
                  <div className="space-y-2">
                    {service.prices.map((priceItem) => (
                      <div key={priceItem.length} className="flex justify-between items-center py-2 border-t border-border/50">
                        <span className="text-sm md:text-base text-muted-foreground">{priceItem.length}</span>
                        <span className="text-lg md:text-xl font-bold text-primary">{priceItem.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 md:mt-12">
          <button 
            onClick={onBookingClick}
            className="inline-flex items-center justify-center px-6 py-3 md:px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-md text-sm md:text-base w-full sm:w-auto"
          >
            Book an Appointment
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
