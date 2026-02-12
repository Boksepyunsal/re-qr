"use client"

import { useState, useSyncExternalStore } from "react"
import { Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { QRCard } from "@/components/qr-card"
import { BottomNav } from "@/components/bottom-nav"
import { QRDialog } from "@/components/qr-dialog"
import {
  getQRCodes,
  getTotalScans,
  getActiveCount,
  deleteQRCode,
  subscribe,
  type QRCode,
} from "@/lib/qr-store"

interface DashboardScreenProps {
  onLogout: () => void
}

export function DashboardScreen({ onLogout }: DashboardScreenProps) {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState<"home" | "stats" | "profile">("home")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingQR, setEditingQR] = useState<QRCode | null>(null)

  // Subscribe to store changes
  const qrCodes = useSyncExternalStore(subscribe, getQRCodes, getQRCodes)
  const totalScans = useSyncExternalStore(subscribe, getTotalScans, getTotalScans)
  const activeCount = useSyncExternalStore(subscribe, getActiveCount, getActiveCount)

  const filteredCodes = qrCodes.filter(
    (qr) =>
      qr.title.toLowerCase().includes(search.toLowerCase()) ||
      qr.url.toLowerCase().includes(search.toLowerCase())
  )

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

  function formatNumber(n: number) {
    return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : n.toString()
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card px-4 pb-4 pt-6">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">My Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, Ji-min</p>
          </div>
          <button onClick={onLogout} aria-label="Profile">
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">K</AvatarFallback>
            </Avatar>
          </button>
        </div>

        {/* Search + Add */}
        <div className="mx-auto mt-4 flex max-w-lg items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search QR codes..."
              className="h-10 rounded-xl border-border bg-muted/50 pl-9 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            size="icon"
            className="h-10 w-10 shrink-0 rounded-xl bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
            onClick={handleCreate}
            aria-label="Create new QR code"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Stats */}
      <div className="mx-auto w-full max-w-lg px-4 pt-5">
        <div className="flex gap-3">
          <div className="flex-1 rounded-xl border border-border bg-card px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Total Scans
            </p>
            <p className="mt-0.5 text-2xl font-bold text-primary">
              {formatNumber(totalScans)}
            </p>
          </div>
          <div className="flex-1 rounded-xl border border-border bg-card px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Active QRs
            </p>
            <p className="mt-0.5 text-2xl font-bold text-foreground">
              {activeCount}
            </p>
          </div>
        </div>
      </div>

      {/* QR Grid */}
      <div className="mx-auto w-full max-w-lg px-4 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">My QR Codes</h2>
          <button className="text-sm font-semibold text-primary hover:text-primary/80">
            View All
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {filteredCodes.map((qr) => (
            <QRCard
              key={qr.id}
              qr={qr}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {filteredCodes.length === 0 && (
          <div className="mt-6 flex flex-col items-center gap-2 py-10 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              No QR codes found
            </p>
            <p className="text-xs text-muted-foreground">
              Try a different search or create a new one
            </p>
          </div>
        )}

        {/* Create New CTA */}
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
      </div>

      {/* Bottom Navigation */}
      <BottomNav active={activeTab} onTabChange={setActiveTab} />

      {/* QR Dialog */}
      <QRDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editingQR={editingQR}
      />
    </div>
  )
}
