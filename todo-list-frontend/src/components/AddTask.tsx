import { addTask } from 'lib/TaskRequests';
import Task from 'models/Task';
import React, { FC, useState } from 'react';

const AddTask: FC<{ onTaskAdd: (addedTask: Task) => void; onError: (err: Error) => void }> = ({ onTaskAdd, onError }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const onSubmit = async () => {
    try {
      const taskAdded = await addTask(taskTitle);
      onTaskAdd(taskAdded);
      setTaskTitle('');
    } catch (err: any) {
      onError(err);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (taskTitle.length > 0) {
        onSubmit();
      }
    }
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
      <textarea
        style={{ flexGrow: 1, height: 20, resize: 'none', padding: 10, fontFamily: 'inherit' }}
        draggable={false}
        onChange={(e) => setTaskTitle(e.target.value)}
        onKeyDown={(e) => onKeyDown(e)}
        value={taskTitle}
      />
      <button style={{ width: 70 }} onClick={onSubmit} disabled={taskTitle.length === 0}>
        Add
      </button>
    </div>
  );
};

export default AddTask;
