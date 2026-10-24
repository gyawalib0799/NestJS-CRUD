import { Controller, Get, Query, Param, Post, Body, Put, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserService } from './user.service.js';
import { RoleGuard } from '../guards/role.guard.js';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    @Get()
    getUsers(@Query('name') name : string){
        return this.userService.findAllUsers(name);
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id : number){
        return this.userService.findOneUser(id);
    }

    @Post()
    createUser(@Body() createUserDto : CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    @Put(':id')
    updateUser(@Param('id') id : string, @Body() updateUserDto : UpdateUserDto){
        return this.userService.updateUser(Number(id), updateUserDto)
    }

    @Delete(':id')
    @UseGuards(RoleGuard)
    deleteUser(@Param('id') id : string){
        return this.userService.deleteUser(Number(id))
    }

}
