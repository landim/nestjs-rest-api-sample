import {
  IsNotEmpty,
  IsEmail,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Missing `email` attribute'
  })
  @IsEmail(
    {},
    {
      message:'Invalid email format'
    }
  )
  @MaxLength(200,
    {
      message: 'Email too long. Max length: 200'
    }
  )
  email: string;

  @IsNotEmpty({
    message: 'Missing `name` attribute'
  })
  @MaxLength(200,
    {
      message: 'Name too long. Max length: 200'
    }
  )
  name: string;

  @IsNotEmpty({
    message: 'Missing `password` attribute'
  })
  @MinLength(6,
    {
      message: 'Password must have at least 6 chars'
    })
  password: string;
  confirmPassword: string;
}