import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Share2, QrCode, Download, Link as LinkIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ShareDropdownProps {
  token: string;
  disabled?: boolean;
}

export const ShareDropdown = ({ token, disabled }: ShareDropdownProps) => {
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleQrCode = () => {
    if (!token.trim()) {
      toast({
        title: "No Token",
        description: "Please enter a JWT token first",
        variant: "destructive",
      });
      return;
    }
    setQrDialogOpen(true);
  };

  const handleExport = () => {
    if (!token.trim()) {
      toast({
        title: "No Token",
        description: "Please enter a JWT token first",
        variant: "destructive",
      });
      return;
    }

    try {
      // Export as JSON
      const [header, payload] = token.split(".");
      const decodedHeader = JSON.parse(atob(header));
      const decodedPayload = JSON.parse(atob(payload));
      
      const jsonData = {
        token,
        header: decodedHeader,
        payload: decodedPayload,
      };

      const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], {
        type: "application/json",
      });
      const jsonUrl = URL.createObjectURL(jsonBlob);
      const jsonLink = document.createElement("a");
      jsonLink.href = jsonUrl;
      jsonLink.download = "jwt-token.json";
      jsonLink.click();
      URL.revokeObjectURL(jsonUrl);

      // Export token as text
      const textBlob = new Blob([token], { type: "text/plain" });
      const textUrl = URL.createObjectURL(textBlob);
      const textLink = document.createElement("a");
      textLink.href = textUrl;
      textLink.download = "jwt-token.txt";
      textLink.click();
      URL.revokeObjectURL(textUrl);

      toast({
        title: "Exported Successfully",
        description: "JWT exported as JSON and text files",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Could not export JWT",
        variant: "destructive",
      });
    }
  };

  const handleCopyLink = () => {
    if (!token.trim()) {
      toast({
        title: "No Token",
        description: "Please enter a JWT token first",
        variant: "destructive",
      });
      return;
    }

    const url = `${window.location.origin}?token=${encodeURIComponent(token)}`;
    navigator.clipboard.writeText(url);
    
    toast({
      title: "Link Copied",
      description: "Shareable link copied to clipboard",
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" disabled={disabled}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-background">
          <DropdownMenuItem onClick={handleQrCode}>
            <QrCode className="h-4 w-4 mr-2" />
            QR Code
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Files
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyLink}>
            <LinkIcon className="h-4 w-4 mr-2" />
            Copy Link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share JWT via QR Code</DialogTitle>
            <DialogDescription>
              Scan this QR code to share the JWT token
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center p-6">
            <div className="bg-white p-4 rounded-lg">
              <QRCodeSVG value={token} size={256} level="H" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
