import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Posts } from 'src/posts/posts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Posts])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
