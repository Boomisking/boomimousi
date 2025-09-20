"use client"

import type { Expense } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"

interface ExpenseListProps {
  expenses: Expense[]
  onDelete: (id: string) => void
  categoryColors: Record<string, string>
}

export function ExpenseList({ expenses, onDelete, categoryColors }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No expenses recorded yet.</p>
        <p className="text-sm">Start by adding your first expense!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {expenses.slice(0, 10).map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${categoryColors[expense.category]}`} />
            <div>
              <p className="font-medium">{expense.description}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{expense.category}</span>
                <span>•</span>
                <span>{new Date(expense.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono">
              ${expense.amount.toFixed(2)}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(expense.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      {expenses.length > 10 && (
        <p className="text-center text-sm text-muted-foreground pt-2">Showing 10 of {expenses.length} expenses</p>
      )}
    </div>
  )
}
