import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { IS_OPTIONAL_AUTH_KEY } from 'src/common/decorators/optional-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const handler = context.getHandler();
    const controller = context.getClass();

    // 1. Allow Public Routes
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [handler, controller],
    );

    if (isPublic) {
      this.logger.debug('Public route — skipping role validation');
      return true;
    }

    // 2. Get required roles
    const requiredRoles =
      this.reflector.getAllAndOverride<number[]>(ROLES_KEY, [
        handler,
        controller,
      ]);

    // If no roles defined → allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 3. Optional auth support
    const isOptionalAuth = this.reflector.getAllAndOverride<boolean>(
      IS_OPTIONAL_AUTH_KEY,
      [handler, controller],
    );

    if (!user) {
      if (isOptionalAuth) {
        this.logger.warn(
          'Optional auth route — no user found, skipping role validation',
        );
        return true;
      }

      throw new ForbiddenException('User not authenticated');
    }

    //  4. Super Admin Bypass (Enterprise Pattern)
    // Assume role 1 = Super Admin (customize as needed)
    const SUPER_ADMIN_ROLE = 1;

    if (Number(user.role) === SUPER_ADMIN_ROLE) {
      this.logger.debug('Super Admin access granted');
      return true;
    }

    // 5. Support single or multiple user roles
    const userRoles = Array.isArray(user.role)
      ? user.role.map((r:any) => Number(r))
      : [Number(user.role)];

    const hasRole = requiredRoles.some((role) =>
      userRoles.includes(Number(role)),
    );

    if (!hasRole) {
      this.logger.warn(
        `Access denied. Required: ${requiredRoles}, User: ${userRoles}`,
      );
      throw new ForbiddenException('Access denied');
    }

    this.logger.debug('Role validation passed');
    return true;
  }
}