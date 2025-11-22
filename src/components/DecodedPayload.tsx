import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { JsonDisplay } from "./JsonDisplay";
import { EditablePayloadView } from "./EditablePayloadView";
import { JwtPayload } from "@/types/jwt";
import { Button } from "./ui/button";
import { AlertCircle, Clock, Lock, Calendar, Plus } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { formatTimestamp, getTimeRemaining } from "@/lib/jwt-utils";

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
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!isEditorMode && payload.exp) {
      const interval = setInterval(() => {
        setCountdown(getTimeRemaining(payload.exp!));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isEditorMode, payload.exp]);

  const handleQuickAdd = (seconds: number) => {
    const now = Math.floor(Date.now() / 1000);
    onClaimChange("exp", now + seconds);
  };

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
          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3 text-foreground">All Claims</h4>
            <JsonDisplay data={payload} panelType="payload" />
          </div>

          {hasStandardClaims && (
            <div className="space-y-3 border-t border-border pt-6">
              <h4 className="text-sm font-semibold mb-4 text-foreground">Standard Claims</h4>
              
              {payload.iat && (
                <div className="p-4 rounded-lg border-l-4 border-l-[hsl(187,85%,53%)] bg-card/50 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[hsl(187,85%,53%)] mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[hsl(187,85%,53%)] mb-1">Issued At</div>
                      <div className="text-sm text-muted-foreground font-mono break-all">
                        {payload.iat}
                      </div>
                      <div className="text-xs text-foreground mt-1">
                        {formatTimestamp(payload.iat)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {payload.nbf && (
                <div className="p-4 rounded-lg border-l-4 border-l-[hsl(280,80%,60%)] bg-card/50 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-[hsl(280,80%,60%)] mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[hsl(280,80%,60%)] mb-1">Not Before</div>
                      <div className="text-sm text-muted-foreground font-mono break-all">
                        {payload.nbf}
                      </div>
                      <div className="text-xs text-foreground mt-1">
                        {formatTimestamp(payload.nbf)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {payload.exp && (
                <div className="p-4 rounded-lg border-l-4 border-l-[hsl(142,71%,50%)] bg-card/50 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-[hsl(142,71%,50%)] mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[hsl(142,71%,50%)] mb-1">Expiration</div>
                      <div className="text-sm text-muted-foreground font-mono break-all">
                        {payload.exp}
                      </div>
                      <div className="text-xs text-foreground mt-1">
                        {formatTimestamp(payload.exp)}
                      </div>
                      <div className="flex items-center justify-between mt-3 p-2 bg-background/50 rounded-md">
                        <span className="text-xs font-medium">Status:</span>
                        <span
                          className={`text-xs font-bold ${
                            Math.floor(Date.now() / 1000) > payload.exp
                              ? "text-destructive"
                              : "text-success"
                          }`}
                        >
                          {countdown}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAdd(900)}
                          className="text-xs h-8"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          +15min
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAdd(1800)}
                          className="text-xs h-8"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          +30min
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAdd(3600)}
                          className="text-xs h-8"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          +1h
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAdd(86400)}
                          className="text-xs h-8"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          +1d
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </Card>
  );
}
