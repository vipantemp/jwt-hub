import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ClipboardPaste } from "lucide-react";

interface JwtInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function JwtInput({ value, onChange }: JwtInputProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="jwt-input" className="text-base font-semibold">
          JWT Token
        </Label>
        <ClipboardPaste className="h-4 w-4 text-muted-foreground" />
      </div>
      <Textarea
        id="jwt-input"
        placeholder="Paste your JWT token here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[120px] font-mono text-sm resize-none"
      />
    </div>
  );
}
