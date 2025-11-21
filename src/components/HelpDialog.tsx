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

export function HelpDialog() {
  return (
    <Dialog>
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
            {/* Editor Feature */}
            <Card className="p-4 border-l-4 border-l-primary">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Edit className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">JWT Editor</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Paste your JWT token to decode and edit it in real-time. The editor supports Bearer tokens and automatically highlights different sections (Header, Payload, Signature) with color coding.
                  </p>
                  <div className="bg-muted/50 rounded-md p-3 text-xs font-mono">
                    <span className="text-pink-500">header</span>
                    <span className="text-muted-foreground">.</span>
                    <span className="text-pink-600">payload</span>
                    <span className="text-muted-foreground">.</span>
                    <span className="text-green-500">signature</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* History Feature */}
            <Card className="p-4 border-l-4 border-l-blue-500">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <History className="h-6 w-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">History Management</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Save and manage up to 20 JWT tokens with custom names. Your history is stored locally and persists between sessions. Click the History button to view, load, or delete saved tokens.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Save tokens with custom names</li>
                    <li>Quick load from sidebar</li>
                    <li>Maximum 20 entries (oldest removed first)</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Code Examples Feature */}
            <Card className="p-4 border-l-4 border-l-purple-500">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Code2 className="h-6 w-6 text-purple-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Code Examples</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Access ready-to-use code snippets for implementing JWT verification and encoding in multiple programming languages including JavaScript, TypeScript, Python, Java, and more.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Multi-language support</li>
                    <li>Copy code with one click</li>
                    <li>Working examples for each language</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Share Feature */}
            <Card className="p-4 border-l-4 border-l-green-500">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Share2 className="h-6 w-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Share & Export</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Share your JWT tokens easily through multiple methods:
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Generate QR codes for mobile scanning</li>
                    <li>Export to JSON or text files</li>
                    <li>Copy shareable links</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Expiration Time Feature */}
            <Card className="p-4 border-l-4 border-l-orange-500">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Expiration Tracking</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Monitor your token expiration in real-time with live countdown timers. Edit expiration dates with an interactive date picker, and see warnings when tokens are expired or about to expire.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Live countdown timer</li>
                    <li>Visual expiration warnings</li>
                    <li>Easy date modification with calendar picker</li>
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
