import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return { message: 'Hello SMS Contect service..' };
  }

  commuteService(): any {
    try {
    } catch (err) {}
  }
}
