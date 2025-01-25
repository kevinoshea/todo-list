
export enum TaskStatus {
  NOT_DONE = 'NOT_DONE',
  DONE = 'DONE',
}

export type TaskId = string;

interface Task {
  id: TaskId;
  title: string;
  status: TaskStatus;
  createdAt: Date;
}

export default Task;
