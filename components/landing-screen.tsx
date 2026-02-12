"use client"

import { QrCode, HelpCircle, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import QRCode from "react-qr-code"
import Link from "next/link" // Import Link

interface LandingScreenProps {
  onLogin: () => void
}

export function LandingScreen({ onLogin }: LandingScreenProps) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 py-10">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center">
        {/* Header */}
        <header className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <QrCode className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Re:QR</span>
          </div>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Help"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        </header>

        {/* Hero Illustration */}
        <div className="mt-10 flex w-full items-center justify-center">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
            <QRCode
              value="https://reqr.app"
              size={160}
              bgColor="hsl(0, 0%, 100%)"
              fgColor="hsl(222, 47%, 11%)"
            />
          </div>
        </div>

        {/* Copy */}
        <div className="mt-10 flex flex-col items-center text-center">
          <h1 className="text-balance text-2xl font-bold leading-tight text-foreground">
            Smart Connections,{" "}
            <span className="text-primary">Dynamic Control.</span>
          </h1>
          <p className="mt-3 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
            Create, edit, and track your QR codes instantly without reprinting. Join thousands of marketers today.
          </p>
        </div>

        {/* Login Button */}
        <div className="mt-10 flex w-full flex-col items-center gap-4">
          <Button
            onClick={onLogin}
            className="h-12 w-full rounded-xl bg-kakao text-kakao-foreground shadow-sm transition-all hover:bg-kakao/90 hover:shadow-md"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-base font-semibold">Login with Kakao</span>
          </Button>

          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            By logging in, you agree to our{" "}
            <Link href="/terms" className="font-medium text-primary underline underline-offset-2 hover:text-primary/80">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-medium text-primary underline underline-offset-2 hover:text-primary/80">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
