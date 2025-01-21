# Todo Board

A modern, interactive **drag-and-drop Todo Board** built with React and TypeScript, designed to simplify task management. This application allows users to manage tasks dynamically across different stages: **To Do**, **In Progress**, and **Done**.

## Features

- [x] **Drag-and-drop functionality** for seamless task management.
- [x] Add new tasks with default settings.
- [x] Edit task titles and descriptions inline.
- [x] Delete tasks with a single click.
- [x] Assign task priority levels (Low, Medium, High) with visual indicators.
- [x] Responsive design for various screen sizes.
- [x] Hover effects for enhanced user experience.
- [ ] Responsive design for smaller screens.
- [ ] Persistent data storage.
- [ ] A way to create new lists.

## Tech Stack

- **React**: Core framework for building the UI.
- **TypeScript**: Ensuring type safety and better developer experience.
- **Zustand**: Lightweight state management for handling tasks.
- **@dnd-kit**: Drag-and-drop functionality.
- **Tailwind CSS**: Styling and responsive design.
- **Vite**: Fast development server and build tool.
- **shadcn/ui**: Easy to use minimalistic ui components.

## Project Structure

```plaintext
/src
├── /Components
│   ├── ToDoCard.tsx        # Represents individual tasks with editing and priority features.
│   ├── ToDoListBoard.tsx   # Main board holding task columns (To Do, In Progress, Done).
│   ├── ToDoListColumn.tsx  # Individual column for organizing tasks by status.
│   └── card.tsx            # Reusable card components with styled headers, content, and footers from shadcn/ui.
├── /store
│   └── ToDoStore.tsx       # Zustand store managing task states and actions (add, delete, update, move).
├── App.tsx                 # Main application component assembling the Todo Board.
├── main.tsx                # Application entry point.
├── App.css                 # Core styling for layout and component-specific styles.
├── index.css               # Tailwind configuration and global styles.
```

## How to Use

You can visit the website for the app at https://dndkit-react.vercel.app/.
