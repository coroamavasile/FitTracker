export interface ILoginRequestDto {
  email: string;
  password: string;
}

export interface IRegisterRequestDto extends ILoginRequestDto {
  name: string;
}
