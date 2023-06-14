export interface IMe {
  pk: number;
  avatar: string;
  email: string;
  nickname: string;
}

// users
export interface ILoginValues {
  email: string;
  password: string;
}

interface ISingupFormValues {
  email: string;
  password1: string;
  password2: string;
  nickname: string;
}

interface ICreateForumFormValues {
  channelHandle: string;
}

// hooks
export interface IUseMeProps {
  isUserLoading: Boolean;
  user: IMe | null;
}
