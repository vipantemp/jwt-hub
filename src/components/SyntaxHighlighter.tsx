import { useMemo } from "react";

interface SyntaxHighlighterProps {
  code: string;
  language: string;
}

export function SyntaxHighlighter({ code, language }: SyntaxHighlighterProps) {
  const highlightedCode = useMemo(() => {
    const lines = code.split('\n');
    
    return lines.map((line, lineIndex) => {
      let highlightedLine: React.ReactNode[] = [];
      let currentIndex = 0;

      // Language-specific patterns
      const patterns = {
        javascript: [
          { regex: /(\/\/.*$)/g, className: "text-green-600 dark:text-green-400" }, // Comments
          { regex: /('([^'\\]|\\.)*'|"([^"\\]|\\.)*"|`([^`\\]|\\.)*`)/g, className: "text-amber-600 dark:text-amber-400" }, // Strings
          { regex: /\b(import|export|from|const|let|var|function|async|await|try|catch|throw|if|else|return|new|class|extends|interface|type|enum)\b/g, className: "text-purple-600 dark:text-purple-400" }, // Keywords
          { regex: /\b(console|jwt|decoded|error|token|secret)\b/g, className: "text-blue-600 dark:text-blue-400" }, // Variables
          { regex: /\b([A-Z][a-zA-Z0-9]*)\b/g, className: "text-cyan-600 dark:text-cyan-400" }, // Classes
          { regex: /\.([a-zA-Z_][a-zA-Z0-9_]*)\(/g, className: "text-yellow-600 dark:text-yellow-400" }, // Methods
        ],
        typescript: [
          { regex: /(\/\/.*$)/g, className: "text-green-600 dark:text-green-400" },
          { regex: /('([^'\\]|\\.)*'|"([^"\\]|\\.)*"|`([^`\\]|\\.)*`)/g, className: "text-amber-600 dark:text-amber-400" },
          { regex: /\b(import|export|from|const|let|var|function|async|await|try|catch|throw|if|else|return|new|class|extends|interface|type|enum|as)\b/g, className: "text-purple-600 dark:text-purple-400" },
          { regex: /\b(string|number|boolean|void|any|unknown)\b/g, className: "text-teal-600 dark:text-teal-400" }, // Types
          { regex: /\b([A-Z][a-zA-Z0-9]*)\b/g, className: "text-cyan-600 dark:text-cyan-400" },
          { regex: /\.([a-zA-Z_][a-zA-Z0-9_]*)\(/g, className: "text-yellow-600 dark:text-yellow-400" },
        ],
        java: [
          { regex: /(\/\/.*$|\/\*[\s\S]*?\*\/)/g, className: "text-green-600 dark:text-green-400" },
          { regex: /("([^"\\]|\\.)*")/g, className: "text-amber-600 dark:text-amber-400" },
          { regex: /\b(public|private|protected|static|final|class|void|import|try|catch|new|return)\b/g, className: "text-purple-600 dark:text-purple-400" },
          { regex: /\b(String|Key|Exception|System|SignatureAlgorithm)\b/g, className: "text-cyan-600 dark:text-cyan-400" },
          { regex: /\.([a-zA-Z_][a-zA-Z0-9_]*)\(/g, className: "text-yellow-600 dark:text-yellow-400" },
        ],
        python: [
          { regex: /(#.*$)/g, className: "text-green-600 dark:text-green-400" },
          { regex: /('([^'\\]|\\.)*'|"([^"\\]|\\.)*")/g, className: "text-amber-600 dark:text-amber-400" },
          { regex: /\b(import|from|try|except|as|def|class|return|if|else|for|in|print)\b/g, className: "text-purple-600 dark:text-purple-400" },
          { regex: /\b(jwt|decoded|secret|token|datetime|str|dict|ExpiredSignatureError|InvalidTokenError)\b/g, className: "text-blue-600 dark:text-blue-400" },
          { regex: /\.([a-zA-Z_][a-zA-Z0-9_]*)\(/g, className: "text-yellow-600 dark:text-yellow-400" },
        ],
        csharp: [
          { regex: /(\/\/.*$|\/\*[\s\S]*?\*\/)/g, className: "text-green-600 dark:text-green-400" },
          { regex: /("([^"\\]|\\.)*")/g, className: "text-amber-600 dark:text-amber-400" },
          { regex: /\b(using|public|static|void|class|var|try|catch|new|return)\b/g, className: "text-purple-600 dark:text-purple-400" },
          { regex: /\b(String|Console|JwtSecurityTokenHandler|TokenValidationParameters|SymmetricSecurityKey|SecurityToken|Exception)\b/g, className: "text-cyan-600 dark:text-cyan-400" },
          { regex: /\.([a-zA-Z_][a-zA-Z0-9_]*)\(/g, className: "text-yellow-600 dark:text-yellow-400" },
        ],
        go: [
          { regex: /(\/\/.*$|\/\*[\s\S]*?\*\/)/g, className: "text-green-600 dark:text-green-400" },
          { regex: /("([^"\\]|\\.)*")/g, className: "text-amber-600 dark:text-amber-400" },
          { regex: /\b(package|import|func|var|if|return|nil)\b/g, className: "text-purple-600 dark:text-purple-400" },
          { regex: /\b(main|jwt|token|error|string|byte|interface)\b/g, className: "text-blue-600 dark:text-blue-400" },
          { regex: /\.([a-zA-Z_][a-zA-Z0-9_]*)\(/g, className: "text-yellow-600 dark:text-yellow-400" },
        ],
      };

      const languagePatterns = patterns[language as keyof typeof patterns] || patterns.javascript;

      // Create a map of indices to styles
      const styleMap: { [key: number]: { end: number; className: string } } = {};

      languagePatterns.forEach(({ regex, className }) => {
        const matches = [...line.matchAll(regex)];
        matches.forEach((match) => {
          if (match.index !== undefined) {
            const start = match.index;
            const end = start + match[0].length;
            
            // Only add if not overlapping with existing styled sections
            let canAdd = true;
            for (let i = start; i < end; i++) {
              if (styleMap[i]) {
                canAdd = false;
                break;
              }
            }
            
            if (canAdd) {
              for (let i = start; i < end; i++) {
                styleMap[i] = { end, className };
              }
            }
          }
        });
      });

      // Build the highlighted line
      let i = 0;
      while (i < line.length) {
        if (styleMap[i]) {
          const { end, className } = styleMap[i];
          const text = line.substring(i, end);
          highlightedLine.push(
            <span key={`${lineIndex}-${i}`} className={className}>
              {text}
            </span>
          );
          i = end;
        } else {
          const nextStyled = Object.keys(styleMap)
            .map(Number)
            .find((pos) => pos > i);
          const end = nextStyled || line.length;
          const text = line.substring(i, end);
          highlightedLine.push(
            <span key={`${lineIndex}-${i}`} className="text-foreground">
              {text}
            </span>
          );
          i = end;
        }
      }

      return (
        <div key={lineIndex}>
          {highlightedLine}
          {'\n'}
        </div>
      );
    });
  }, [code, language]);

  return <div className="font-mono text-sm">{highlightedCode}</div>;
}
