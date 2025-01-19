import React from "react"
import { Plus } from "lucide-react"
import { useToDoStore } from "@/store/ToDoStore"
import { useDroppable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"

interface ToDoListColumnProps {
  title: string
  children: React.ReactNode
  status: 'todo' | 'in-progress' | 'done'
}

export default function ToDoListColumn({ title, children, status }: ToDoListColumnProps) {
  const addCard = useToDoStore((state) => state.addCard)
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  })

  const handleAddCard = () => {
    addCard({
      title: "New Task",
      status: status,
    })
  }

  return (
    <div 
      ref={setNodeRef}
      className={cn(
        "todo-column group/column",
        isOver && "ring-2 ring-primary/50"
      )}
    >
      <div className="todo-column-header border-b p-1">
        <h1 className="text-xl font-bold">{title}</h1>
        <span className="text-muted-foreground/50 italic">{React.Children.count(children)} tasks</span>
      </div>
      <div>
        {children}
        <button
          onClick={handleAddCard}
          className="w-full opacity-0 group-hover/column:opacity-100 transition-opacity duration-200 todo-card flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <Plus className="h-5 w-5" />
          <span>Add Card</span>
        </button>
      </div>
    </div>
  )
}