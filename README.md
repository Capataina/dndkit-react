# Todo Board

A drag-and-drop to-do list application built with React and Zustand. The app allows users to organize tasks across multiple columns—To Do, In Progress, and Done—while providing features like task prioritization and inline editing.

## Features

- [x] Drag-and-drop functionality for task movement between columns.
- [x] Task prioritization (Low, Medium, High).
- [x] Inline editing for task titles and descriptions.
- [x] Task addition and deletion.
- [ ] Responsive design for smaller screens.
- [ ] Persistent data storage.
- [ ] A way to create new lists.

## Tech Stack

- **Frontend**: React, TypeScript, Zustand for state management.
- **Styling**: Tailwind CSS, CSS Modules.
- **Drag-and-Drop**: `@dnd-kit/core` library.

## Project Structure

```plaintext
src/
├── Components/
│   ├── ToDoCard.tsx        # Component for individual task cards.
│   ├── ToDoListBoard.tsx   # Main board layout handling drag-and-drop.
│   ├── ToDoListColumn.tsx  # Column layout with task grouping.
│   └── ui/
│       └── card.tsx        # Reusable Card UI components.
├── store/
│   └── ToDoStore.tsx       # Zustand store managing app state.
├── App.tsx                 # Main application entry component.
├── main.tsx                # React app initialization.
├── index.css               # Global Tailwind CSS styles.
└── App.css                 # Component-specific styles.
```

## How to Use

You can visit the website for the app at https://dndkit-react.vercel.app/.
