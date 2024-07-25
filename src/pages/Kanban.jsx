import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Cook dinner' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const Kanban = () => {
  const [state, setState] = useState(initialData);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [newTaskContent, setNewTaskContent] = useState('');
  const [addingColumn, setAddingColumn] = useState(false);
  const [addingTask, setAddingTask] = useState(null);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      setState(newState);
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
  };

  const addColumn = () => {
    if (newColumnTitle.trim() === '') return;
    const newColumnId = `column-${Date.now()}`;
    const newColumn = {
      id: newColumnId,
      title: newColumnTitle,
      taskIds: [],
    };
    setState(prevState => ({
      ...prevState,
      columns: {
        ...prevState.columns,
        [newColumnId]: newColumn,
      },
      columnOrder: [...prevState.columnOrder, newColumnId],
    }));
    setNewColumnTitle('');
    setAddingColumn(false);
  };

  const addTask = (columnId) => {
    if (newTaskContent.trim() === '') return;
    const newTaskId = `task-${Date.now()}`;
    const newTask = {
      id: newTaskId,
      content: newTaskContent,
    };
    setState(prevState => ({
      ...prevState,
      tasks: {
        ...prevState.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...prevState.columns,
        [columnId]: {
          ...prevState.columns[columnId],
          taskIds: [...prevState.columns[columnId].taskIds, newTaskId],
        },
      },
    }));
    setNewTaskContent('');
    setAddingTask(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex space-x-4"
            >
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

                return (
                  <Draggable key={column.id} draggableId={column.id} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="bg-gray-100 p-4 rounded-lg w-64"
                      >
                        <h2 {...provided.dragHandleProps} className="font-bold mb-2">{column.title}</h2>
                        <Droppable droppableId={column.id} type="task">
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={`min-h-[100px] ${snapshot.isDraggingOver ? 'bg-gray-200' : ''}`}
                            >
                              {tasks.map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`p-2 mb-2 rounded ${
                                        snapshot.isDragging ? 'bg-gray-300' : 'bg-white'
                                      }`}
                                    >
                                      {task.content}
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                        {addingTask === column.id ? (
                          <div className="mt-2">
                            <Input
                              type="text"
                              value={newTaskContent}
                              onChange={(e) => setNewTaskContent(e.target.value)}
                              placeholder="Enter task content"
                              className="mb-2"
                            />
                            <Button onClick={() => addTask(column.id)} className="mr-2">Add</Button>
                            <Button variant="outline" onClick={() => setAddingTask(null)}>Cancel</Button>
                          </div>
                        ) : (
                          <Button onClick={() => setAddingTask(column.id)} className="mt-2">
                            <Plus className="w-4 h-4 mr-2" /> Add Task
                          </Button>
                        )}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
              {addingColumn ? (
                <div className="bg-gray-100 p-4 rounded-lg w-64">
                  <Input
                    type="text"
                    value={newColumnTitle}
                    onChange={(e) => setNewColumnTitle(e.target.value)}
                    placeholder="Enter column title"
                    className="mb-2"
                  />
                  <Button onClick={addColumn} className="mr-2">Add</Button>
                  <Button variant="outline" onClick={() => setAddingColumn(false)}>Cancel</Button>
                </div>
              ) : (
                <Button onClick={() => setAddingColumn(true)} className="h-10 mt-4">
                  <Plus className="w-4 h-4 mr-2" /> Add Column
                </Button>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Kanban;
