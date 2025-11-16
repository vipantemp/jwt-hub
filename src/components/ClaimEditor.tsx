import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Clock, Lock, Calendar, Plus } from "lucide-react";
import { formatTimestamp, getTimeRemaining } from "@/lib/jwt-utils";

interface ClaimEditorProps {
  claim: "iat" | "nbf" | "exp";
  value?: number;
  onChange: (value: number) => void;
}

export function ClaimEditor({ claim, value, onChange }: ClaimEditorProps) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (claim === "exp" && value) {
      const interval = setInterval(() => {
        setCountdown(getTimeRemaining(value));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [claim, value]);

  const icons = {
    iat: Clock,
    nbf: Lock,
    exp: Calendar,
  };

  const labels = {
    iat: "Issued At",
    nbf: "Not Before",
    exp: "Expiration",
  };

  const Icon = icons[claim];

  const handleQuickAdd = (seconds: number) => {
    const now = Math.floor(Date.now() / 1000);
    onChange(now + seconds);
  };

  return (
    <div className="space-y-3 p-4 rounded-lg bg-muted/20 border border-border">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <Label className="font-semibold">{labels[claim]}</Label>
      </div>

      <div className="space-y-2">
        <Input
          type="number"
          value={value || ""}
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder="Unix timestamp"
          className="font-mono"
        />
        {value && (
          <p className="text-xs text-muted-foreground">
            {formatTimestamp(value)}
          </p>
        )}
      </div>

      {claim === "exp" && value && (
        <div className="flex items-center justify-between p-2 bg-background rounded-md">
          <span className="text-sm font-medium">Status:</span>
          <span
            className={`text-sm font-bold ${
              Math.floor(Date.now() / 1000) > value
                ? "text-destructive"
                : "text-success"
            }`}
          >
            {countdown}
          </span>
        </div>
      )}

      {claim === "exp" && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdd(900)}
          >
            <Plus className="h-3 w-3 mr-1" />
            15m
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdd(1800)}
          >
            <Plus className="h-3 w-3 mr-1" />
            30m
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdd(3600)}
          >
            <Plus className="h-3 w-3 mr-1" />
            1h
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdd(86400)}
          >
            <Plus className="h-3 w-3 mr-1" />
            1d
          </Button>
        </div>
      )}
    </div>
  );
}
