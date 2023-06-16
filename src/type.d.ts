// community

interface IBoard {
  pk: number;
  name: string;
  rank: string;
  context: string;
  is_active: boolean;
}
interface ICreateForumFormValues {
  channelHandle: string;
}
interface IPostValues {
  // board === channel
  board: string;
  title: string;
  content: string;
}

// users
export interface IMe {
  pk: number;
  avatar: string;
  email: string;
  nickname: string;
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

// hooks
export interface IUseMeProps {
  isUserLoading: Boolean;
  user: IMe | null;
}
