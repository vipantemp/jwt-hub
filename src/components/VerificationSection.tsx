import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Shield, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { Algorithm } from "@/types/jwt";

interface VerificationSectionProps {
  secret: string;
  algorithm: Algorithm;
  onSecretChange: (secret: string) => void;
  onAlgorithmChange: (alg: Algorithm) => void;
  onVerify: () => void;
  verificationResult?: { valid: boolean; error?: string };
  isExpired?: boolean;
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
}: VerificationSectionProps) {
  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold">Verification</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="secret-input" className="text-sm mb-2 block">
            Secret Key
          </Label>
          <Input
            id="secret-input"
            type="password"
            value={secret}
            onChange={(e) => onSecretChange(e.target.value)}
            placeholder="Enter your secret key"
            className="font-mono"
          />
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
