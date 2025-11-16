import { Card } from "./ui/card";
import { JsonDisplay } from "./JsonDisplay";
import { ClaimEditor } from "./ClaimEditor";
import { JwtPayload } from "@/types/jwt";
import { Button } from "./ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface DecodedPayloadProps {
  payload: JwtPayload;
  onClaimChange: (claim: "iat" | "nbf" | "exp", value: number) => void;
  onApplySuggestions: () => void;
}

export function DecodedPayload({
  payload,
  onClaimChange,
  onApplySuggestions,
}: DecodedPayloadProps) {
  const hasStandardClaims = payload.iat || payload.nbf || payload.exp;

  return (
    <Card className="glass-card p-6 border-l-4 border-l-payload-panel">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-payload-panel">Payload</h3>
        <span className="text-xs bg-payload-panel-bg text-payload-panel px-2 py-1 rounded-md">
          Claims
        </span>
      </div>

      {!hasStandardClaims && (
        <Alert className="mb-4 border-warning/50 bg-warning/10">
          <AlertCircle className="h-4 w-4 text-warning" />
          <AlertDescription className="text-sm">
            For stronger verification, add standard claims (iat, nbf, exp).
            <Button
              variant="link"
              size="sm"
              onClick={onApplySuggestions}
              className="ml-2 h-auto p-0 text-warning hover:text-warning/80"
            >
              Apply Suggestions
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4 mb-4">
        {(["iat", "nbf", "exp"] as const).map((claim) => (
          <ClaimEditor
            key={claim}
            claim={claim}
            value={payload[claim]}
            onChange={(value) => onClaimChange(claim, value)}
          />
        ))}
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold mb-3">All Claims</h4>
        <JsonDisplay data={payload} panelType="payload" />
      </div>
    </Card>
  );
}
