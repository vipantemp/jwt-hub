import { Card } from "./ui/card";
import { Copy, Check } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface SignaturePanelProps {
  signature: string;
}

export function SignaturePanel({ signature }: SignaturePanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(signature);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="glass-card p-6 border-l-4 border-l-signature-panel">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-signature-panel">Signature</h3>
        <Button variant="ghost" size="sm" onClick={handleCopy}>
          {copied ? (
            <Check className="h-4 w-4 text-success" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="p-4 rounded-lg bg-signature-panel-bg/20 border border-signature-panel/20">
        <pre className="font-mono text-sm text-signature-panel break-all whitespace-pre-wrap">
          {signature}
        </pre>
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        Base64-encoded signature. Verify using the secret key below.
      </p>
    </Card>
  );
}
