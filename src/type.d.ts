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
js;

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
