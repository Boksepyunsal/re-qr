
import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

// Create a Supabase client with the Service Role Key for secure server-side operations
// This bypasses RLS policies to allow fetching the original URL for redirection
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // 1. Fetch the original URL from Supabase using the QR code ID
  const { data, error } = await supabaseAdmin
    .from("qr_codes")
    .select("url")
    .eq("id", id)
    .single()

  if (error || !data) {
    // Handle error (e.g., QR code not found)
    return NextResponse.redirect(new URL("/", request.url)) // Redirect to home page or a 404 page
  }

  // 2. Perform the redirect
  // 307 Temporary Redirect is generally appropriate for dynamic QR codes
  // where the destination might change. 301 Permanent Redirect should be used
  // if the QR code is intended to be permanently fixed.
  return NextResponse.redirect(data.url, 307) 
}
