import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRole } from './user-roles.enum';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository:UserRepository
  ) { }

  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new UnprocessableEntityException('Password not match confirmation password');
    }
    return this.userRepository.createUser(createUserDto, UserRole.ADMIN);
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}
