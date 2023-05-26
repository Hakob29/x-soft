import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mark } from './mark.entity';
import { Repository, UpdateResult } from 'typeorm';
import { MarkResponseInterface } from './response/mark-response.interface';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';


export class PostsService extends TypeOrmQueryService<Mark> {

    constructor(
        @InjectRepository(Mark)
        private readonly markRepo: Repository<Mark>
    ) {
        super(markRepo, { useSoftDelete: true })

    }


    //ADD NEW MARK
    async addNewMark(name: string): Promise<MarkResponseInterface> {
        try {
            const newMark = await this.markRepo.create({ name: name });
            await this.markRepo.save(newMark);
            const existedMark = await this.markRepo.findOne({ where: { name: name }, relations: ["model"] })
            return {
                mark: {
                    name: existedMark.name,
                    models: existedMark.model
                }
            }
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    //GET ALL MARKS
    async getAllMarks(): Promise<MarkResponseInterface[]> {
        try {
            const marks = await this.markRepo.find({ relations: ["model"] });
            return marks.map((mark) => {
                return {
                    mark: {
                        name: mark.name,
                        models: mark.model
                    }
                }
            })
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);

        }
    }

    //DELETE MARK 
    async deleteMark(name: string): Promise<UpdateResult> {
        try {
            const mark = await this.markRepo.findOne({ where: { name: name } });
            return await this.markRepo.softDelete(mark.id);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    //RESTORE MARK
    async restoreMark(name: string): Promise<MarkResponseInterface> {
        try {
            const deletedMark = await this.markRepo.createQueryBuilder("mark")
                .withDeleted()
                .leftJoinAndSelect('mark.model', 'model')
                .where(`mark.deletedAt IS NOT NULL`)
                .andWhere("mark.name like :name", { name: `%${name}%` })
                .getOne();

            await this.markRepo.restore(deletedMark.id);
            const mark = await this.markRepo.findOne({ where: { id: deletedMark.id }, relations: ["model"] });
            return {
                mark: {
                    name: mark.name,
                    models: mark.model
                }
            }
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
