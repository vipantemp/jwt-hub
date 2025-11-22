import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { HelpCircle, History, Code2, Share2, Clock, Edit } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";

const HELP_DIALOG_SEEN_KEY = "help-dialog-seen";

export function HelpDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the help dialog before
    const hasSeenDialog = localStorage.getItem(HELP_DIALOG_SEEN_KEY);
    if (!hasSeenDialog) {
      setOpen(true);
    }
  }, []);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    // Mark as seen when dialog is closed
    if (!newOpen) {
      localStorage.setItem(HELP_DIALOG_SEEN_KEY, "true");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Feature Guide</DialogTitle>
          <DialogDescription>
            Learn about the main features of JWT Decoder & Verifier
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Editor Button */}
            <Card className="p-4 border-l-4 border-l-primary">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Edit className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Editor Button</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Allows users to write, edit, and preview their code or content with ease. Paste your JWT token to decode and edit it in real-time with automatic color-coded highlighting.
                  </p>
                  {/* Visual Example */}
                  <div className="bg-muted/20 border border-border/50 rounded-lg p-4 space-y-2">
                    <div className="text-xs font-mono break-all">
                      <span className="text-pink-500">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>
                      <span className="text-muted-foreground">.</span>
                      <span className="text-pink-600">eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0</span>
                      <span className="text-muted-foreground">.</span>
                      <span className="text-green-500">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Hover over sections to see color highlighting
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* History Button */}
            <Card className="p-4 border-l-4 border-l-blue-500">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <History className="h-6 w-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">History Button</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Shows previously generated versions, allowing users to revisit or restore older outputs anytime. Save up to 20 JWT tokens with custom names, stored locally and persisting between sessions.
                  </p>
                  {/* Visual Example */}
                  <div className="bg-muted/20 border border-border/50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between text-xs p-2 bg-background/50 rounded">
                      <span className="font-medium">Production Token</span>
                      <span className="text-muted-foreground">2 days ago</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2 bg-background/50 rounded">
                      <span className="font-medium">Test API Token</span>
                      <span className="text-muted-foreground">1 week ago</span>
                    </div>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside mt-3">
                    <li>Revisit previously saved tokens</li>
                    <li>Quick load and restore functionality</li>
                    <li>Maximum 20 entries with auto-cleanup</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Code Page */}
            <Card className="p-4 border-l-4 border-l-purple-500">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Code2 className="h-6 w-6 text-purple-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Code Page</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Displays the formatted code output, making it easier to review and share. Access ready-to-use code snippets for implementing JWT verification in multiple programming languages.
                  </p>
                  {/* Visual Example */}
                  <div className="bg-muted/20 border border-border/50 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                    <div className="text-purple-400">const</div>{" "}
                    <span className="text-foreground">jwt</span>{" "}
                    <span className="text-muted-foreground">=</span>{" "}
                    <span className="text-blue-400">require</span>
                    <span className="text-muted-foreground">(</span>
                    <span className="text-green-400">'jsonwebtoken'</span>
                    <span className="text-muted-foreground">);</span>
                    <br />
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-foreground">token</span>{" "}
                    <span className="text-muted-foreground">=</span>{" "}
                    <span className="text-foreground">jwt</span>
                    <span className="text-muted-foreground">.</span>
                    <span className="text-yellow-400">verify</span>
                    <span className="text-muted-foreground">(...);</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside mt-3">
                    <li>Multi-language code examples</li>
                    <li>One-click copy functionality</li>
                    <li>Formatted output for easy review</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Share Button */}
            <Card className="p-4 border-l-4 border-l-green-500">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Share2 className="h-6 w-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Share Button</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Enables users to quickly share their content or code with others through a unique link. Export tokens via QR code, JSON file, or shareable URL.
                  </p>
                  {/* Visual Example */}
                  <div className="bg-muted/20 border border-border/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-16 h-16 bg-background border-2 border-border rounded flex items-center justify-center text-xs font-bold">
                        QR
                      </div>
                      <div className="flex-1 text-xs space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-primary/20 rounded-full" />
                          <span className="text-muted-foreground">Generate QR Code</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-primary/20 rounded-full" />
                          <span className="text-muted-foreground">Export to JSON/TXT</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-primary/20 rounded-full" />
                          <span className="text-muted-foreground">Copy Shareable Link</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Expiration Time Extension */}
            <Card className="p-4 border-l-4 border-l-orange-500">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Expiration Time Extension</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Allows extending the lifetime of saved or shared content, ensuring it remains accessible for longer. Monitor expiration in real-time with live countdown timers and edit dates with an interactive calendar picker.
                  </p>
                  {/* Visual Example */}
                  <div className="bg-muted/20 border border-border/50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">Expiration (exp)</span>
                      <span className="text-xs text-orange-500 font-mono">2024-12-31 23:59:59</span>
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded px-2 py-1 text-xs text-orange-600 dark:text-orange-400 text-center">
                      ⏱️ Expires in 2 days, 5 hours, 23 minutes
                    </div>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside mt-3">
                    <li>Extend token lifetime easily</li>
                    <li>Live countdown with warnings</li>
                    <li>Interactive date picker for modifications</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
