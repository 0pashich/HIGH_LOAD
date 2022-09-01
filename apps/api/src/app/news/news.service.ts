// import { Model } from 'mongoose';
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { News, NewsDocument } from './schemas/news.schema';
// import { CreateNewsDto } from './dto/create-news.dto';
// @Injectable()
// export class NewsService {
//   constructor(@InjectModel(News.name) private newsModel: Model<NewsDocument>) { }
//   async create(createNewsDto: CreateNewsDto): Promise<News> {
//     const createdNews = new this.newsModel(createNewsDto);
//     return createdNews.save();
//   }
//   async findAll(): Promise<News[]> {
//     return this.newsModel.find().exec();
//   }
// }

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { News, NewsDocument } from "./schemas/news.schema";

@Injectable()
export class NewsService {

  constructor(@InjectModel(News.name) private newsModel: Model<NewsDocument>) { }

  async create(news: News): Promise<News> {
    news.createdAt = new Date();
    const newNews = new this.newsModel(news);
    return newNews.save();
  }

  async readAll(): Promise<News[]> {
    return await this.newsModel.find().exec();
  }

  async readById(id): Promise<News> {
    return await this.newsModel.findById(id).exec();
  }

  async update(id, news: News): Promise<News> {
    return await this.newsModel.findByIdAndUpdate(id, news, { new: true })
  }

  async delete(id): Promise<any> {
    return await this.newsModel.findByIdAndRemove(id);
  }
}

