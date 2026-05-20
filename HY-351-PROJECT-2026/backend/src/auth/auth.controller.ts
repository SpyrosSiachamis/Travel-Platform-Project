import { Controller, Get, Post, Body, Param, UnauthorizedException, Session } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthUser, user } from "./auth.model";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async authenticateUser(@Body() userData: user, @Session() session: Record<string, any>) {
        const user: AuthUser = await this.authService.authenticateUser(userData);
        console.log(user);
        if (!user) {
            throw new UnauthorizedException('Invalid User Credentials');
        }
        const userSession: AuthUser = {
            user_id: user.user_id,
            username: user.username,
            role: user.role
        }
        session.user = userSession;
        return {
            message: "Login completed",
            user: session.user
        };
    };
}