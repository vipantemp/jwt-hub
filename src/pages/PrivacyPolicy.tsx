import { Link } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  JWT Decoder & Verifier
                </h1>
              </div>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto glass-card p-8">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Information Collection</h2>
              <p className="text-muted-foreground leading-relaxed">
                We prioritize your privacy. Our JWT decoder and verifier tool operates entirely in your browser. 
                No JWT tokens, secrets, or decoded data are transmitted to our servers or stored remotely.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Local Storage</h2>
              <p className="text-muted-foreground leading-relaxed">
                The application uses browser local storage to save your JWT history and preferences. This data 
                remains on your device and is never shared with third parties. You can clear this data at any 
                time through your browser settings or using the "Clear History" feature.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                All JWT processing, decoding, and verification happens locally in your browser. We implement 
                industry-standard security practices to ensure your tokens and secrets remain private and secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our application does not integrate with third-party analytics or tracking services. We do not 
                collect, store, or share your personal information with external parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this privacy policy from time to time. Any changes will be posted on this page 
                with an updated revision date.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
