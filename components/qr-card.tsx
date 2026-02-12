"use client"

import { Pencil, Trash2, Link as LinkIcon, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { QRCode } from "@/lib/qr-store"
import QRCodeSVG from "react-qr-code"

interface QRCardProps {
  qr: QRCode
  onEdit: (qr: QRCode) => void
  onDelete: (id: string) => void
}

export function QRCard({ qr, onEdit, onDelete }: QRCardProps) {
  const displayUrl =
    qr.url.length > 22 ? qr.url.slice(0, 22) + "..." : qr.url

  const handleDownload = () => {
    const svg = document.getElementById(`qr-code-${qr.id}`)
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")
      
      const downloadLink = document.createElement("a")
      downloadLink.download = `${qr.title || "qrcode"}.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {/* QR Preview */}
      <div className="flex items-center justify-center bg-muted/50 px-4 py-5">
        <div className="rounded-lg bg-card p-2 shadow-sm">
          <QRCodeSVG
            id={`qr-code-${qr.id}`}
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
          className="h-10 flex-1 rounded-none text-muted-foreground hover:text-primary"
          onClick={handleDownload}
          aria-label={`Download ${qr.title}`}
        >
          <Download className="h-4 w-4" />
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
