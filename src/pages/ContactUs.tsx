import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Mail, MessageSquare, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ContactUs = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
  };

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
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground">
              Have questions, feedback, or suggestions? We'd love to hear from you. Reach out to us 
              through any of the channels below.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What's this about?" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Your message here..." 
                      rows={5}
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <Mail className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Email Us</CardTitle>
                  <CardDescription>
                    For general inquiries and support
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a 
                    href="mailto:support@jwttools.com" 
                    className="text-primary hover:underline"
                  >
                    support@jwttools.com
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Github className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Open Source</CardTitle>
                  <CardDescription>
                    Contribute or report issues on GitHub
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a 
                    href="https://github.com/jwttools" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    github.com/jwttools
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <MessageSquare className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Community</CardTitle>
                  <CardDescription>
                    Join our developer community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Connect with other developers and get help with JWT implementation
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
