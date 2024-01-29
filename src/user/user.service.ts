// user.service.ts

import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(userData: any): Promise<any> {
    const { UserId, password, confirmPassword, ...otherData } = userData;

    // Check if user exists (case-insensitive)
    const existingUser = await this.userRepository.findOne({
      where: { UserId: UserId.toLowerCase() },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // User does not exist, create a new entry
    const newUser = this.userRepository.create({
      UserId: UserId.toLowerCase(),
      password,
      ...otherData,
    });

    const savedUser = await this.userRepository.save(newUser);

    return {
      header: { StatusCode: 200 },
      data: { userDetails: savedUser, errorDetails: null },
    };
  }

  async getUserDetailsByUserId(UserId: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { UserId: UserId.toLowerCase() },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      header: { StatusCode: 200 },
      data: { userDetails: user, errorDetails: null },
    };
  }
}
