import { Link } from "react-router-dom";
import { Shield, ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Disclaimer = () => {
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
          <h1 className="text-4xl font-bold mb-6">Disclaimer</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <Alert className="mb-8 border-warning">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <AlertDescription className="text-foreground">
              This tool is provided for educational and development purposes only. Always exercise caution 
              when handling sensitive authentication tokens.
            </AlertDescription>
          </Alert>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. General Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                The information provided by JWT Tools is for general informational purposes only. All 
                information on the site is provided in good faith, however we make no representation or 
                warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, 
                reliability, availability, or completeness of any information on the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. No Professional Advice</h2>
              <p className="text-muted-foreground leading-relaxed">
                The site cannot and does not contain security advice. The security information is provided 
                for general informational and educational purposes only and is not a substitute for 
                professional security advice. You should consult with a security professional before acting 
                on any information contained in this tool.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Security Considerations</h2>
              <p className="text-muted-foreground leading-relaxed">
                While this tool processes all JWT tokens locally in your browser without server transmission, 
                users should exercise caution when handling production tokens and secrets. Never share 
                production credentials or tokens in insecure environments. Always follow security best 
                practices for token management in your applications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. External Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                The site may contain links to external websites that are not provided or maintained by us. 
                We do not guarantee the accuracy, relevance, timeliness, or completeness of any information 
                on these external websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Errors and Omissions</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we have made every attempt to ensure that the information contained in this tool is 
                correct, JWT Tools is not responsible for any errors or omissions, or for the results 
                obtained from the use of this information. Users rely on the information at their own risk.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Disclaimer;
