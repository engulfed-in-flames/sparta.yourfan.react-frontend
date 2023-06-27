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
  id: number;
  activity_rate: number;
  avg_comments: number;
  avg_likes: number;
  avg_views: number;
  channel: number;
  comment_per_view: number;
  latest25_comments: number;
  latest25_likes: number;
  latest25_views: number;
  like_per_view: number;
  participation_rate: number;
  rank: string;
  subscriber: number;
  total_view: number;
  video_count: number;
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
interface IReportValues {
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

interface ISingupFormValues {
  email: string;
  password1: string;
  password2: string;
  nickname?: string;
}

interface IUploadImageValues {
  file: File;
  uploadURL: string;
}

interface IUpdateMeFormFiedls {
  nickname?: string;
  avatar?: FileList;
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
