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
  reports: number[];
  user_type: string;
  is_active: boolean;
  is_writer: boolean;
  is_manager: boolean;
  is_admin: boolean;
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
  subscriber: number;
  thumbnail: string;
}

export interface IInsight {
  id: number | string;
  activity_rate: string;
  avg_comments: string;
  avg_likes: string;
  avg_views: string;
  channel: number | string;
  comment_per_view: string;
  latest30_comments: number | string;
  latest30_likes: number | string;
  latest30_views: number | string;
  like_per_view: string;
  participation_rate: string;
  rank: string;
  subscriber: number | string;
  total_view: number | string;
  video_count: number | string;
  created_at: string;
  updated_at: string;
  [key: string]: any;
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
  user?: IUser;
  title: string;
  content: string;
  bookmarked_by_count: number;
  created_at: string;
}

export interface IReport {
  pk: number;
  user?: number;
  image_title?: string;
  image_url?: string;
  cloudflare_image_id?: string;
  title: string;
  content: string;
  created_at: string;
}

// Values
export interface IPostListValues {
  channel: string;
  page: number;
}

export interface IReportValues {
  pk?: number;
  image_title?: string;
  image_url?: string;
  cloudflare_image_id?: string;
  title: string;
  content: string;
}

export interface IPostValues {
  board: string;
  title: string;
  content: string;
}

export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface ISingupFormValues {
  email_id: string;
  password1: string;
  password2: string;
  nickname: string;
  phone_number: string;
  auth_number?: string;
}

export interface IUploadImageValues {
  file: File;
  uploadURL: string;
}

export interface IUpdateMeFormFiedls {
  nickname?: string;
  avatar?: FileList;
}

export interface IUpdateMeFormValues {
  nickname?: string;
  avatar?: string;
}

// hooks
export interface IUseMeProps {
  isUserLoading: Boolean;
  user: IMe | null;
}
