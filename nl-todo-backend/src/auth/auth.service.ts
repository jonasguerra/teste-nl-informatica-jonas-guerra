import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersService.retriveUserByEmail(email);
        const passwordAreEqual = await bcrypt.compare(password, user?.password ?? '');
        if (user && passwordAreEqual)
            return user;
        return null;
    }

    async createToken(user: User) {
        const payload = {
            email: user.email,
            userId: user.id
        };

        return new TokenDto({access_token: this.jwtService.sign(payload)});
    }

    async verifyJwt(jwt: string): Promise<User> {
        const decodedToken = await this.jwtService.verifyAsync(jwt);
        return this.usersService.findById(decodedToken?.userId)
    }
}
