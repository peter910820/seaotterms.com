// @/types/FormTypes
export interface FormTodo {
  owner: string;
  topic: string;
  title: string;
  status: number;
  deadline: Date | null;
  createName: string;
  updateName: string;
}

export interface TodoTopic {
  topicName: string;
  topicOwner: string;
  updatedAt: Date;
  updateName: string;
}
