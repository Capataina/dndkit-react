import { create } from 'zustand'

export interface TodoCard {
  id: string
  title: string
  description?: string
  priority?: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'done'
}

interface ToDoStore {
  cards: TodoCard[]
  addCard: (card: Omit<TodoCard, 'id'>) => void
  updateCard: (id: string, card: Partial<TodoCard>) => void
  deleteCard: (id: string) => void
  moveCard: (id: string, status: TodoCard['status']) => void
}

export const useToDoStore = create<ToDoStore>((set) => ({
  cards: [
    {
      id: crypto.randomUUID(),
      title: 'Design new landing page',
      description: 'Create wireframes and mockups',
      priority: 'high',
      status: 'todo',
    },
    {
      id: crypto.randomUUID(),
      title: 'Update documentation',
      priority: 'low',
      status: 'todo',
    },
    {
      id: crypto.randomUUID(),
      title: 'Implement authentication',
      description: 'Add OAuth support',
      priority: 'medium',
      status: 'in-progress',
    },
    {
      id: crypto.randomUUID(),
      title: 'Setup project',
      description: 'Initialize repository and dependencies',
      priority: 'low',
      status: 'done',
    },
  ],

  addCard: (card) =>
    set((state) => ({
      cards: [...state.cards, { ...card, id: crypto.randomUUID() }],
    })),

  updateCard: (id, updatedCard) =>
    set((state) => ({
      cards: state.cards.map((card) =>
        card.id === id ? { ...card, ...updatedCard } : card
      ),
    })),

  deleteCard: (id) =>
    set((state) => ({
      cards: state.cards.filter((card) => card.id !== id),
    })),

  moveCard: (id, newStatus) =>
    set((state) => ({
      cards: state.cards.map((card) =>
        card.id === id ? { ...card, status: newStatus } : card
      ),
    })),
})) 