import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { JwtInput } from "@/components/JwtInput";
import { DecodedHeader } from "@/components/DecodedHeader";
import { DecodedPayload } from "@/components/DecodedPayload";
import { VerificationSection } from "@/components/VerificationSection";
import { HistorySidebar } from "@/components/HistorySidebar";
import { SaveHistoryDialog } from "@/components/SaveHistoryDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { History, Trash2, Shield } from "lucide-react";
import { decodeToken, verifyToken, encodeToken } from "@/lib/jwt-utils";
import { DecodedJwt, JwtHistoryItem, Algorithm, JwtPayload } from "@/types/jwt";

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
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("jwt-history");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (token.trim()) {
      const result = decodeToken(token);
      if (result) {
        setDecoded(result);
        setAlgorithm(result.header.alg as Algorithm);
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  JWT Decoder & Verifier
                </h1>
                <p className="text-xs text-muted-foreground">
                  Advanced token analysis and verification
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setHistoryOpen(true)}
              >
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
              <Button variant="outline" size="sm" onClick={clearAll}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
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
          <div className="lg:col-span-4 space-y-6">
            {decoded && (
              <>
                <DecodedHeader
                  header={decoded.header}
                  onAlgorithmChange={handleAlgorithmChange}
                  onHover={(hovered) => setHighlightSection(hovered ? "header" : null)}
                />
                <VerificationSection
                  secret={secret}
                  algorithm={algorithm}
                  onSecretChange={setSecret}
                  onAlgorithmChange={handleAlgorithmChange}
                  onVerify={handleVerify}
                  verificationResult={verificationResult}
                  isExpired={isExpired}
                />
                <Button onClick={() => setSaveDialogOpen(true)} className="w-full">
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
    </div>
  );
};

export default Index;
