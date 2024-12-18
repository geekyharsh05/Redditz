"use client";

import { useToast } from "@/hooks/use-toast";
import { Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CopyLinkProps {
  id: string;
  onCopy: () => void;
}

export default function CopyLink({ id, onCopy }: CopyLinkProps) {
  const { toast } = useToast();

  async function copyToClipboard() {
    await navigator.clipboard.writeText(`${location.origin}/post/${id}`);
    toast({
      title: "Success",
      description: "Link is copied to your clipboard!",
    });
    onCopy();
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 px-2 text-muted-foreground hover:bg-muted hover:text-primary"
      onClick={copyToClipboard}
    >
      <Copy className="h-4 w-4 mr-1" />
      Copy Link
    </Button>
  );
}