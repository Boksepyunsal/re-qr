"use client"

import { useState } from "react"
import { LandingScreen } from "@/components/landing-screen"
import { DashboardScreen } from "@/components/dashboard-screen"

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return <LandingScreen onLogin={() => setIsLoggedIn(true)} />
  }

  return <DashboardScreen onLogout={() => setIsLoggedIn(false)} />
}
