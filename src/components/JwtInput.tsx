import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ClipboardPaste } from "lucide-react";
import { useEffect, useRef } from "react";

interface JwtInputProps {
  value: string;
  onChange: (value: string) => void;
  highlightSection?: "header" | "payload" | "signature" | null;
}

const getHighlightClass = (section: "header" | "payload" | "signature" | null) => {
  if (!section) return "";
  const colors = {
    header: "bg-red-100 dark:bg-red-950/30",
    payload: "bg-pink-100 dark:bg-pink-950/30",
    signature: "bg-green-100 dark:bg-green-950/30"
  };
  return colors[section];
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
        placeholder="Paste your JWT token here (Bearer token supported, e.g., Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`min-h-[140px] font-mono text-lg md:text-xl leading-relaxed resize-none transition-colors ${getHighlightClass(highlightSection)}`}
      />
    </div>
  );
}
