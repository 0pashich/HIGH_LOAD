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
    MongooseModule.forRoot('mongodb://localhost:27017/news'),
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule { }
