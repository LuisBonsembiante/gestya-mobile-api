import {
    Body,
    Controller,
    Get,
    Header,
    HttpCode,
    HttpException,
    HttpStatus,
    Post,
    Request,
    Res,
    Response,
    Session,
    SetMetadata,
    UseGuards,
} from '@nestjs/common';
import {Auth} from '../dtos/aut.dto';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth.service';
import {tryCatch} from 'rxjs/internal-compatibility';

export const Public = () => SetMetadata( 'isPublic', true );

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    @Header('Authorization', '')
    @Post('login')
    async login(@Body() authDto: Auth, @Request() req, @Response() res, @Session() session) {
        try {
            const user = await this.authService.login(req.user);
            return res.header('Authorization', user.access_token).send({username: user.username});
        } catch (e) {
            throw new HttpException('Usuario o cantraeña inválidas', HttpStatus.UNAUTHORIZED);
        }

    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }
}
