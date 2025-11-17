import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Shield, CheckCircle2, XCircle, AlertTriangle, Eye, EyeOff, Code } from "lucide-react";
import { Algorithm } from "@/types/jwt";
import { Switch } from "./ui/switch";

interface VerificationSectionProps {
  secret: string;
  algorithm: Algorithm;
  publicKey: string;
  onSecretChange: (secret: string) => void;
  onPublicKeyChange: (key: string) => void;
  onAlgorithmChange: (alg: Algorithm) => void;
  onVerify: () => void;
  verificationResult?: { valid: boolean; error?: string };
  isExpired?: boolean;
  onHover?: (hovered: boolean) => void;
}

const ALGORITHMS: Algorithm[] = [
  "HS256", "HS384", "HS512",
  "RS256", "RS384", "RS512",
  "ES256", "ES384", "ES512",
  "none"
];

export function VerificationSection({
  secret,
  algorithm,
  publicKey,
  onSecretChange,
  onPublicKeyChange,
  onAlgorithmChange,
  onVerify,
  verificationResult,
  isExpired,
  onHover,
}: VerificationSectionProps) {
  const [showSecret, setShowSecret] = useState(false);
  const [isBase64, setIsBase64] = useState(false);

  const handleSecretChange = (value: string) => {
    onSecretChange(value);
  };

  const displaySecret = isBase64 && secret ? (() => {
    try {
      return btoa(secret);
    } catch {
      return secret;
    }
  })() : secret;

  const handleBase64Toggle = (checked: boolean) => {
    setIsBase64(checked);
    if (checked && secret) {
      // When enabling base64, encode the current secret
      try {
        onSecretChange(secret);
      } catch (error) {
        console.error("Base64 encoding error:", error);
      }
    }
  };

  return (
    <Card 
      className="glass-card p-6 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-[1.02] cursor-pointer"
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold">Verification</h3>
      </div>

      <div className="space-y-4">
        {(algorithm.startsWith("HS")) && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="secret-input" className="text-sm">
                Secret Key
              </Label>
            <div className="flex items-center gap-2">
              <Label htmlFor="base64-toggle" className="text-xs text-muted-foreground cursor-pointer">
                Base64
              </Label>
              <Switch
                id="base64-toggle"
                checked={isBase64}
                onCheckedChange={handleBase64Toggle}
              />
            </div>
          </div>
          <div className="relative">
            <Input
              id="secret-input"
              type={showSecret ? "text" : "password"}
              value={displaySecret}
              onChange={(e) => {
                const value = e.target.value;
                if (isBase64) {
                  try {
                    const decoded = atob(value);
                    onSecretChange(decoded);
                  } catch {
                    onSecretChange(value);
                  }
                } else {
                  onSecretChange(value);
                }
              }}
              placeholder="Enter your secret key"
              className="font-mono pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowSecret(!showSecret)}
            >
              {showSecret ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
        )}

        {(algorithm.startsWith("RS") || algorithm.startsWith("ES")) && (
          <div>
            <Label htmlFor="public-key-input" className="text-sm mb-2 block">
              Public Key (PEM format)
            </Label>
            <textarea
              id="public-key-input"
              value={publicKey}
              onChange={(e) => onPublicKeyChange(e.target.value)}
              placeholder="-----BEGIN PUBLIC KEY-----&#10;...&#10;-----END PUBLIC KEY-----"
              className="w-full min-h-[100px] font-mono text-xs p-3 border rounded-md bg-background resize-none"
            />
          </div>
        )}

        <div>
          <Label htmlFor="algorithm-select" className="text-sm mb-2 block">
            Algorithm
          </Label>
          <Select value={algorithm} onValueChange={(val) => onAlgorithmChange(val as Algorithm)}>
            <SelectTrigger id="algorithm-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ALGORITHMS.map((alg) => (
                <SelectItem key={alg} value={alg}>
                  {alg}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={onVerify} className="w-full">
          Verify JWT
        </Button>

        {verificationResult && (
          <div className="space-y-2">
            <Badge
              variant={verificationResult.valid ? "default" : "destructive"}
              className="w-full justify-center py-2 text-sm"
            >
              {verificationResult.valid ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Valid Signature
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 mr-2" />
                  Invalid Signature
                </>
              )}
            </Badge>

            {isExpired && (
              <Badge variant="outline" className="w-full justify-center py-2 text-sm border-destructive text-destructive">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Token Expired
              </Badge>
            )}

            {verificationResult.error && (
              <p className="text-xs text-destructive">{verificationResult.error}</p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
