export type TaskType = {
  _id: string;
  project_id: string;
  user_id: string;
  text: string;
  date: Date;
  done: boolean;
  hierarchy: number;
  updatedAt: Date;
};
