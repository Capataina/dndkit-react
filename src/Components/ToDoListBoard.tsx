import { 
  DndContext, 
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors 
} from "@dnd-kit/core";
import ToDoListColumn from "./ToDoListColumn";
import ToDoCard from "./ToDoCard";
import { useToDoStore } from "@/store/ToDoStore";

export function ToDoListBoard() {
  const cards = useToDoStore((state) => state.cards);
  const moveCard = useToDoStore((state) => state.moveCard);

  // Configure the pointer sensor with a delay
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 75, //need to hold for 75ms to move card
        tolerance: 25,
      },
    })
  );

  const todoCards = cards.filter((card) => card.status === 'todo');
  const inProgressCards = cards.filter((card) => card.status === 'in-progress');
  const doneCards = cards.filter((card) => card.status === 'done');

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (!over) return;

    const cardId = active.id as string;
    const newStatus = over.id as 'todo' | 'in-progress' | 'done';

    moveCard(cardId, newStatus);
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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
    </DndContext>
  );
} 