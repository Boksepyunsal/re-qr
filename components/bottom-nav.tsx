"use client"

import { LayoutGrid, BarChart3, User } from "lucide-react"
import { cn } from "@/lib/utils"

type Tab = "home" | "stats" | "profile"

interface BottomNavProps {
  active: Tab
  onTabChange: (tab: Tab) => void
}

const tabs: { id: Tab; label: string; icon: typeof LayoutGrid }[] = [
  { id: "home", label: "Home", icon: LayoutGrid },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "profile", label: "Profile", icon: User },
]

export function BottomNav({ active, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card">
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
