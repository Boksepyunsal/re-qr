"use client"

import { useState, useEffect } from "react"
import { LandingScreen } from "@/components/landing-screen"
import { DashboardScreen } from "@/components/dashboard-screen"
import { supabase } from "@/lib/supabase"
import { Session } from "@supabase/supabase-js"

export default function Page() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}`,
      },
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!session) {
    return <LandingScreen onLogin={handleLogin} />
  }

  return <DashboardScreen onLogout={handleLogout} />
}