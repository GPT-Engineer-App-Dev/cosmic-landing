import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const spaceFacts = [
  {
    title: "The Sun's Size",
    fact: "The Sun is so large that approximately 1.3 million Earths could fit inside it.",
  },
  {
    title: "Black Hole at Galaxy's Center",
    fact: "There's a supermassive black hole at the center of our Milky Way galaxy.",
  },
  {
    title: "Venus' Rotation",
    fact: "Venus rotates on its axis in the opposite direction to most planets.",
  },
  {
    title: "Jupiter's Great Red Spot",
    fact: "Jupiter's Great Red Spot is a giant storm that has been raging for over 400 years.",
  },
  {
    title: "Speed of Light",
    fact: "Light from the Sun takes about 8 minutes to reach Earth.",
  },
];

const SpaceFacts = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Space Facts</h1>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {spaceFacts.map((fact, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0">
                <Card className="mx-4 h-64 flex items-center justify-center">
                  <CardContent className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">{fact.title}</h2>
                    <p className="text-lg">{fact.fact}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2"
          onClick={scrollNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SpaceFacts;
