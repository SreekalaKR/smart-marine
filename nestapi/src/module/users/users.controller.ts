import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { usersService } from './users.service';

@Controller('users')
export class usersController {

    constructor(private readonly usersService: usersService) { }

    @Post('login')
    async login(@Body() body: { Username: string; Password: string }) {
        const user = await this.usersService.findByUsernameAndPassword(body.Username, body.Password);

        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return { message: 'Login successful' };
    }
}