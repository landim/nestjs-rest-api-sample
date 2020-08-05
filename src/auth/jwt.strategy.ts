import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "src/users/users.repository";
import { User } from '../users/user.entity';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ecwo',
    });
  }

  async validate(payload: { id: number }): Promise<User> {
    const { id } = payload;
    const user = await this.userRepository.findOne(id, {
      select: [ 'name', 'email', 'status', 'role']
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}