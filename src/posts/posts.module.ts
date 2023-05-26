import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { User } from 'src/user/user.entity';
import { Mark } from './mark.entity';
import { Model } from './model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, User, Mark, Model])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule { }
