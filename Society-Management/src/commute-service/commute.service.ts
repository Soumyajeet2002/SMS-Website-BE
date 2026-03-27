import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class CommuteService {
  constructor(private readonly http: HttpService) {}

  /**
   * Fetch user profile from Identity service
   */
  async getUserProfile(req: Request, userId?: string) {
    try {
      const response = await firstValueFrom(
        this.http.get(
          `${process.env.IDENTITY_SERVICE_URL}users`,
          {
            headers: {
              Authorization: req.headers['authorization'], // forward JWT
              'x-internal-call': 'true',
            },
          },
        ),
      );

      return response.data;
    } catch (err) {
      throw new InternalServerErrorException('Failed to fetch user profile');
    }
  }
}
