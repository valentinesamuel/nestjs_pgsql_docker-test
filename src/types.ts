export interface IComment {
  id?: string;
  text: string;
  user: IUser;
  topic: ITopic;
}

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
  comments: IComment[];
}

export interface ITopic {
  id?: string;
  title: string;
  description: string;
  comments: IComment[];
}
