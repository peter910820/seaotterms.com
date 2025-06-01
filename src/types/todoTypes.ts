interface TodoType {
  id: number;
  owner: string;
  topic: string;
  title: string;
  status: number;
  deadline: Date | null;
  createdAt: Date;
  createName: string;
  updatedAt: Date | null;
  updateName: string | null;
}

interface TodoTopicType {
  topicName: string;
  topicOwner: string;
  updatedAt: Date;
  updateName: string | null;
}

interface SystemTodoType {
  id: number;
  systemName: string;
  title: string;
  detail: string; // it may be an empty string
  status: number;
  deadline: Date | null;
  urgency: number;
  createdAt: Date;
  createdName: string;
  updatedAt: Date | null;
  updatedName: string | null;
}

export { TodoType, TodoTopicType, SystemTodoType };
