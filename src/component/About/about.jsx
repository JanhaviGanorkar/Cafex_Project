// components/About.jsx
import aboutImg from "@/assets/img/about.png";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section
      id="about"
className="min-h-screen grid md:grid-cols-2 items-center gap-12 px-6 py-20 bg-black text-white"
    >
      <div className="w-full max-w-md mx-auto">
        <img src={aboutImg} alt="About" className="w-full h-auto" />
      </div>

      <div>
        <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
          Living well begins <br /> with eating well.
        </h2>
        <p className="text-gray-400 text-base leading-relaxed mb-6">
          Our its history as a food, the main uses of honey are in cooking,
          baking, desserts, as a spread on bread, as an addition to various
          beverages such as tea, and as a sweetener in some commercial beverages.
          <br />
          <br />
          Due to its energy density, honey is an important food for virtually all
          hunter-gatherer cultures in warm climates, with the Hadza people ranking
          honey as their favorite food.
        </p>
        <Link to="/login">
          <Button
            variant="secondary"
            className="rounded-full px-6 py-4 text-orange-400 bg-gray-900 hover:bg-orange-400 hover:text-black transition"
          >
            Admin Login <ArrowRight className="ml-2" size={18} />
          </Button>
        </Link>
      </div>
    </section>
  );
}
