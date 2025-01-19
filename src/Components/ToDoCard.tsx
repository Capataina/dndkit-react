import { X } from "lucide-react"
import { useToDoStore } from "@/store/ToDoStore"
import { useState, useRef, useEffect, useCallback } from "react"

interface ToDoCardProps {
  id: string
  title: string
  description?: string
  priority?: 'low' | 'medium' | 'high'
}

export default function ToDoCard({ id, title, description, priority }: ToDoCardProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [titleValue, setTitleValue] = useState<string>(title)
  const [descriptionValue, setDescriptionValue] = useState<string>(description || '')
  
  const titleInputRef = useRef<HTMLInputElement>(null)
  const descriptionInputRef = useRef<HTMLInputElement>(null)
  
  // Use separate selectors to prevent unnecessary rerenders
  const deleteCard = useToDoStore(useCallback((state) => state.deleteCard, []))
  const updateCard = useToDoStore(useCallback((state) => state.updateCard, []))

  // Sync local state with props when they change
  useEffect(() => {
    setTitleValue(title)
    setDescriptionValue(description || '')
  }, [title, description])

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus()
    }
    if (isEditingDescription && descriptionInputRef.current) {
      descriptionInputRef.current.focus()
    }
  }, [isEditingTitle, isEditingDescription])

  const handleTitleSubmit = () => {
    const newTitle = titleValue.trim()
    if (newTitle && newTitle !== title) {
      updateCard(id, { title: newTitle })
    } else {
      setTitleValue(title) // Reset to original if empty or unchanged
    }
    setIsEditingTitle(false)
  }

  const handleDescriptionSubmit = () => {
    const newDescription = descriptionValue.trim()
    if (newDescription !== description) {
      updateCard(id, { description: newDescription || undefined })
    } else {
      setDescriptionValue(description || '') // Reset to original
    }
    setIsEditingDescription(false)
  }

  const handleKeyDown = (
    e: React.KeyboardEvent,
    submitFn: () => void,
    cancelFn: () => void
  ) => {
    if (e.key === 'Enter') {
      submitFn()
    } else if (e.key === 'Escape') {
      cancelFn()
    }
  }

  return (
    <div className={`todo-card ${priority ? `priority-${priority}` : ''} group relative`}>
      <button
        onClick={() => deleteCard(id)}
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Delete card"
      >
        <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
      </button>

      {isEditingTitle ? (
        <input
          ref={titleInputRef}
          type="text"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          onBlur={handleTitleSubmit}
          onKeyDown={(e) => 
            handleKeyDown(
              e,
              handleTitleSubmit,
              () => {
                setTitleValue(title)
                setIsEditingTitle(false)
              }
            )
          }
          className="w-full bg-transparent border-none p-0 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary rounded"
        />
      ) : (
        <h3 
          className="todo-card-title cursor-pointer hover:text-primary transition-colors"
          onClick={() => setIsEditingTitle(true)}
        >
          {titleValue}
        </h3>
      )}

      {isEditingDescription ? (
        <input
          ref={descriptionInputRef}
          type="text"
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
          onBlur={handleDescriptionSubmit}
          onKeyDown={(e) => 
            handleKeyDown(
              e,
              handleDescriptionSubmit,
              () => {
                setDescriptionValue(description || '')
                setIsEditingDescription(false)
              }
            )
          }
          className="w-full bg-transparent border-none p-0 mt-1 text-sm text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary rounded"
          placeholder="Add description..."
        />
      ) : (
        <p 
          className="todo-card-description cursor-pointer hover:text-primary transition-colors"
          onClick={() => setIsEditingDescription(true)}
        >
          {descriptionValue || (
            <span className="text-muted-foreground/50 italic">
              Add description...
            </span>
          )}
        </p>
      )}
    </div>
  )
}

