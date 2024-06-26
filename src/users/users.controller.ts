import { Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SerializeInterceptor, Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService){}
    
    @Post('/signup')
    createUser(@Body() body: createUserDto){
        this.userService.create(body.email, body.password);
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    @Serialize(UserDto)
    @Get(':/id')
    async findUser(@Param('id') id: string){
        console.log('Handler is running');
        const user = await this.userService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException('User not found');
        }
        return this.userService.findOne(parseInt(id));
    }

    @Get()
    findAllUsers(@Query('email') email: string){
        return this.userService.find(email);
    }

    @Delete('/"id')
    removeUser(@Param('id') id: string){
        return this.userService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
        return this.userService.update(parseInt(id), body);
    }
}