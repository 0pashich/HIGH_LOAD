import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { News, NewsSchema } from './schemas/news.schema';

@Module({
  imports: [
    CacheModule.register({
      ttl: 10, // seconds
      max: 10, // maximum number of items in cache
    }),
    MongooseModule.forFeature([{ name: 'News', schema: NewsSchema }]),],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule { }
