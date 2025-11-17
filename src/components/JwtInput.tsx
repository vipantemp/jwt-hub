import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ClipboardPaste } from "lucide-react";
import { useEffect, useRef } from "react";

interface JwtInputProps {
  value: string;
  onChange: (value: string) => void;
  highlightSection?: "header" | "payload" | "signature" | null;
}

const getHighlightStyle = (section: "header" | "payload" | "signature" | null, value: string) => {
  if (!section || !value) return {};
  
  const parts = value.split(".");
  if (parts.length !== 3) return {};

  const colors = {
    header: { light: "#ff6b6b", dark: "#ff8787" },
    payload: { light: "#4dabf7", dark: "#74c0fc" },
    signature: { light: "#51cf66", dark: "#8ce99a" }
  };

  return {
    background: `linear-gradient(to right, 
      ${section === "header" ? colors.header.light : "transparent"} 0%, 
      ${section === "header" ? colors.header.light : "transparent"} ${(parts[0].length / value.length) * 100}%,
      ${section === "payload" ? colors.payload.light : "transparent"} ${(parts[0].length / value.length) * 100}%,
      ${section === "payload" ? colors.payload.light : "transparent"} ${((parts[0].length + parts[1].length + 1) / value.length) * 100}%,
      ${section === "signature" ? colors.signature.light : "transparent"} ${((parts[0].length + parts[1].length + 1) / value.length) * 100}%,
      ${section === "signature" ? colors.signature.light : "transparent"} 100%
    )`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: section ? "transparent" : "inherit",
    backgroundClip: "text",
  };
};

export function JwtInput({ value, onChange, highlightSection }: JwtInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textareaRef.current || !value || !highlightSection) return;

    const parts = value.split(".");
    if (parts.length !== 3) return;

    let start = 0;
    let end = 0;

    if (highlightSection === "header") {
      start = 0;
      end = parts[0].length;
    } else if (highlightSection === "payload") {
      start = parts[0].length + 1;
      end = start + parts[1].length;
    } else if (highlightSection === "signature") {
      start = parts[0].length + parts[1].length + 2;
      end = value.length;
    }

    textareaRef.current.setSelectionRange(start, end);
  }, [highlightSection, value]);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="jwt-input" className="text-base font-semibold">
          JWT Token
        </Label>
        <ClipboardPaste className="h-4 w-4 text-muted-foreground" />
      </div>
      <Textarea
        ref={textareaRef}
        id="jwt-input"
        placeholder="Paste your JWT token here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[120px] font-mono text-lg resize-none transition-all"
        style={getHighlightStyle(highlightSection, value)}
      />
    </div>
  );
}
