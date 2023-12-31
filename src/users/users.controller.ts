import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
    Param,
    Query,
    Delete,
    NotFoundException,
    Session,
    // UseInterceptors,
    UseGuards
} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Serialize(UserDto)
@Controller('auth')
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService) { }

    // @Get('/whoami')
    // whoAmI(@Session() session: any) {
    //     return this.usersService.findOne(session.userId)
    // }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User) {
        return user;
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @Post('/signup')
    async createUser(@Body() body: createUserDto, @Session() session: any) {
        console.log('sign upbody', body);
        // this.usersService.create(body.email, body.password)
        const user = await this.authService.signup(body.email, body.password)
        session.userId = user.id;
        return user
    }

    @Post('/signin')
    async signin(@Body() body: createUserDto, @Session() session: any) {
        console.log('sign in body', body);
        // this.usersService.create(body.email, body.password)
        const user = this.authService.signin(body.email, body.password);
        session.userId = (await user).id;
        return user;
    }

    // @Get('/colors/:color')
    // setColor(@Param('color') color: string, @Session() session: any) {
    //     session.color = color;
    // }

    // @Get('/colors')
    // getColor(@Session() session: any) {
    //     return session.color;
    // }

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        console.log('handler is running in controller');
        const user = await this.usersService.findOne(parseInt(id))
        if (!user) {
            throw new NotFoundException
        }
        return user
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email)
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id))
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body)
    }
}
