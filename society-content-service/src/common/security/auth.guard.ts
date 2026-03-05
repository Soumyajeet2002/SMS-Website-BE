import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AppAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException();
    }

    /**
     *  CENTRALIZED AUTHORIZATION RULES
     * keep it SIMPLE
     */

    // Example 1: admin-only write operations
    // if (
    //   ['POST', 'PUT', 'DELETE'].includes(req.method) &&
    //   user.role !== 'ADMIN' &&
    //   user.role !== 'SUPER_ADMIN'
    // ) {
    //   throw new ForbiddenException('Insufficient role');
    // }

    // Example 2: society ownership check (if route has societyId)
    // const societyId =
    //   req.params?.societyId || req.body?.societyId || req.query?.societyId;

    // if (societyId && user.role !== 'SUPER_ADMIN') {
    //   if (user.societyId !== societyId) {
    //     throw new ForbiddenException('Cross-society access denied');
    //   }
    // }

    return true;
  }
}
