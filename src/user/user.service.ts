import { Injectable, NotFoundException } from '@nestjs/common';
import {LoggerService } from './user.logger.js'
import { CreateUserDto } from './dto/create-user.dto.js'
import { UpdateUserDto } from './dto/update-user.dto.js'

export interface User {
    id: number,
    name: string,
    email: string
}

@Injectable()
export class UserService {
    constructor(private readonly logger: LoggerService){}
    private users: User [] = [
        {id: 1, name: 'John Doe', email: 'hhh@ddd.com'},
        {id: 123, name: 'Adrian', email: 'jjj@jjj.com'}
    ];

    findAllUsers(name:string =''){
        this.logger.log('Finding all user');
        return this.users.filter((user) => user.name.toLowerCase().includes(name.toLowerCase()))
    }

    findOneUser(id:number){
        this.logger.log('Finding One User');
        const user = this.users.find((user) => user.id === id);
        if (!user){
            throw new NotFoundException("User not Found")
        }
        return user;
    }

    createUser(dto: CreateUserDto){
        this.logger.log('Creating new user');
        const newUser: User = {id: this.users.length+1, ...dto};
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id:number, dto:UpdateUserDto){
        this.logger.log('Update existing user');
        const index = this.users.findIndex((user) => user.id === id);
        if(index === 1) return null;
        this.users[index] = {...this.users[index], ...dto};
        return this.users[index];
    }

    deleteUser(id: number){
        this.logger.log('Update existing user');
        const index = this.users.findIndex((user) => user.id === id);
        if(index === 1) return null;
        const [deleted] = this.users.splice(index, 1)
        return deleted;
    }
}
