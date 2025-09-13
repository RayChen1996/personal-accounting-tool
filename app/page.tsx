import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Plus, TrendingUp, TrendingDown, Wallet } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 flex-shrink-0">
        <Navigation />
      </div>

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">儀表板</h1>
            <Link href="/transactions/new">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                新增交易
              </Button>
            </Link>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">本月收入</CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-500">¥35,100.00</div>
                <p className="text-xs text-muted-foreground">較上月 +12.5%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">本月支出</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">¥25,675.50</div>
                <p className="text-xs text-muted-foreground">較上月 +8.2%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">淨餘額</CardTitle>
                <Wallet className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">¥9,424.50</div>
                <p className="text-xs text-muted-foreground">較上月 +23.1%</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">最近交易</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "2024-07-19", category: "餐飲", description: "餐廳晚餐", amount: -675.0, method: "信用卡" },
                  {
                    date: "2024-07-18",
                    category: "水電費",
                    description: "電費帳單",
                    amount: -1012.5,
                    method: "銀行轉帳",
                  },
                  { date: "2024-07-17", category: "雜貨", description: "每週購物", amount: -1675.0, method: "信用卡" },
                  { date: "2024-07-16", category: "薪水", description: "月薪", amount: +35100.0, method: "直接存款" },
                  {
                    date: "2024-07-16",
                    category: "社會",
                    description: "公眾場合",
                    amount: -10125.0,
                    method: "銀行轉帳",
                  },
                ].map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium text-foreground">{transaction.description}</div>
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                          {transaction.category}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {transaction.date} • {transaction.method}
                      </div>
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        transaction.amount > 0 ? "text-emerald-500" : "text-red-500"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}¥{Math.abs(transaction.amount).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
