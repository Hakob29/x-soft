import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';


@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService
    ) { }

}
