import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import admin = require('firebase-admin');

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorization = request.headers['authorization'];
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.substring(7, authorization.length);

      request.user = await admin.auth().verifyIdToken(token);
      return !!request.user;
    }
    return false;
  }
}
