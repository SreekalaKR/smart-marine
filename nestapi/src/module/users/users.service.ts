import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { users } from './users.entity';

@Injectable()
export class usersService {

    constructor(
        @InjectRepository(users)
        private usersRepository: Repository<users>,) { }



    async findByUsernameAndPassword(Username: string, Password: string): Promise<users | undefined> {
        const user = await this.usersRepository.findOne({ where: { Username, Password } });
        return user;
    }
}


