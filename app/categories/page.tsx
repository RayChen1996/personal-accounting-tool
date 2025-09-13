"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Category {
  id: string
  name: string
  type: "income" | "expense"
  isDefault: boolean
}

const initialCategories: Category[] = [
  { id: "food", name: "餐飲", type: "expense", isDefault: true },
  { id: "transport", name: "交通", type: "expense", isDefault: true },
  { id: "shopping", name: "購物", type: "expense", isDefault: true },
  { id: "entertainment", name: "娛樂", type: "expense", isDefault: true },
  { id: "rent", name: "房租", type: "expense", isDefault: true },
  { id: "salary", name: "薪資", type: "income", isDefault: true },
  { id: "investment", name: "投資", type: "income", isDefault: true },
  { id: "utilities", name: "水電費支", type: "expense", isDefault: false },
  { id: "salary-income", name: "薪水", type: "income", isDefault: false },
  { id: "investment-income", name: "投資", type: "income", isDefault: false },
]

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newCategory, setNewCategory] = useState({ name: "", type: "expense" as "income" | "expense" })

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const category: Category = {
        id: Date.now().toString(),
        name: newCategory.name.trim(),
        type: newCategory.type,
        isDefault: false,
      }
      setCategories([...categories, category])
      setNewCategory({ name: "", type: "expense" })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditCategory = () => {
    if (editingCategory && editingCategory.name.trim()) {
      setCategories(categories.map((cat) => (cat.id === editingCategory.id ? { ...editingCategory } : cat)))
      setEditingCategory(null)
      setIsEditDialogOpen(false)
    }
  }

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  const startEdit = (category: Category) => {
    setEditingCategory({ ...category })
    setIsEditDialogOpen(true)
  }

  const presetCategories = categories.filter((cat) => cat.isDefault)
  const customCategories = categories.filter((cat) => !cat.isDefault)

  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 flex-shrink-0">
        <Navigation />
      </div>

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">交易類別</h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  新增類別
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>新增類別</DialogTitle>
                  <DialogDescription>創建一個新的交易類別</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category-name">類別名稱</Label>
                    <Input
                      id="category-name"
                      placeholder="輸入類別名稱"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category-type">類別類型</Label>
                    <Select
                      value={newCategory.type}
                      onValueChange={(value: "income" | "expense") => setNewCategory({ ...newCategory, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expense">支出</SelectItem>
                        <SelectItem value="income">收入</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    取消
                  </Button>
                  <Button
                    onClick={handleAddCategory}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    新增
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Preset Categories */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">預設類別</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">名稱</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">類型</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">動作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {presetCategories.map((category) => (
                      <tr key={category.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 text-sm font-medium">{category.name}</td>
                        <td className="py-3 px-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              category.type === "income" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                            }`}
                          >
                            {category.type === "income" ? "收入" : "支出"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEdit(category)}
                            className="text-primary hover:text-primary/80"
                          >
                            編輯
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Custom Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">自訂類別</CardTitle>
            </CardHeader>
            <CardContent>
              {customCategories.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>尚未有自訂類別</p>
                  <p className="text-sm mt-2">點擊上方「新增類別」按鈕來創建您的第一個自訂類別</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">名稱</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">類型</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">動作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customCategories.map((category) => (
                        <tr key={category.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4 text-sm font-medium">{category.name}</td>
                          <td className="py-3 px-4 text-sm">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                category.type === "income"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {category.type === "income" ? "收入" : "支出"}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => startEdit(category)}
                                className="text-primary hover:text-primary/80"
                              >
                                編輯
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteCategory(category.id)}
                                className="text-destructive hover:text-destructive/80"
                              >
                                刪除
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>編輯類別</DialogTitle>
                <DialogDescription>修改類別資訊</DialogDescription>
              </DialogHeader>
              {editingCategory && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-category-name">類別名稱</Label>
                    <Input
                      id="edit-category-name"
                      value={editingCategory.name}
                      onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-category-type">類別類型</Label>
                    <Select
                      value={editingCategory.type}
                      onValueChange={(value: "income" | "expense") =>
                        setEditingCategory({ ...editingCategory, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expense">支出</SelectItem>
                        <SelectItem value="income">收入</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleEditCategory} className="bg-primary hover:bg-primary/90 text-primary-foreground">
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
