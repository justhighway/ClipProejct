import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { User } from './user.entity';
import { GetUser } from 'src/@common/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('members')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  signup(@Body(ValidationPipe) authDto: AuthDto) {
    return this.authService.signup(authDto);
  }

  @Post('/sign-in')
  signin(@Body(ValidationPipe) authDto: AuthDto) {
    return this.authService.signin(authDto);
  }

  @Get('/refresh')
  @UseGuards(AuthGuard())
  refreshToken(@GetUser() user: User) {
    return this.authService.refreshToken(user);
  }
}
