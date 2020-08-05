import { Controller, Body, ValidationPipe, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { User } from 'src/users/user.entity';
import { CredentialsDto } from './dtos/credentials.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) createUserDto:CreateUserDto): Promise<{ message: string }> {
    await this.authService.signUp(createUserDto);
    return {
      message: 'New user registered'
    };
  }

  @Post('/signin')
  async signIn(@Body(ValidationPipe) credentialsDto:CredentialsDto): Promise<{ token: string }> {
    return await this.authService.singIn(credentialsDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  getMe(@Req() req): User {
    return req.user;
  }
}
