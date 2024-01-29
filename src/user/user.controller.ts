// user.controller.ts

import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() userData: any): Promise<any> {
    try {
      const result = await this.userService.signUp(userData);
      return result;
    } catch (error) {
      return {
        header: { StatusCode: 500 },
        data: { userDetails: null, errorDetails: error.message },
      };
    }
  }

  @Get(':UserId')
  async getUserDetails(@Param('UserId') UserId: string): Promise<any> {
    try {
      const result = await this.userService.getUserDetailsByUserId(UserId);
      return result;
    } catch (error) {
      return {
        header: { StatusCode: 500 },
        data: { userDetails: null, errorDetails: error.message },
      };
    }
  }
}
