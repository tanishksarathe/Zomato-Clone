import { Utensils } from "lucide-react";
import { FaMeta, FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-(--color-text-primary) text-white px-6 py-14">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 animate-fadeInUp">
        {/* Brand Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-(--color-accent)">
              <Utensils size={22} />
            </div>
            <h2 className="text-2xl font-bold">
              Grab<span className="text-(--color-secondary)">MyMeal</span>
            </h2>
          </div>

          <p className="text-white/80 leading-relaxed">
            Connecting you with the best restaurants in your city. Fast
            delivery, secure payments, and a wide variety of cuisines —
            all in one place.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            {[FaMeta, FaXTwitter, FaInstagram, FaYoutube].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 hover:bg-(--color-secondary) transition"
                >
                  <Icon />
                </a>
              )
            )}
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold text-white/90 mb-4 tracking-wide">
            COMPANY
          </h4>
          <ul className="space-y-3 text-white/70">
            {["About Us", "Careers", "Blog", "Press"].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-(--color-secondary) transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold text-white/90 mb-4 tracking-wide">
            SUPPORT
          </h4>
          <ul className="space-y-3 text-white/70">
            {["Help Center", "Contact Us", "FAQs", "Safety"].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-(--color-secondary) transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-white/90 mb-4 tracking-wide">
            LEGAL
          </h4>
          <ul className="space-y-3 text-white/70">
            {[
              "Terms of Service",
              "Privacy Policy",
              "Cookie Policy",
              "Licenses",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-(--color-secondary) transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto mt-12 border-t border-white/20 pt-6 text-center text-white/60 text-sm">
        © 2026 Grab My Meal. All rights reserved.
      </div>
    </footer>
  );
}
 export default Footer