import { useState } from "react";
import { ChevronDown, ChevronRight, Copy, Check } from "lucide-react";
import { Button } from "./ui/button";

interface JsonDisplayProps {
  data: any;
  panelType: "header" | "payload" | "signature";
  onEdit?: (path: string[], value: any) => void;
}

export function JsonDisplay({ data, panelType, onEdit }: JsonDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderValue = (value: any, path: string[] = []): JSX.Element => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return (
        <div className="ml-4">
          {Object.entries(value).map(([key, val]) => (
            <div key={key} className="my-1">
              <button
                onClick={() => toggleExpand(path.concat(key).join("."))}
                className="inline-flex items-center gap-1 hover:text-primary"
              >
                {typeof val === "object" && val !== null ? (
                  expanded[path.concat(key).join(".")] ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )
                ) : null}
                <span className="font-semibold text-foreground">{key}:</span>
              </button>
              {expanded[path.concat(key).join(".")] !== false &&
                renderValue(val, path.concat(key))}
            </div>
          ))}
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <span className="text-muted-foreground ml-1">
          [{value.map((v) => JSON.stringify(v)).join(", ")}]
        </span>
      );
    }

    return (
      <span className="text-muted-foreground ml-1">
        {typeof value === "string" ? `"${value}"` : String(value)}
      </span>
    );
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10"
      >
        {copied ? (
          <Check className="h-4 w-4 text-success" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
      <pre className="p-4 pt-10 rounded-lg bg-muted/30 overflow-x-auto text-sm font-mono">
        {renderValue(data)}
      </pre>
    </div>
  );
}
