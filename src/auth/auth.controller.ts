import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { authService } from "src/auth/auth.service";
import { LocalAuthGuard } from "src/auth/guards/local-auth.guard";

@Controller('auth')

export class AuthController{

    constructor(private authService: authService){}
   
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req){
        return this.authService.login(req.user)
    }
}