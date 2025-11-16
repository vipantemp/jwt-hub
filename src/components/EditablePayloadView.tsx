import { useState } from "react";
import { JwtPayload } from "@/types/jwt";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Trash2, Plus } from "lucide-react";
import { formatTimestamp } from "@/lib/jwt-utils";

interface EditablePayloadViewProps {
  payload: JwtPayload;
  onPayloadChange: (newPayload: JwtPayload) => void;
}

export function EditablePayloadView({
  payload,
  onPayloadChange,
}: EditablePayloadViewProps) {
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleValueChange = (key: string, value: string) => {
    const newPayload = { ...payload };
    
    // Try to parse as number for standard time claims
    if (["iat", "nbf", "exp"].includes(key) && !isNaN(Number(value))) {
      newPayload[key] = Number(value);
    } else {
      // Try to parse as JSON, otherwise keep as string
      try {
        newPayload[key] = JSON.parse(value);
      } catch {
        newPayload[key] = value;
      }
    }
    
    onPayloadChange(newPayload);
  };

  const handleDeleteKey = (key: string) => {
    const newPayload = { ...payload };
    delete newPayload[key];
    onPayloadChange(newPayload);
  };

  const handleAddKey = () => {
    if (!newKey.trim()) return;
    
    const newPayload = { ...payload };
    try {
      newPayload[newKey] = JSON.parse(newValue);
    } catch {
      newPayload[newKey] = newValue || "";
    }
    
    onPayloadChange(newPayload);
    setNewKey("");
    setNewValue("");
  };

  const renderValue = (value: any): string => {
    if (typeof value === "object") {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  const getTimestampDisplay = (key: string, value: any): string | null => {
    if (["iat", "nbf", "exp"].includes(key) && typeof value === "number") {
      return formatTimestamp(value);
    }
    return null;
  };

  return (
    <div className="space-y-3">
      {Object.entries(payload).map(([key, value]) => {
        const timestampDisplay = getTimestampDisplay(key, value);
        
        return (
          <div key={key} className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <div className="flex-1 space-y-1">
                <Label className="text-xs font-semibold text-payload-panel">
                  {key}
                  {["iat", "nbf", "exp"].includes(key) && (
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      (Unix timestamp)
                    </span>
                  )}
                </Label>
                <Input
                  value={renderValue(value)}
                  onChange={(e) => handleValueChange(key, e.target.value)}
                  className="font-mono text-sm"
                  placeholder={`Value for ${key}`}
                />
                {timestampDisplay && (
                  <p className="text-xs text-muted-foreground">
                    {timestampDisplay}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteKey(key)}
                className="mt-5 h-8 w-8"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        );
      })}

      <div className="pt-4 border-t border-border space-y-2">
        <Label className="text-sm font-semibold">Add New Claim</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Key (e.g., userId)"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            className="flex-1"
          />
          <Input
            placeholder="Value"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleAddKey}
            disabled={!newKey.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
