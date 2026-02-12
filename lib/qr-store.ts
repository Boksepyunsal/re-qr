export interface QRCode {
  id: string
  title: string
  url: string
  status: "active" | "paused"
  scans: number
  createdAt: string
}

// Client-side mock store for demo purposes
const INITIAL_QR_CODES: QRCode[] = [
  {
    id: "1",
    title: "Summer Promo",
    url: "https://myshop.com/summer-2023",
    status: "active",
    scans: 3420,
    createdAt: "2025-06-15",
  },
  {
    id: "2",
    title: "Fall Menu PDF",
    url: "https://cafe.io/menu-2023",
    status: "active",
    scans: 2810,
    createdAt: "2025-09-01",
  },
  {
    id: "3",
    title: "Guest WiFi",
    url: "WPA2:GuestAccess",
    status: "paused",
    scans: 4105,
    createdAt: "2025-03-20",
  },
  {
    id: "4",
    title: "Feedback Form",
    url: "https://forms.gle/xyz123",
    status: "active",
    scans: 2115,
    createdAt: "2025-11-10",
  },
]

let qrCodes = [...INITIAL_QR_CODES]
let listeners: Array<() => void> = []

// Cached snapshots - only updated when data changes
let cachedQRCodes: QRCode[] = qrCodes
let cachedTotalScans: number = qrCodes.reduce((sum, qr) => sum + qr.scans, 0)
let cachedActiveCount: number = qrCodes.filter((qr) => qr.status === "active").length

function updateSnapshots() {
  cachedQRCodes = qrCodes
  cachedTotalScans = qrCodes.reduce((sum, qr) => sum + qr.scans, 0)
  cachedActiveCount = qrCodes.filter((qr) => qr.status === "active").length
}

function notifyListeners() {
  updateSnapshots()
  listeners.forEach((l) => l())
}

export function getQRCodes() {
  return cachedQRCodes
}

export function getTotalScans() {
  return cachedTotalScans
}

export function getActiveCount() {
  return cachedActiveCount
}

export function addQRCode(title: string, url: string): QRCode {
  const newQR: QRCode = {
    id: Date.now().toString(),
    title,
    url,
    status: "active",
    scans: 0,
    createdAt: new Date().toISOString().split("T")[0],
  }
  qrCodes = [newQR, ...qrCodes]
  notifyListeners()
  return newQR
}

export function updateQRCode(id: string, title: string, url: string) {
  qrCodes = qrCodes.map((qr) =>
    qr.id === id ? { ...qr, title, url } : qr
  )
  notifyListeners()
}

export function deleteQRCode(id: string) {
  qrCodes = qrCodes.filter((qr) => qr.id !== id)
  notifyListeners()
}

export function subscribe(listener: () => void) {
  listeners.push(listener)
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}
