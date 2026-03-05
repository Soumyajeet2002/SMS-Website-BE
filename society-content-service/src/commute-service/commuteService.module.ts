import { HttpModule } from '@nestjs/axios';
import { Module} from '@nestjs/common';
import { CommuteService } from './commute.service';

@Module({
  imports: [HttpModule],
  providers: [CommuteService],
  exports: [CommuteService],
})
export class CommuteModule {}
