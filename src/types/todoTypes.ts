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

export { TodoType, TodoTopicType };
