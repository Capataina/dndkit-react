import React from "react"

interface ToDoListColumnProps {
  title: string
  children: React.ReactNode
}

export default function ToDoListColumn({ title, children }: ToDoListColumnProps) {
  return (
    <div className="todo-column">
      <div className="todo-column-header">
        <h1>{title}</h1>
        <span>{React.Children.count(children)} tasks</span>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}