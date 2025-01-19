import { ToDoListBoard } from '@/Components/ToDoListBoard'
import './App.css'

function App() {
  return (
    <div>
      <header className="border-b p-4">
        <h1 className="text-2xl font-bold">Todo Board</h1>
      </header>
      <main>
        <ToDoListBoard />
      </main>
    </div>
  )
}

export default App
