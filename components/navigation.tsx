"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Plus, CreditCard, Tags, Wallet, BarChart3, User } from "lucide-react"

const navigation = [
  { name: "儀表板", href: "/", icon: LayoutDashboard },
  { name: "新增交易", href: "/transactions/new", icon: Plus },
  { name: "交易記錄", href: "/transactions", icon: CreditCard },
  { name: "類別管理", href: "/categories", icon: Tags },
  { name: "支付方式", href: "/payment-methods", icon: CreditCard },
  { name: "帳戶管理", href: "/accounts", icon: Wallet },
  { name: "報表", href: "/reports", icon: BarChart3 },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-card border-r border-border">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">FinTrack</span>
          </div>
        </div>

        <div className="flex-1 px-3">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">使用者</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
