"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { TrendingUp, TrendingDown, Wallet } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts"

const mockYearlyData = {
  income: 65000,
  expenses: 42000,
  netSavings: 23000,
  categories: [
    { name: "薪水", income: 60000, expense: 0, net: 60000 },
    { name: "兼職", income: 5000, expense: 0, net: 5000 },
    { name: "社會", income: 0, expense: 12000, net: -12000 },
    { name: "生活雜貨", income: 0, expense: 10000, net: -10000 },
    { name: "娛樂", income: 0, expense: 5000, net: -5000 },
  ],
}

const mockMonthlyData = {
  income: 35100.0,
  expenses: 25675.5,
  netSavings: 9424.5,
  transactions: [
    {
      date: "2024-07-19",
      category: "餐飲",
      description: "餐廳晚餐",
      paymentMethod: "信用卡",
      account: "信用卡",
      amount: -675.0,
    },
    {
      date: "2024-07-18",
      category: "水電費",
      description: "電費帳單",
      paymentMethod: "銀行轉帳",
      account: "支票帳戶",
      amount: -1012.5,
    },
    {
      date: "2024-07-17",
      category: "雜貨",
      description: "每週購物",
      paymentMethod: "信用卡",
      account: "信用卡",
      amount: -1675.0,
    },
    {
      date: "2024-07-16",
      category: "薪水",
      description: "月薪",
      paymentMethod: "直接存款",
      account: "支票帳戶",
      amount: 35100.0,
    },
    {
      date: "2024-07-16",
      category: "社會",
      description: "公眾場合",
      paymentMethod: "銀行轉帳",
      account: "銀行轉帳",
      amount: -10125.0,
    },
  ],
}

const chartData = [
  { name: "1月", income: 45000, expense: 32000 },
  { name: "2月", income: 52000, expense: 28000 },
  { name: "3月", income: 48000, expense: 35000 },
  { name: "4月", income: 61000, expense: 42000 },
  { name: "5月", income: 55000, expense: 38000 },
  { name: "6月", income: 58000, expense: 41000 },
  { name: "7月", income: 35100, expense: 25675 },
]

const pieData = [
  { name: "社會", value: 12000, color: "#ef4444" },
  { name: "生活雜貨", value: 10000, color: "#f97316" },
  { name: "娛樂", value: 5000, color: "#eab308" },
  { name: "其他", value: 15000, color: "#22c55e" },
]

const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e"]

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("last-year")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all")
  const [selectedAccount, setSelectedAccount] = useState("all")

  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 flex-shrink-0">
        <Navigation />
      </div>

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-foreground mb-6">報表</h1>

          <Tabs defaultValue="yearly" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="yearly">年度報表</TabsTrigger>
              <TabsTrigger value="monthly">月度總結</TabsTrigger>
            </TabsList>

            {/* Yearly Report */}
            <TabsContent value="yearly" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">年度報表</h2>
                <div className="text-sm text-muted-foreground">檢視您過去一年的財務表現</div>
              </div>

              {/* Filters */}
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-year">過去一年</SelectItem>
                        <SelectItem value="this-year">今年</SelectItem>
                        <SelectItem value="2023">2023年</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="所有類別" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">所有類別</SelectItem>
                        <SelectItem value="salary">薪水</SelectItem>
                        <SelectItem value="social">社會</SelectItem>
                        <SelectItem value="groceries">生活雜貨</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="所有方式" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">所有方式</SelectItem>
                        <SelectItem value="credit-card">信用卡</SelectItem>
                        <SelectItem value="bank-transfer">銀行轉帳</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                      <SelectTrigger>
                        <SelectValue placeholder="所有帳戶" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">所有帳戶</SelectItem>
                        <SelectItem value="checking">支票帳戶</SelectItem>
                        <SelectItem value="credit">信用卡</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">收入</CardTitle>
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-500">${mockYearlyData.income.toLocaleString()}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">支出</CardTitle>
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-500">${mockYearlyData.expenses.toLocaleString()}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">淨餘額</CardTitle>
                    <Wallet className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">${mockYearlyData.netSavings.toLocaleString()}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Income vs Expense Trend Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">收支趨勢圖</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="income" fill="#10b981" name="收入" />
                        <Bar dataKey="expense" fill="#ef4444" name="支出" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Category Spending Pie Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">類別花費排行</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Category Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">類別明細</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">類別</th>
                          <th className="text-right py-3 px-4 font-medium text-muted-foreground">收入</th>
                          <th className="text-right py-3 px-4 font-medium text-muted-foreground">支出</th>
                          <th className="text-right py-3 px-4 font-medium text-muted-foreground">淨額</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockYearlyData.categories.map((category, index) => (
                          <tr key={index} className="border-b border-border hover:bg-muted/50">
                            <td className="py-3 px-4 text-sm font-medium">{category.name}</td>
                            <td className="py-3 px-4 text-sm text-right">
                              {category.income > 0 ? `$${category.income.toLocaleString()}` : "$0"}
                            </td>
                            <td className="py-3 px-4 text-sm text-right">
                              {category.expense > 0 ? `$${category.expense.toLocaleString()}` : "$0"}
                            </td>
                            <td
                              className={`py-3 px-4 text-sm font-semibold text-right ${
                                category.net >= 0 ? "text-emerald-500" : "text-red-500"
                              }`}
                            >
                              {category.net >= 0 ? "+" : "-"}${Math.abs(category.net).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Monthly Report */}
            <TabsContent value="monthly" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">月度總結</h2>
                <div className="text-sm text-muted-foreground">查看您所選月份的財務表現</div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">收入</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-500">
                      ¥{mockMonthlyData.income.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">支出</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-500">¥{mockMonthlyData.expenses.toLocaleString()}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">淨餘額</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">
                      ¥{mockMonthlyData.netSavings.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters */}
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="所有類別" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">所有類別</SelectItem>
                        <SelectItem value="food">餐飲</SelectItem>
                        <SelectItem value="utilities">水電費</SelectItem>
                        <SelectItem value="groceries">雜貨</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="所有支付方式" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">所有支付方式</SelectItem>
                        <SelectItem value="credit-card">信用卡</SelectItem>
                        <SelectItem value="bank-transfer">銀行轉帳</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="所有帳戶" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">所有帳戶</SelectItem>
                        <SelectItem value="checking">支票帳戶</SelectItem>
                        <SelectItem value="credit">信用卡</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="relative">
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                        defaultValue="2024-07-01"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transaction Records */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">交易記錄</CardTitle>
                </CardHeader>
                <CardContent>
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
                        {mockMonthlyData.transactions.map((transaction, index) => (
                          <tr key={index} className="border-b border-border hover:bg-muted/50">
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
