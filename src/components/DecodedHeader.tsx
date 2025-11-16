import { Card } from "./ui/card";
import { JsonDisplay } from "./JsonDisplay";
import { JwtHeader, Algorithm } from "@/types/jwt";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface DecodedHeaderProps {
  header: JwtHeader;
  onAlgorithmChange: (alg: Algorithm) => void;
  onHover?: (hovered: boolean) => void;
}

const ALGORITHMS: Algorithm[] = [
  "HS256", "HS384", "HS512",
  "RS256", "RS384", "RS512",
  "ES256", "ES384", "ES512",
  "none"
];

export function DecodedHeader({ header, onAlgorithmChange, onHover }: DecodedHeaderProps) {
  return (
    <Card 
      className="glass-card p-6 border-l-4 border-l-header-panel transition-all cursor-pointer"
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-header-panel">Header</h3>
        <span className="text-xs bg-header-panel-bg text-header-panel px-2 py-1 rounded-md">
          Algorithm: {header.alg}
        </span>
      </div>
      
      <div className="mb-4">
        <Label htmlFor="algorithm-select" className="text-sm mb-2 block">
          Change Algorithm
        </Label>
        <Select value={header.alg} onValueChange={(val) => onAlgorithmChange(val as Algorithm)}>
          <SelectTrigger id="algorithm-select" className="w-full">
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

      <JsonDisplay data={header} panelType="header" />
    </Card>
  );
}
