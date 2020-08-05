import { IsNotEmpty } from "class-validator";

export class CredentialsDto {
  @IsNotEmpty({
    message: 'Missing `email` attribute'
  })
  email: string;

  @IsNotEmpty({
    message: 'Missing `password` attribute'
  })
  password: string;
}