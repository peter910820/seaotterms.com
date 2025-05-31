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

export interface SystemTodoForm {
  systemName: string;
  title: string;
  detail: string;
  status: number;
  deadline: string | null; // 為了後續處理所以這邊定義是string
  urgency: number;
  createdName: string;
}
