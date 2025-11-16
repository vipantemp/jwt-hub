import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { History, Trash2, Upload, X } from "lucide-react";
import { JwtHistoryItem } from "@/types/jwt";
import { formatTimestamp, getTimeRemaining } from "@/lib/jwt-utils";

interface HistorySidebarProps {
  history: JwtHistoryItem[];
  onLoad: (item: JwtHistoryItem) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function HistorySidebar({
  history,
  onLoad,
  onDelete,
  onClear,
  isOpen,
  onClose,
}: HistorySidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-background border-l border-border shadow-2xl z-50 animate-slide-in-right">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          <h3 className="font-bold">History</h3>
          <Badge variant="secondary">{history.length}</Badge>
        </div>
        <div className="flex gap-2">
          {history.length > 0 && (
            <Button variant="ghost" size="sm" onClick={onClear}>
              Clear All
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-73px)]">
        <div className="p-4 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No history yet</p>
            </div>
          ) : (
            history.map((item) => {
              const isExpired =
                item.decoded.payload.exp &&
                Math.floor(Date.now() / 1000) > item.decoded.payload.exp;

              return (
                <Card key={item.id} className="p-3 hover:border-primary/50 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                        <p className="text-xs font-mono truncate">
                          {item.token.substring(0, 30)}...
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(item.id)}
                        className="h-6 w-6 shrink-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex gap-2 text-xs">
                      <Badge variant="outline" className="text-[10px]">
                        {item.decoded.header.alg}
                      </Badge>
                      {item.decoded.payload.exp && (
                        <Badge
                          variant={isExpired ? "destructive" : "default"}
                          className="text-[10px]"
                        >
                          {getTimeRemaining(item.decoded.payload.exp)}
                        </Badge>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onLoad(item)}
                      className="w-full"
                    >
                      <Upload className="h-3 w-3 mr-2" />
                      Load
                    </Button>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
