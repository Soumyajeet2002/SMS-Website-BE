import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../decorators/public.decorator';
import { IS_OPTIONAL_AUTH_KEY } from '../../decorators/optional-auth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const isOptionalAuth = this.reflector.getAllAndOverride<boolean>(
      IS_OPTIONAL_AUTH_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      this.logger.debug('Public route accessed — skipping JWT validation');
      return true;
    }

    if (isOptionalAuth) {
      this.logger.debug('Optional auth route — validating if token exists');
      return super.canActivate(context);
    }

    this.logger.debug('Protected route — JWT validation required');
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const isOptionalAuth = this.reflector.getAllAndOverride<boolean>(
      IS_OPTIONAL_AUTH_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (err) {
      this.logger.error(` Auth error: ${err.message}`);
      throw err;
    }

    if (!user) {
      if (isOptionalAuth) {
        this.logger.warn(' Optional auth route — no user attached');
        return null;
      }

      this.logger.error(
        ` Authentication failed: ${info?.message || 'Unknown reason'}`,
      );
      throw new UnauthorizedException('Invalid or missing token');
    }

    this.logger.debug(` Authenticated user ID: ${user?.userId}`);
    return user;
  }
}
