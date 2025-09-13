"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { Plus, Building2, PiggyBank, CreditCard, TrendingUp, Wallet } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Account {
  id: string
  name: string
  type: "checking" | "savings" | "credit" | "investment" | "cash"
  balance: number
  isDefault: boolean
}

const initialAccounts: Account[] = [
  { id: "primary-checking", name: "Primary Checking", type: "checking", balance: 5234.56, isDefault: true },
  { id: "emergency-fund", name: "Emergency Fund", type: "savings", balance: 12876.92, isDefault: true },
  { id: "travel-rewards", name: "Travel Rewards Card", type: "credit", balance: 2150.34, isDefault: true },
  { id: "retirement", name: "Retirement Portfolio", type: "investment", balance: 45987.11, isDefault: true },
  { id: "wallet", name: "Wallet", type: "cash", balance: 150.0, isDefault: false },
  { id: "vacation-fund", name: "Vacation Fund", type: "savings", balance: 3500.0, isDefault: false },
  { id: "shopping-card", name: "Shopping Card", type: "credit", balance: 875.6, isDefault: false },
]

const accountTypes = [
  { value: "checking", label: "支票帳戶", icon: Building2 },
  { value: "savings", label: "儲蓄帳戶", icon: PiggyBank },
  { value: "credit", label: "信用卡", icon: CreditCard },
  { value: "investment", label: "投資帳戶", icon: TrendingUp },
  { value: "cash", label: "現金", icon: Wallet },
]

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)
  const [newAccount, setNewAccount] = useState({
    name: "",
    type: "checking" as Account["type"],
    balance: "0",
  })

  const handleAddAccount = () => {
    if (newAccount.name.trim()) {
      const account: Account = {
        id: Date.now().toString(),
        name: newAccount.name.trim(),
        type: newAccount.type,
        balance: Number.parseFloat(newAccount.balance) || 0,
        isDefault: false,
      }
      setAccounts([...accounts, account])
      setNewAccount({ name: "", type: "checking", balance: "0" })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditAccount = () => {
    if (editingAccount && editingAccount.name.trim()) {
      setAccounts(accounts.map((acc) => (acc.id === editingAccount.id ? { ...editingAccount } : acc)))
      setEditingAccount(null)
      setIsEditDialogOpen(false)
    }
  }

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter((acc) => acc.id !== id))
  }

  const startEdit = (account: Account) => {
    setEditingAccount({ ...account })
    setIsEditDialogOpen(true)
  }

  const getAccountTypeInfo = (type: Account["type"]) => {
    return accountTypes.find((t) => t.value === type) || accountTypes[0]
  }

  const myAccounts = accounts.filter((acc) => acc.isDefault)
  const customAccounts = accounts.filter((acc) => !acc.isDefault)

  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 flex-shrink-0">
        <Navigation />
      </div>

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">Accounts</h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  New Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>新增帳戶</DialogTitle>
                  <DialogDescription>創建一個新的帳戶</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="account-name">帳戶名稱</Label>
                    <Input
                      id="account-name"
                      placeholder="輸入帳戶名稱"
                      value={newAccount.name}
                      onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-type">帳戶類型</Label>
                    <Select
                      value={newAccount.type}
                      onValueChange={(value: Account["type"]) => setNewAccount({ ...newAccount, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {accountTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-balance">起始餘額</Label>
                    <Input
                      id="account-balance"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={newAccount.balance}
                      onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={handleAddAccount} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    新增帳戶
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* My Accounts */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">My Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myAccounts.map((account) => {
                  const typeInfo = getAccountTypeInfo(account.type)
                  const IconComponent = typeInfo.icon
                  return (
                    <div
                      key={account.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{account.name}</div>
                          <div className="text-sm text-muted-foreground">{typeInfo.label}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-foreground">
                          ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Custom Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Custom Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customAccounts.map((account) => {
                  const typeInfo = getAccountTypeInfo(account.type)
                  const IconComponent = typeInfo.icon
                  return (
                    <div
                      key={account.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{account.name}</div>
                          <div className="text-sm text-muted-foreground">{typeInfo.label}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-lg font-semibold text-foreground">
                            ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEdit(account)}
                            className="text-primary hover:text-primary/80"
                          >
                            編輯
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteAccount(account.id)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            刪除
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>編輯帳戶</DialogTitle>
                <DialogDescription>修改帳戶資訊</DialogDescription>
              </DialogHeader>
              {editingAccount && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-account-name">帳戶名稱</Label>
                    <Input
                      id="edit-account-name"
                      value={editingAccount.name}
                      onChange={(e) => setEditingAccount({ ...editingAccount, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-account-type">帳戶類型</Label>
                    <Select
                      value={editingAccount.type}
                      onValueChange={(value: Account["type"]) => setEditingAccount({ ...editingAccount, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {accountTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-account-balance">餘額</Label>
                    <Input
                      id="edit-account-balance"
                      type="number"
                      step="0.01"
                      value={editingAccount.balance}
                      onChange={(e) =>
                        setEditingAccount({ ...editingAccount, balance: Number.parseFloat(e.target.value) || 0 })
                      }
                    />
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleEditAccount} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  儲存
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  )
}
