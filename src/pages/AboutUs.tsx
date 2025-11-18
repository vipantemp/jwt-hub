import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Target, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AboutUs = () => {
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

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="glass-card p-8">
            <h1 className="text-4xl font-bold mb-6">About Us</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              JWT Tools is a modern, privacy-focused platform designed to help developers work with JSON 
              Web Tokens efficiently and securely. Built with developers in mind, our tool provides instant 
              JWT decoding, verification, and analysis—all processed locally in your browser.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe in transparency, security, and developer productivity. That's why we've created a 
              tool that never transmits your sensitive tokens or secrets to any server, ensuring complete 
              privacy while you work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Target className="h-10 w-10 text-primary mb-3" />
                <CardTitle>Our Mission</CardTitle>
                <CardDescription>
                  To provide developers with secure, efficient, and user-friendly tools for JWT token 
                  management and analysis.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-3" />
                <CardTitle>Privacy First</CardTitle>
                <CardDescription>
                  All processing happens locally in your browser. Your tokens never leave your device, 
                  ensuring maximum security and privacy.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-3" />
                <CardTitle>Developer Focused</CardTitle>
                <CardDescription>
                  Built by developers for developers. We understand your workflow and provide the tools 
                  you need to work efficiently.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Instant JWT decoding and verification with support for HS256, HS384, and HS512 algorithms</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Real-time payload editing with automatic token regeneration</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Token history management for quick access to previously decoded tokens</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Code examples in multiple programming languages for easy integration</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>QR code generation and sharing capabilities for collaboration</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Progressive Web App support for offline functionality</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
