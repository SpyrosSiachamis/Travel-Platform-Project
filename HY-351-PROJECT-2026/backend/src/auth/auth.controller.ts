import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { user } from "./auth.model";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async authenticateUser(@Body() user: user) {
        return this.authService.authenticateUser(user);
    }
}