// import { Body, CacheInterceptor, Controller, Get, Header, Post, UseInterceptors } from '@nestjs/common';

// import { IsNotEmpty } from 'class-validator';

// export class CreateNewsDto {
//   @IsNotEmpty()
//   title: string;

//   @IsNotEmpty()
//   description: string;
// }

// @Controller('news')
// @UseInterceptors(CacheInterceptor)
// export class NewsController {
//   @Get()
//   async getNews() {
//     return new Promise(resolve => {
//       const news = Object.keys([...Array(20)])
//         .map(key => Number(key) + 1)
//         .map(n => ({
//           id: n,
//           title: `Важная новость ${n}`,
//           description: (rand => ([...Array(rand(1000))].map(() => rand(10 ** 16).toString(36).substring(rand(10))).join(' ')))(max => Math.ceil(Math.random() * max)),
//           createdAt: Date.now()
//         }))

//       setTimeout(() => {
//         resolve(news);
//       }, 100)
//     });
//   }

//   @Post()
//   @Header('Cache-Control', 'none')
//   create(@Body() peaceOfNews: CreateNewsDto) {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         console.log('Новость успешно создана', peaceOfNews);
//         resolve({ id: Math.ceil(Math.random() * 1000), ...peaceOfNews });
//       }, 100)
//     });
//   }
// }


import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { News } from "./schemas/news.schema";
import { NewsService } from "./news.service";

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Post()
  async createNews(@Res() response, @Body() news: News) {
    const newNews = await this.newsService.create(news);
    return response.status(HttpStatus.CREATED).json({
      newNews
    })
  }

  @Get()
  async fetchAll(@Res() response) {
    const news = await this.newsService.readAll();
    return response.status(HttpStatus.OK).json({
      news
    })
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const news = await this.newsService.readById(id);
    return response.status(HttpStatus.OK).json({
      news
    })
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id, @Body() news: News) {
    const updatedNews = await this.newsService.update(id, news);
    return response.status(HttpStatus.OK).json({
      updatedNews
    })
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedNews = await this.newsService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedNews
    })
  }
}