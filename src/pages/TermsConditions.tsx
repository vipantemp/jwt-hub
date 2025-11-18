import { Link } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";

const TermsConditions = () => {
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
          <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using this JWT decoder and verifier tool, you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to these terms, please do not 
                use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed">
                Permission is granted to temporarily use this web application for personal, non-commercial 
                transitory viewing only. This is the grant of a license, not a transfer of title, and under 
                this license you may not modify or copy the materials, use the materials for any commercial 
                purpose, or attempt to reverse engineer any software contained on the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Service Availability</h2>
              <p className="text-muted-foreground leading-relaxed">
                We strive to provide continuous service availability. However, we do not guarantee that the 
                service will be uninterrupted, timely, secure, or error-free. We reserve the right to modify 
                or discontinue the service at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall JWT Tools or its suppliers be liable for any damages (including, without 
                limitation, damages for loss of data or profit, or due to business interruption) arising out 
                of the use or inability to use the materials on this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with applicable laws, 
                and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsConditions;
