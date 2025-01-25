import { TaskId, TaskStatus } from "models/Task";

const baseURL = 'http://localhost:8080';

export const fetchTasks = async () => {
  const url = `${baseURL}/todolist`;
  const response = await fetch(url);
  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return responseJson;
};

export const addTask = async (taskTitle: string) => {
  const url = `${baseURL}/todolist`;
  const response = await fetch(url, {
    method: 'POST',
    body: taskTitle,
  });
  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error('Failed to add');
  }
  return responseJson;
};

export const updateTaskStatus = async (taskId: TaskId, taskStatus: TaskStatus) => {
  const url = `${baseURL}/todolist/tasks/${taskId}/update-status`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskStatus),
  });
  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error('Failed to update');
  }
  return responseJson;
};

export const deleteTask = async (taskId: TaskId) => {
  const url = `${baseURL}/todolist/tasks/${taskId}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete');
  }
};
