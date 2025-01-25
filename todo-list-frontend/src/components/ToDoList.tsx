import { fetchTasks } from 'lib/TaskRequests';
import Task, { TaskStatus } from 'models/Task';
import { FC, useEffect, useState } from 'react';
import AddTask from './AddTask';
import TaskCards from './TaskCards';

const toggleStatus = (status: TaskStatus) => {
  if (status === TaskStatus.NOT_DONE) {
    return TaskStatus.DONE;
  } else {
    return TaskStatus.NOT_DONE;
  }
};

const ToDoList: FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchTasks()
      .then(setTasks)
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onTaskAdd = (addedTask: Task) => {
    setTasks((prev) => [...prev, addedTask]);
  };

  const onTaskStatusToggle = (updatedTask: Task) => {
    setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? { ...task, status: toggleStatus(task.status) } : task)));
  };

  const onTaskDelete = (deletedTask: Task) => {
    setTasks((prev) => prev.filter((t) => t.id !== deletedTask.id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: '#efefef', borderRadius: 10, maxWidth: 1000 }}>
      <div style={{ padding: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
        <span style={{ paddingLeft: 10, fontWeight: 'bold', fontSize: 20 }}>TASKS</span>
      </div>
      <div style={{ padding: 10 }}>
        <TaskCards
          loading={loading}
          error={error}
          tasks={tasks}
          onTaskStatusToggle={onTaskStatusToggle}
          onTaskDelete={onTaskDelete}
          onError={(err) => setError(err?.message)}
        />
      </div>
      <div style={{ padding: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
        <AddTask onTaskAdd={onTaskAdd} onError={(err) => setError(err?.message)} />
      </div>
    </div>
  );
};

export default ToDoList;
