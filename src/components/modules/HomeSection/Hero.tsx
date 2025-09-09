import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 relative z-10">
        {/* Left Content */}
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Send Parcels Faster, Smarter, & Stress-Free 🚚
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
            Whether you’re an individual or a business, book, track, and manage
            your deliveries all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg">Send a Parcel</Button>
            <Button size="lg" variant="outline">
              Track Parcel
            </Button>
          </div>
        </div>

        {/* Abstract Illustration */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-tr from-primary/40 to-primary/10 blur-3xl absolute -top-16 -left-16" />
          <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full bg-gradient-to-tr from-purple-500/40 to-blue-500/10 blur-3xl absolute top-16 right-0" />

          <div className="relative bg-card border shadow-xl rounded-2xl p-6 max-w-sm">
            <h3 className="text-xl font-semibold mb-2">Smart Dashboard</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Real-time delivery analytics, customer updates, and parcel
              tracking in one simple view.
            </p>
            <div className="h-32 rounded-lg bg-gradient-to-r from-primary/20 via-primary/10 to-muted" />
          </div>
        </div>
      </div>
    </section>
  );
}
