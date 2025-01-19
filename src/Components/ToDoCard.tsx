import { X, ChevronDown } from "lucide-react"
import { useToDoStore } from "@/store/ToDoStore"
import { useState, useRef, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardContent } from "@/Components/ui/card"
import { useDraggable } from "@dnd-kit/core"

interface ToDoCardProps {
  id: string
  title: string
  description?: string
  priority?: 'low' | 'medium' | 'high'
}

export default function ToDoCard({ id, title, description, priority }: ToDoCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [titleValue, setTitleValue] = useState<string>(title)
  const [descriptionValue, setDescriptionValue] = useState<string>(description || '')
  
  const titleInputRef = useRef<HTMLInputElement>(null)
  const descriptionInputRef = useRef<HTMLInputElement>(null)
  
  // Use separate selectors to prevent unnecessary rerenders
  const deleteCard = useToDoStore(useCallback((state) => state.deleteCard, []))
  const updateCard = useToDoStore(useCallback((state) => state.updateCard, []))
  const [isPriorityOpen, setIsPriorityOpen] = useState(false)
  const priorityRef = useRef<HTMLDivElement>(null)

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (priorityRef.current && !priorityRef.current.contains(event.target as Node)) {
        setIsPriorityOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

  const handlePriorityChange = (newPriority: 'low' | 'medium' | 'high') => {
    updateCard(id, { priority: newPriority })
    setIsPriorityOpen(false)
  }

  const priorityColors = {
    low: 'text-green-400',
    medium: 'text-yellow-400',
    high: 'text-red-400',
  }

  const priorityStyles = {
    low: "border-green-500/50",
    medium: "border-yellow-500/50",
    high: "border-red-500/50",
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "group relative border-2 cursor-grab active:cursor-grabbing",
        priority && priorityStyles[priority]
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b p-4">
        <div className="relative" ref={priorityRef}>
          <button
            onClick={() => setIsPriorityOpen(!isPriorityOpen)}
            className={cn(
              "flex items-center gap-1 text-sm hover:text-primary transition-colors",
              priority ? priorityColors[priority] : "text-muted-foreground"
            )}
          >
            <ChevronDown className="h-4 w-4" />
          </button>

          {isPriorityOpen && (
            <div className="absolute top-full mt-1 z-10 bg-secondary border rounded-md shadow-lg py-1">
              {(['low', 'medium', 'high'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => handlePriorityChange(p)}
                  className={cn(
                    "w-full px-3 py-1 text-left text-sm hover:bg-muted transition-colors",
                    priorityColors[p]
                  )}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {isEditingTitle ? (
          <input
            ref={titleInputRef}
            type="text"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={(e) => handleKeyDown(e, handleTitleSubmit, () => {
              setTitleValue(title)
              setIsEditingTitle(false)
            })}
            className="flex-1 bg-transparent border-none p-0 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary rounded text-center mx-2"
          />
        ) : (
          <h3 
            className="flex-1 text-center cursor-pointer hover:text-primary transition-colors mx-2"
            onClick={() => setIsEditingTitle(true)}
          >
            {titleValue}
          </h3>
        )}

        <button
          onClick={() => deleteCard(id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Delete card"
        >
          <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </button>
      </CardHeader>

      <CardContent className="pt-2 px-4 pb-4">
        {isEditingDescription ? (
          <input
            ref={descriptionInputRef}
            type="text"
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            onBlur={handleDescriptionSubmit}
            onKeyDown={(e) => handleKeyDown(e, handleDescriptionSubmit, () => {
              setDescriptionValue(description || '')
              setIsEditingDescription(false)
            })}
            className="w-full bg-transparent border-none p-0 text-sm text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary rounded"
            placeholder="Add description..."
          />
        ) : (
          <p 
            className="cursor-pointer hover:text-primary transition-colors text-sm"
            onClick={() => setIsEditingDescription(true)}
          >
            {descriptionValue || (
              <span className="text-muted-foreground/50 italic">
                Add description...
              </span>
            )}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

