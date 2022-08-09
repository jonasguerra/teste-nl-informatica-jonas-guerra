import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth/auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';


@Controller('auth')
@ApiTags('authentication')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @ApiResponse({ status: 200, type: TokenDto })
    @Post('login')
    async login(@Request() request, @Body() loginDto: LoginDto) {
        return this.authService.createToken(request.user);
    }
}