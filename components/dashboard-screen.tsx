"use client"

import { useState, useSyncExternalStore, useEffect } from "react"
import { Plus, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QRCard } from "@/components/qr-card"
import { QRDialog } from "@/components/qr-dialog"
import {
  getQRCodes,
  deleteQRCode,
  subscribe,
  loadQRCodes,
  type QRCode,
} from "@/lib/qr-store"
import { supabase } from "@/lib/supabase"

interface DashboardScreenProps {
  onLogout: () => void
}

export function DashboardScreen({ onLogout }: DashboardScreenProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingQR, setEditingQR] = useState<QRCode | null>(null)
  const [userEmail, setUserEmail] = useState<string>("")

  // Subscribe to store changes
  const qrCodes = useSyncExternalStore(subscribe, getQRCodes, getQRCodes)

  useEffect(() => {
    loadQRCodes()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email || "User")
      }
    })
  }, [])

  function handleEdit(qr: QRCode) {
    setEditingQR(qr)
    setDialogOpen(true)
  }

  function handleDelete(id: string) {
    deleteQRCode(id)
  }

  function handleCreate() {
    setEditingQR(null)
    setDialogOpen(true)
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card px-4 py-4">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">My Dashboard</h1>
            <p className="text-sm text-muted-foreground">{userEmail}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onLogout} aria-label="Logout">
            <LogOut className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </header>

      {/* QR Grid */}
      <div className="mx-auto w-full max-w-lg px-4 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">My QR Codes</h2>
          <Button
            size="sm"
            className="h-8 gap-1 rounded-lg text-xs"
            onClick={handleCreate}
          >
            <Plus className="h-3.5 w-3.5" />
            New QR
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {qrCodes.map((qr) => (
            <QRCard
              key={qr.id}
              qr={qr}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {qrCodes.length === 0 && (
          <div className="mt-6 flex flex-col items-center gap-2 py-10 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              No QR codes found
            </p>
            <p className="text-xs text-muted-foreground">
              Create a new one to get started
            </p>
          </div>
        )}

        {/* Create New CTA */}
        {qrCodes.length === 0 && (
        <button
          onClick={handleCreate}
          className="mt-4 flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border py-8 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Plus className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">Create New QR Code</p>
            <p className="text-xs text-muted-foreground">Start a new campaign</p>
          </div>
        </button>
        )}
      </div>

      {/* QR Dialog */}
      <QRDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editingQR={editingQR}
      />
    </div>
  )
}