"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { Plus, Search } from "lucide-react"
import Link from "next/link"

const mockTransactions = [
  {
    id: 1,
    date: "2024-07-19",
    description: "餐廳晚餐",
    category: "餐飲",
    paymentMethod: "信用卡",
    amount: -675.0,
    account: "支票帳戶",
  },
  {
    id: 2,
    date: "2024-07-18",
    description: "電費帳單",
    category: "水電費",
    paymentMethod: "銀行轉帳",
    amount: -1012.5,
    account: "支票帳戶",
  },
  {
    id: 3,
    date: "2024-07-17",
    description: "每週購物",
    category: "雜貨",
    paymentMethod: "信用卡",
    amount: -1675.0,
    account: "信用卡",
  },
  {
    id: 4,
    date: "2024-07-16",
    description: "月薪",
    category: "薪水",
    paymentMethod: "直接存款",
    amount: 35100.0,
    account: "支票帳戶",
  },
  {
    id: 5,
    date: "2024-07-16",
    description: "公眾場合",
    category: "社會",
    paymentMethod: "銀行轉帳",
    amount: -10125.0,
    account: "銀行轉帳",
  },
]

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all")
  const [selectedAccount, setSelectedAccount] = useState("all")

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || transaction.category === selectedCategory
    const matchesPaymentMethod = selectedPaymentMethod === "all" || transaction.paymentMethod === selectedPaymentMethod
    const matchesAccount = selectedAccount === "all" || transaction.account === selectedAccount

    return matchesSearch && matchesCategory && matchesPaymentMethod && matchesAccount
  })

  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 flex-shrink-0">
        <Navigation />
      </div>

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">月度總結</h1>
            <Link href="/transactions/new">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                新增方式
              </Button>
            </Link>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">收入</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-500">¥35,100.00</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">支出</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">¥25,675.50</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">淨餘額</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">¥9,424.50</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">交易記錄</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="搜尋交易..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="所有類別" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有類別</SelectItem>
                    <SelectItem value="餐飲">餐飲</SelectItem>
                    <SelectItem value="水電費">水電費</SelectItem>
                    <SelectItem value="雜貨">雜貨</SelectItem>
                    <SelectItem value="薪水">薪水</SelectItem>
                    <SelectItem value="社會">社會</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="所有支付方式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有支付方式</SelectItem>
                    <SelectItem value="信用卡">信用卡</SelectItem>
                    <SelectItem value="銀行轉帳">銀行轉帳</SelectItem>
                    <SelectItem value="直接存款">直接存款</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                  <SelectTrigger>
                    <SelectValue placeholder="所有帳戶" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有帳戶</SelectItem>
                    <SelectItem value="支票帳戶">支票帳戶</SelectItem>
                    <SelectItem value="信用卡">信用卡</SelectItem>
                    <SelectItem value="銀行轉帳">銀行轉帳</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Transaction Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">日期</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">類別</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">描述</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">支付方式</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">帳戶</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">金額</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 text-sm">{transaction.date}</td>
                        <td className="py-3 px-4 text-sm">{transaction.category}</td>
                        <td className="py-3 px-4 text-sm font-medium">{transaction.description}</td>
                        <td className="py-3 px-4 text-sm">{transaction.paymentMethod}</td>
                        <td className="py-3 px-4 text-sm">{transaction.account}</td>
                        <td
                          className={`py-3 px-4 text-sm font-semibold text-right ${
                            transaction.amount > 0 ? "text-emerald-500" : "text-red-500"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}¥{Math.abs(transaction.amount).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
