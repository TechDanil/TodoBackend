interface IUser {
    id: string;
    name: string;
    lastName: string;
    patronymic: string;
    login: string;
    password: string;
    supervisor?: IUser | null;
}
  
export { IUser };
  