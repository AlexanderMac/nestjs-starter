import { Observable } from 'rxjs';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (!context.switchToHttp().getRequest().get('authorization')) {
      throw new UnauthorizedException('Token is not provided');
    }
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || info || !user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
