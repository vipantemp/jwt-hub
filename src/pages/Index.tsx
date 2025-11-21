import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { JwtInput } from "@/components/JwtInput";
import { DecodedHeader } from "@/components/DecodedHeader";
import { DecodedPayload } from "@/components/DecodedPayload";
import { VerificationSection } from "@/components/VerificationSection";
import { HistorySidebar } from "@/components/HistorySidebar";
import { SaveHistoryDialog } from "@/components/SaveHistoryDialog";
import { Footer } from "@/components/Footer";
import { HelpDialog } from "@/components/HelpDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { History, Trash2, Shield, Code2, Menu, ChevronDown, ChevronUp } from "lucide-react";
import { ShareDropdown } from "@/components/ShareDropdown";
import { decodeToken, verifyToken, encodeToken } from "@/lib/jwt-utils";
import { DecodedJwt, JwtHistoryItem, Algorithm, JwtPayload } from "@/types/jwt";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MzIwNTYwMDB9.4Adcj0vt4z7hFLWKZOFS8Y8lKz3_tJKGnJ9qjh_XZQM";

const Index = () => {
  const [token, setToken] = useState(SAMPLE_JWT);
  const [decoded, setDecoded] = useState<DecodedJwt | null>(null);
  const [secret, setSecret] = useState("your-secret-key");
  const [algorithm, setAlgorithm] = useState<Algorithm>("HS256");
  const [verificationResult, setVerificationResult] = useState<{
    valid: boolean;
    error?: string;
  }>();
  const [history, setHistory] = useState<JwtHistoryItem[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [highlightSection, setHighlightSection] = useState<"header" | "payload" | "signature" | null>(null);
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("jwt-history");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (token.trim()) {
      // Extract token from Bearer prefix if present
      let cleanToken = token.trim();
      if (cleanToken.toLowerCase().startsWith('bearer ')) {
        cleanToken = cleanToken.substring(7).trim();
      }
      
      const result = decodeToken(cleanToken);
      if (result) {
        setDecoded(result);
        setAlgorithm(result.header.alg as Algorithm);
        // Update token state with cleaned token if Bearer prefix was present
        if (cleanToken !== token.trim()) {
          setToken(cleanToken);
        }
      } else {
        setDecoded(null);
        toast({
          title: "Invalid JWT",
          description: "Please check the token format",
          variant: "destructive",
        });
      }
    } else {
      setDecoded(null);
    }
  }, [token, toast]);

  const handleVerify = async () => {
    if (!token.trim()) return;

    const result = await verifyToken(token, secret, algorithm);
    setVerificationResult(result);

    toast({
      title: result.valid ? "Valid JWT" : "Invalid JWT",
      description: result.error || "Signature verified successfully",
      variant: result.valid ? "default" : "destructive",
    });
  };

  const handleClaimChange = async (
    claim: "iat" | "nbf" | "exp",
    value: number
  ) => {
    if (!decoded) return;

    const newPayload = { ...decoded.payload, [claim]: value };
    try {
      const newToken = await encodeToken(decoded.header, newPayload, secret);
      setToken(newToken);
      
      toast({
        title: "Token Updated",
        description: `${claim.toUpperCase()} claim updated successfully`,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not generate new token",
        variant: "destructive",
      });
    }
  };

  const handleApplySuggestions = async () => {
    if (!decoded) return;

    const now = Math.floor(Date.now() / 1000);
    const newPayload = {
      ...decoded.payload,
      iat: decoded.payload.iat || now,
      nbf: decoded.payload.nbf || now,
      exp: decoded.payload.exp || now + 3600,
    };

    try {
      const newToken = await encodeToken(decoded.header, newPayload, secret);
      setToken(newToken);
      
      toast({
        title: "Claims Added",
        description: "Standard claims have been applied",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not generate new token",
        variant: "destructive",
      });
    }
  };

  const handleAlgorithmChange = async (alg: Algorithm) => {
    if (!decoded) return;
    
    setAlgorithm(alg);
    const newHeader = { ...decoded.header, alg };
    
    try {
      const newToken = await encodeToken(newHeader, decoded.payload, secret);
      setToken(newToken);
      
      toast({
        title: "Algorithm Changed",
        description: `Token algorithm updated to ${alg}`,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not generate new token with new algorithm",
        variant: "destructive",
      });
    }
  };

  const saveToHistory = (name: string) => {
    if (!decoded) return;

    const newItem: JwtHistoryItem = {
      id: Date.now().toString(),
      name,
      token,
      decoded,
      timestamp: Date.now(),
      verified: verificationResult?.valid,
    };

    const newHistory = [newItem, ...history].slice(0, 20);
    setHistory(newHistory);
    localStorage.setItem("jwt-history", JSON.stringify(newHistory));

    toast({
      title: "Saved to History",
      description: `JWT saved as "${name}"`,
    });
  };

  const handlePayloadChange = async (newPayload: JwtPayload) => {
    if (!decoded) return;

    try {
      const newToken = await encodeToken(decoded.header, newPayload, secret);
      setToken(newToken);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not generate new token",
        variant: "destructive",
      });
    }
  };

  const loadFromHistory = (item: JwtHistoryItem) => {
    setToken(item.token);
    setHistoryOpen(false);
    toast({
      title: "Loaded from History",
      description: "JWT loaded successfully",
    });
  };

  const deleteFromHistory = (id: string) => {
    const newHistory = history.filter((item) => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem("jwt-history", JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("jwt-history");
    toast({
      title: "History Cleared",
      description: "All history items have been removed",
    });
  };

  const clearAll = () => {
    setToken("");
    setDecoded(null);
    setVerificationResult(undefined);
    toast({
      title: "Cleared",
      description: "All fields have been reset",
    });
  };

  const isExpired =
    decoded?.payload.exp && Math.floor(Date.now() / 1000) > decoded.payload.exp;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  JWT Decoder & Verifier
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation - Moved to Right */}
            <div className="flex items-center gap-2">
              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList className="gap-1">
                  <NavigationMenuItem>
                    <Link 
                      to="/" 
                      className="px-4 py-2 text-sm font-medium text-foreground hover:text-blue-500 transition-colors duration-200 relative group"
                    >
                      Home
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link 
                      to="/about-us" 
                      className="px-4 py-2 text-sm font-medium text-foreground hover:text-blue-500 transition-colors duration-200 relative group"
                    >
                      About
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link 
                      to="/contact-us" 
                      className="px-4 py-2 text-sm font-medium text-foreground hover:text-blue-500 transition-colors duration-200 relative group"
                    >
                      Contact
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <ThemeToggle />
              <HelpDialog />
              
              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <nav className="flex flex-col gap-4 mt-8">
                    <Link 
                      to="/" 
                      className="text-lg font-medium hover:text-blue-500 transition-colors duration-200"
                    >
                      Home
                    </Link>
                    <Link 
                      to="/about-us" 
                      className="text-lg font-medium hover:text-blue-500 transition-colors duration-200"
                    >
                      About Us
                    </Link>
                    <Link 
                      to="/contact-us" 
                      className="text-lg font-medium hover:text-blue-500 transition-colors duration-200"
                    >
                      Contact Us
                    </Link>
                    <div className="border-t border-border pt-4 mt-4">
                      <Link 
                        to="/privacy-policy" 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors block mb-2"
                      >
                        Privacy Policy
                      </Link>
                      <Link 
                        to="/terms-conditions" 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors block mb-2"
                      >
                        Terms & Conditions
                      </Link>
                      <Link 
                        to="/disclaimer" 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                      >
                        Disclaimer
                      </Link>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Sub-Header with Utility Buttons */}
        <div className="border-t border-border/30">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-end gap-2 flex-wrap">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setHistoryOpen(true)}
                className="gap-2"
              >
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAll}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
              <Link to="/code-examples">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Code2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Code</span>
                </Button>
              </Link>
              <ShareDropdown token={token} disabled={!decoded} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Full Width JWT Input */}
        <div className="mb-6">
          <JwtInput 
            value={token} 
            onChange={setToken}
            highlightSection={highlightSection}
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Header & Verification */}
          <div className="lg:col-span-4 grid md:grid-cols-2 lg:grid-cols-1 gap-6">
            {decoded && (
              <>
                <Collapsible open={!headerCollapsed} onOpenChange={(open) => setHeaderCollapsed(!open)}>
                  <Card className="glass-card p-4">
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full flex items-center justify-between p-2 hover:bg-muted/50">
                        <span className="text-lg font-bold text-header-panel">Header Section</span>
                        {headerCollapsed ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <DecodedHeader
                        header={decoded.header}
                        onAlgorithmChange={handleAlgorithmChange}
                        onHover={(hovered) => setHighlightSection(hovered ? "header" : null)}
                      />
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
                <VerificationSection
                  secret={secret}
                  algorithm={algorithm}
                  onSecretChange={setSecret}
                  onAlgorithmChange={handleAlgorithmChange}
                  onVerify={handleVerify}
                  verificationResult={verificationResult}
                  isExpired={isExpired}
                  onHover={(hovered) => setHighlightSection(hovered ? "signature" : null)}
                />
                <Button onClick={() => setSaveDialogOpen(true)} className="w-full md:col-span-2 lg:col-span-1">
                  Save to History
                </Button>
              </>
            )}
          </div>

          {/* Right Column - Payload Panel */}
          <div className="lg:col-span-8 space-y-6">
            {decoded ? (
              <DecodedPayload
                payload={decoded.payload}
                onClaimChange={handleClaimChange}
                onApplySuggestions={handleApplySuggestions}
                onPayloadChange={handlePayloadChange}
                onHover={(hovered) => setHighlightSection(hovered ? "payload" : null)}
              />
            ) : (
              <div className="flex items-center justify-center h-96 glass-card rounded-lg">
                <div className="text-center space-y-3">
                  <Shield className="h-16 w-16 mx-auto text-muted-foreground/50" />
                  <h3 className="text-xl font-semibold text-muted-foreground">
                    Paste a JWT to get started
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your token will be decoded and displayed here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* History Sidebar */}
      <HistorySidebar
        history={history}
        onLoad={loadFromHistory}
        onDelete={deleteFromHistory}
        onClear={clearHistory}
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
      />

      {/* Save Dialog */}
      <SaveHistoryDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        onSave={saveToHistory}
      />

      {/* Overlay */}
      {historyOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setHistoryOpen(false)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
