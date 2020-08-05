import { Injectable, UnprocessableEntityException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { User } from 'src/users/user.entity';
import { UserRole } from '../users/user-roles.enum';
import { CredentialsDto } from './dtos/credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository,
    private jwtService: JwtService,
    ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new UnprocessableEntityException('Password not match confirmation password');
    }
    return this.userRepository.createUser(createUserDto, UserRole.USER);
  }

  async singIn(credentialsDto: CredentialsDto): Promise<{ token: string }> {
    const user = await this.userRepository.checkCredentials(credentialsDto);
    if (user === null) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const jwtPayload = {
      id: user.id,
    };

    const token = await this.jwtService.sign(jwtPayload);
    return { token };
  }
}
