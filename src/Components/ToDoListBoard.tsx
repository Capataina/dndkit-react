import ToDoListColumn from "./ToDoListColumn";
import ToDoCard from "./ToDoCard";
import { useToDoStore } from "@/store/ToDoStore";

export function ToDoListBoard() {
  const cards = useToDoStore((state) => state.cards);

  const todoCards = cards.filter((card) => card.status === 'todo');
  const inProgressCards = cards.filter((card) => card.status === 'in-progress');
  const doneCards = cards.filter((card) => card.status === 'done');

  return (
    <div className="todo-board">
      <ToDoListColumn title="To Do" status="todo">
        {todoCards.map((card) => (
          <ToDoCard
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            priority={card.priority}
          />
        ))}
      </ToDoListColumn>

      <ToDoListColumn title="In Progress" status="in-progress">
        {inProgressCards.map((card) => (
          <ToDoCard
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            priority={card.priority}
          />
        ))}
      </ToDoListColumn>

      <ToDoListColumn title="Done" status="done">
        {doneCards.map((card) => (
          <ToDoCard
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            priority={card.priority}
          />
        ))}
      </ToDoListColumn>
    </div>
  );
} 