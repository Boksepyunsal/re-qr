"use client"

import { Pencil, Trash2, Link as LinkIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { QRCode } from "@/lib/qr-store"
import QRCodeSVG from "react-qr-code"

interface QRCardProps {
  qr: QRCode
  onEdit: (qr: QRCode) => void
  onDelete: (id: string) => void
}

const statusColorMap: Record<QRCode["status"], { bg: string; text: string; dot: string }> = {
  active: {
    bg: "bg-success/10",
    text: "text-success",
    dot: "bg-success",
  },
  paused: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    dot: "bg-muted-foreground",
  },
}

export function QRCard({ qr, onEdit, onDelete }: QRCardProps) {
  const colors = statusColorMap[qr.status]
  const displayUrl =
    qr.url.length > 22 ? qr.url.slice(0, 22) + "..." : qr.url

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {/* QR Preview */}
      <div className="flex items-center justify-center bg-muted/50 px-4 py-5">
        <div className="rounded-lg bg-card p-2 shadow-sm">
          <QRCodeSVG
            value={qr.url || "https://reqr.app"}
            size={80}
            bgColor="hsl(0, 0%, 100%)"
            fgColor="hsl(222, 47%, 11%)"
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 px-3.5 py-3">
        <h3 className="truncate text-sm font-semibold text-foreground">
          {qr.title}
        </h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <LinkIcon className="h-3 w-3 shrink-0" />
          <span className="truncate">{displayUrl}</span>
        </div>
        <Badge
          variant="secondary"
          className={`w-fit border-0 text-[10px] font-semibold uppercase ${colors.bg} ${colors.text}`}
        >
          <span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${colors.dot}`} />
          {qr.status}
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex items-center border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="h-10 flex-1 rounded-none text-muted-foreground hover:text-primary"
          onClick={() => onEdit(qr)}
          aria-label={`Edit ${qr.title}`}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <div className="h-5 w-px bg-border" />
        <Button
          variant="ghost"
          size="sm"
          className="h-10 flex-1 rounded-none text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(qr.id)}
          aria-label={`Delete ${qr.title}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
