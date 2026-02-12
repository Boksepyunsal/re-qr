"use client"

import { useState, useEffect } from "react"
import { Pencil, Link as LinkIcon, Save } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { addQRCode, updateQRCode, type QRCode } from "@/lib/qr-store"
import QRCodeSVG from "react-qr-code"

interface QRDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingQR: QRCode | null
}

export function QRDialog({ open, onOpenChange, editingQR }: QRDialogProps) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [baseUrl, setBaseUrl] = useState("https://reqr.app")

  const isEditing = !!editingQR

  useEffect(() => {
    setBaseUrl(window.location.origin)
  }, [])

  useEffect(() => {
    if (editingQR) {
      setTitle(editingQR.title)
      setUrl(editingQR.url)
    } else {
      setTitle("")
      setUrl("")
    }
  }, [editingQR, open])

  function handleSave() {
    if (!title.trim() || !url.trim()) return

    if (isEditing && editingQR) {
      updateQRCode(editingQR.id, title.trim(), url.trim())
    } else {
      addQRCode(title.trim(), url.trim())
    }
    onOpenChange(false)
  }

  const previewValue = isEditing && editingQR 
    ? `${baseUrl}/r/${editingQR.id}` 
    : (url.trim() || "https://reqr.app")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="mx-auto max-w-sm gap-0 overflow-hidden rounded-2xl border-border p-0">
        <DialogHeader className="border-b border-border px-5 py-4">
          <DialogTitle className="text-center text-base font-bold text-foreground">
            {isEditing ? "Edit QR Code" : "Create QR Code"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {isEditing ? "Edit the title and destination URL for your QR code." : "Create a new QR code by entering a title and destination URL."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 px-5 py-5">
          {/* QR Preview */}
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-xl border border-border bg-muted/30 p-5 shadow-sm">
              <QRCodeSVG
                value={previewValue}
                size={160}
                bgColor="transparent"
                fgColor="hsl(222, 47%, 11%)"
              />
            </div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
              {isEditing ? "Dynamic QR (Redirects to URL)" : "Preview updates automatically"}
            </p>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="qr-title"
                className="text-sm font-medium text-foreground"
              >
                Internal Title
              </Label>
              <div className="relative">
                <Input
                  id="qr-title"
                  placeholder="e.g. Summer Marketing Campaign"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-11 rounded-xl border-border bg-muted/30 pr-10 text-sm"
                />
                <Pencil className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="qr-url"
                className="text-sm font-medium text-foreground"
              >
                Destination URL
              </Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="qr-url"
                  placeholder="https://example.com/promo/2023"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="h-11 rounded-xl border-border bg-muted/30 pl-9 text-sm"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Redirects can be changed later.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-1">
            <Button
              onClick={handleSave}
              disabled={!title.trim() || !url.trim()}
              className="h-12 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="h-10 w-full rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
