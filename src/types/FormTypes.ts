// @/types/FormTypes
export interface FormTodo {
  owner: string;
  topic: string;
  title: string;
  status: number;
  deadline: Date | null;
  createdAt: Date;
  createName: string;
  updatedAt: Date;
  updateName: string;
}
