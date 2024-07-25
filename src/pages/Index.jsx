import React from 'react';
import { Button } from "@/components/ui/button";
import { Rocket, Star, Satellite } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-blue-900 text-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Explore the Cosmos</h1>
        <p className="text-xl md:text-2xl mb-8">Embark on a journey through the wonders of space</p>
        <Button size="lg" className="bg-green-500 hover:bg-green-600">
          <Rocket className="mr-2 h-5 w-5" /> Start Your Adventure
        </Button>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Discover the Universe</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Star className="h-12 w-12 text-yellow-400" />}
            title="Stellar Exploration"
            description="Journey through distant galaxies and witness the birth of stars."
          />
          <FeatureCard
            icon={<Satellite className="h-12 w-12 text-green-400" />}
            title="Space Technology"
            description="Learn about cutting-edge spacecraft and space stations."
          />
          <FeatureCard
            icon={<Satellite className="h-12 w-12 text-green-400" />}
            title="Space Technology"
            description="Learn about cutting-edge spacecraft and space stations."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Launch?</h2>
          <p className="text-xl mb-8">Join our community of space enthusiasts and stay updated on the latest cosmic discoveries.</p>
          <Button size="lg" variant="secondary">
            Sign Up for Updates
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-center py-8">
        <p>&copy; 2024 Cosmic Explorers. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-blue-800 p-6 rounded-lg text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
);

export default Index;
