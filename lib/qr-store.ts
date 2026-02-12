import { supabase } from "./supabase"

export interface QRCode {
  id: string
  title: string
  url: string
  created_at: string
  user_id: string
}

let qrCodes: QRCode[] = []
let listeners: Array<() => void> = []

function notifyListeners() {
  listeners.forEach((l) => l())
}

export function getQRCodes() {
  return qrCodes
}

export async function loadQRCodes() {
  const { data, error } = await supabase
    .from("qr_codes")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error loading QR codes:", error)
    return
  }

  if (data) {
    qrCodes = data
    notifyListeners()
  }
}

export async function addQRCode(title: string, url: string) {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    console.error("User not logged in")
    return
  }

  const newQR = {
    title,
    url,
    user_id: user.id,
  }

  const { data, error } = await supabase
    .from("qr_codes")
    .insert([newQR])
    .select()
    .single()

  if (error) {
    console.error("Error adding QR code:", error)
    return
  }

  if (data) {
    qrCodes = [data, ...qrCodes]
    notifyListeners()
  }
}

export async function updateQRCode(id: string, title: string, url: string) {
  const { error } = await supabase
    .from("qr_codes")
    .update({ title, url })
    .eq("id", id)

  if (error) {
    console.error("Error updating QR code:", error)
    return
  }

  qrCodes = qrCodes.map((qr) =>
    qr.id === id ? { ...qr, title, url } : qr
  )
  notifyListeners()
}

export async function deleteQRCode(id: string) {
  const { error } = await supabase
    .from("qr_codes")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting QR code:", error)
    return
  }

  qrCodes = qrCodes.filter((qr) => qr.id !== id)
  notifyListeners()
}

export function subscribe(listener: () => void) {
  listeners.push(listener)
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}
