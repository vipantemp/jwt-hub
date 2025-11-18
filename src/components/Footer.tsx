import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">JWT Tools</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Advanced JWT decoding, verification, and analysis platform for developers.
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/privacy-policy" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms-conditions" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link 
                  to="/disclaimer" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/about-us" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact-us" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools Links */}
          <div>
            <h3 className="font-semibold mb-3">Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  JWT Decoder
                </Link>
              </li>
              <li>
                <Link 
                  to="/code-examples" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Code Examples
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} JWT Tools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
