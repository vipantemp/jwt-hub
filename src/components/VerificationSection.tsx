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
  onSecretChange: (secret: string) => void;
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
  onSecretChange,
  onAlgorithmChange,
  onVerify,
  verificationResult,
  isExpired,
  onHover,
}: VerificationSectionProps) {
  const [showSecret, setShowSecret] = useState(false);
  const [isBase64, setIsBase64] = useState(false);

  const handleSecretChange = (value: string) => {
    if (isBase64) {
      // Convert from base64 to string
      try {
        const decoded = atob(value);
        onSecretChange(decoded);
      } catch {
        onSecretChange(value);
      }
    } else {
      onSecretChange(value);
    }
  };

  const displaySecret = isBase64 && secret ? btoa(secret) : secret;

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
                onCheckedChange={setIsBase64}
              />
            </div>
          </div>
          <div className="relative">
            <Input
              id="secret-input"
              type={showSecret ? "text" : "password"}
              value={displaySecret}
              onChange={(e) => handleSecretChange(e.target.value)}
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
