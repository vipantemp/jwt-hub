import { useState } from "react";
import { Card } from "./ui/card";
import { JsonDisplay } from "./JsonDisplay";
import { ClaimEditor } from "./ClaimEditor";
import { EditablePayloadView } from "./EditablePayloadView";
import { JwtPayload } from "@/types/jwt";
import { Button } from "./ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

interface DecodedPayloadProps {
  payload: JwtPayload;
  onClaimChange: (claim: "iat" | "nbf" | "exp", value: number) => void;
  onApplySuggestions: () => void;
  onPayloadChange: (newPayload: JwtPayload) => void;
  onHover?: (hovered: boolean) => void;
}

export function DecodedPayload({
  payload,
  onClaimChange,
  onApplySuggestions,
  onPayloadChange,
  onHover,
}: DecodedPayloadProps) {
  const hasStandardClaims = payload.iat || payload.nbf || payload.exp;
  const [isEditorMode, setIsEditorMode] = useState(false);

  return (
    <Card 
      className="glass-card p-6 border-l-4 border-l-payload-panel transition-all cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-[1.02]"
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-payload-panel">Payload</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch
              id="editor-mode"
              checked={isEditorMode}
              onCheckedChange={setIsEditorMode}
            />
            <Label htmlFor="editor-mode" className="text-xs cursor-pointer">
              Editor Mode
            </Label>
          </div>
          <span className="text-xs bg-payload-panel-bg text-payload-panel px-2 py-1 rounded-md">
            Claims
          </span>
        </div>
      </div>

      {!isEditorMode && !hasStandardClaims && (
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

      {isEditorMode ? (
        <div className="space-y-4">
          <EditablePayloadView
            payload={payload}
            onPayloadChange={onPayloadChange}
          />
        </div>
      ) : (
        <>
          {hasStandardClaims && (
            <div className="space-y-4 mb-4">
              {(["iat", "nbf", "exp"] as const)
                .filter((claim) => payload[claim] !== undefined)
                .map((claim) => (
                  <ClaimEditor
                    key={claim}
                    claim={claim}
                    value={payload[claim]!}
                    onChange={(value) => onClaimChange(claim, value)}
                  />
                ))}
            </div>
          )}

          <div className={hasStandardClaims ? "mt-6" : ""}>
            <h4 className="text-sm font-semibold mb-3">All Claims</h4>
            <JsonDisplay data={payload} panelType="payload" />
          </div>
        </>
      )}
    </Card>
  );
}
