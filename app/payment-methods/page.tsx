"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/navigation"
import { Plus, CreditCard, Wallet, Banknote } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface PaymentMethod {
  id: string
  name: string
  icon: "credit-card" | "wallet" | "banknote"
  isDefault: boolean
}

const initialPaymentMethods: PaymentMethod[] = [
  { id: "checking", name: "支票帳戶", icon: "banknote", isDefault: true },
  { id: "credit-card", name: "信用卡", icon: "credit-card", isDefault: true },
  { id: "cash", name: "現金", icon: "wallet", isDefault: true },
]

const iconMap = {
  "credit-card": CreditCard,
  wallet: Wallet,
  banknote: Banknote,
}

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null)
  const [newMethod, setNewMethod] = useState({ name: "", icon: "credit-card" as keyof typeof iconMap })

  const handleAddMethod = () => {
    if (newMethod.name.trim()) {
      const method: PaymentMethod = {
        id: Date.now().toString(),
        name: newMethod.name.trim(),
        icon: newMethod.icon,
        isDefault: false,
      }
      setPaymentMethods([...paymentMethods, method])
      setNewMethod({ name: "", icon: "credit-card" })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditMethod = () => {
    if (editingMethod && editingMethod.name.trim()) {
      setPaymentMethods(
        paymentMethods.map((method) => (method.id === editingMethod.id ? { ...editingMethod } : method)),
      )
      setEditingMethod(null)
      setIsEditDialogOpen(false)
    }
  }

  const handleDeleteMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }

  const startEdit = (method: PaymentMethod) => {
    setEditingMethod({ ...method })
    setIsEditDialogOpen(true)
  }

  const presetMethods = paymentMethods.filter((method) => method.isDefault)
  const customMethods = paymentMethods.filter((method) => !method.isDefault)

  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 flex-shrink-0">
        <Navigation />
      </div>

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">支付方式</h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  新增方式
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>新增支付方式</DialogTitle>
                  <DialogDescription>創建一個新的支付方式</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="method-name">支付方式名稱</Label>
                    <Input
                      id="method-name"
                      placeholder="輸入支付方式名稱"
                      value={newMethod.name}
                      onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={handleAddMethod} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    新增方式
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Automatic Methods Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">自動方式</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <CreditCard className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-lg font-medium mb-2">尚未有自動方式</p>
                <p className="text-sm">新增自動方式以追蹤您的支出</p>
                <Button
                  className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  新增方式
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preset Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">預設方式</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {presetMethods.map((method) => {
                  const IconComponent = iconMap[method.icon]
                  return (
                    <div
                      key={method.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{method.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {method.id === "checking" && "各種金融卡"}
                            {method.id === "credit-card" && "信用卡"}
                            {method.id === "cash" && "現金"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEdit(method)}
                          className="text-primary hover:text-primary/80"
                        >
                          編輯
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteMethod(method.id)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          刪除
                        </Button>
                      </div>
                    </div>
                  )
                })}

                {customMethods.map((method) => {
                  const IconComponent = iconMap[method.icon]
                  return (
                    <div
                      key={method.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{method.name}</div>
                          <div className="text-sm text-muted-foreground">自訂支付方式</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEdit(method)}
                          className="text-primary hover:text-primary/80"
                        >
                          編輯
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteMethod(method.id)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          刪除
                        </Button>
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
                <DialogTitle>編輯支付方式</DialogTitle>
                <DialogDescription>修改支付方式資訊</DialogDescription>
              </DialogHeader>
              {editingMethod && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-method-name">支付方式名稱</Label>
                    <Input
                      id="edit-method-name"
                      value={editingMethod.name}
                      onChange={(e) => setEditingMethod({ ...editingMethod, name: e.target.value })}
                    />
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleEditMethod} className="bg-primary hover:bg-primary/90 text-primary-foreground">
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
