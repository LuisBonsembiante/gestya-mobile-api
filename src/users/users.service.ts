import {Injectable} from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {}

    async findOne(username: string, password: string): Promise<User | undefined> {

         return {username, password};
    }

}
