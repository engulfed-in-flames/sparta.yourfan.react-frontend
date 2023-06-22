export interface IMessage {
  message: string;
  user_nickname: string;
}

export interface IMe {
  pk: number;
  avatar: string;
  email: string;
  nickname: string;
  posts: number[];
  is_manager: boolean;
}

export interface IUser {
  pk: number;
  email: string;
  nickname: string;
  is_active: string;
}

export interface IChannel {
  channel_name: string;
  channel_id: string;
  subscriber: string;
  thumbnail: string;
}

export interface IBoard {
  pk: number;
  title: string;
  custom_url: string;
  rank: string;
  context: string;
  is_active: boolean;
  subscriber_count: number;
  banned_users: IUser[];
}

export interface IPost {
  id: number;
  user: IUser;
  title: string;
  content: string;
  bookmarked_by_count: number;
  created_at: string;
}

export interface IPostValues {
  // board === channel
  board: string;
  title: string;
  content: string;
}

export interface ILoginFormValues {
  email: string;
  password: string;
}

interface ISingupFormValues {
  email: string;
  password1: string;
  password2: string;
  nickname: string;
}

interface IUploadImageValues {
  file: File;
  uploadURL: string;
}

interface IUpdateMeFormValues {
  nickname?: string;
  avatar?: string;
}

// hooks
export interface IUseMeProps {
  isUserLoading: Boolean;
  user: IMe | null;
}
