import { Controller, Post, Body } from '@nestjs/common';
import { Observable } from 'rxjs';

import { AuthService } from 'src/auth/auth.service';
import { CredentialsDto, SigninResult } from 'src/auth/models';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signin(@Body() credentials: CredentialsDto): Observable<SigninResult> {
    return this.authService.signin(credentials);
  }
}
