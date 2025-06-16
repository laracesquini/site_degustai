
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would handle the subscription in a real app
    console.log("Subscribing email:", email);
    setEmail("");
    // Show success message
  };
  
  return (
    <section className="py-20 bg-recipe-dark-green">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-2 flex items-center justify-center">
            <span className="inline-block w-12 h-px bg-recipe-tomato-red mx-2"></span>
            <span className="text-recipe-tomato-red uppercase tracking-widest text-sm">Stay Updated</span>
            <span className="inline-block w-12 h-px bg-recipe-tomato-red mx-2"></span>
          </div>
          
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Newsletter
          </h2>
          
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and get weekly updates on new recipes, cooking tips, and exclusive content delivered straight to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-recipe-tomato-red"
            />
            <Button type="submit" className="bg-recipe-tomato-red hover:bg-recipe-tomato-red/90 text-white rounded-md">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
