import { CacheModule, Module } from '@nestjs/common';
import { NewsController } from './news.controller';

@Module({
  imports: [CacheModule.register({
    ttl: 10, // seconds
    max: 10, // maximum number of items in cache
  })],
  controllers: [NewsController],
})
export class NewsModule { }
