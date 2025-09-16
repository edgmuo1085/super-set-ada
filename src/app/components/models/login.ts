export interface Login {
  username: string;
  password: string;
}

export class LoginModel implements Login {
  constructor(public username: string, public password: string) {}
}
