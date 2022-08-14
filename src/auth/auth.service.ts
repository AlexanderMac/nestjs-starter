import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable, of } from 'rxjs';

import { CredentialsDto, DefUser, JWTPayload, SigninResult } from 'src/auth/models';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService, private jwtService: JwtService) {}

  signin(credentials: CredentialsDto): Observable<SigninResult> {
    const defUser = this.configService.get<DefUser>('defUser');

    if (credentials.username == defUser.username && credentials.password === defUser.password) {
      const payload: JWTPayload = {
        userId: defUser.userId,
        username: defUser.username,
      };
      return of({
        accessToken: this.jwtService.sign(payload),
      });
    }

    throw new ForbiddenException('Incorrect username and/or password');
  }
}
