import { deleteTask, updateTaskStatus } from 'lib/TaskRequests';
import Task, { TaskStatus } from 'models/Task';
import { FC } from 'react';
import { FaCheckCircle, FaRegCircle, FaTimes } from 'react-icons/fa';
import { ColorRing } from 'react-loader-spinner';

const styles = {
  taskCard: {
    display: 'flex',
    alignItems: 'center',
    background: '#ffffff',
    justifyContent: 'space-between',
    border: '1px solid #cbcbcb',
    borderRadius: 10,
    padding: 10,
  },
  icon: {
    fontSize: 20,
     marginTop: 5, 
     cursor: 'pointer' ,
  }
};

const TaskIncompleteIcon = () => <FaRegCircle style={styles.icon} />;
const TaskCompleteIcon = () => <FaCheckCircle style={{ ...styles.icon, color: 'green' }} />;

const TaskCard: FC<{
  task: Task;
  onTaskStatusToggle: (updatedTask: Task) => void;
  onTaskDelete: (deletedTask: Task) => void;
  onError: (err: Error) => void;
}> = ({ task, onTaskStatusToggle, onTaskDelete, onError }) => {
  const icon = task.status === TaskStatus.NOT_DONE ? <TaskIncompleteIcon /> : <TaskCompleteIcon />;

  const handleTaskStatusToggle = () => {
    onTaskStatusToggle(task);
    updateTaskStatus(task.id, task.status === TaskStatus.NOT_DONE ? TaskStatus.DONE : TaskStatus.NOT_DONE).catch(onError);
  };
  const handleTaskDelete = () => {
    onTaskDelete(task);
    deleteTask(task.id).catch(onError);
  };

  return (
    <div style={styles.taskCard}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span role="button" tabIndex={0} onClick={handleTaskStatusToggle}>
          {icon}
        </span>
        <div>{task.title}</div>
      </div>
      <span role="button" tabIndex={0} onClick={handleTaskDelete}>
        <FaTimes style={{ ...styles.icon, color: '#ba0000' }} />
      </span>
    </div>
  );
};

const TaskCards: FC<{
  loading: boolean;
  error: string;
  tasks: Task[];
  onTaskStatusToggle: (updatedTask: Task) => void;
  onTaskDelete: (deletedTask: Task) => void;
  onError: (err: Error) => void;
}> = ({ loading, error, tasks, onTaskStatusToggle, onTaskDelete, onError }) => {
  if (loading) {
    return <ColorRing width={20} height={20} />;
  }
  if (error) {
    return <span style={{ color: 'red' }}>{error} - Please refresh to see the latest data</span>;
  }
  if (tasks.length === 0) {
    return <span style={{ fontStyle: 'italic', paddingLeft: 10 }}>Add a task to get started</span>;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onTaskStatusToggle={onTaskStatusToggle} onTaskDelete={onTaskDelete} onError={onError} />
      ))}
    </div>
  );
};

export default TaskCards;
