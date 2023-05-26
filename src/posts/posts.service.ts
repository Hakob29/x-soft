import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mark } from './mark.entity';
import { Repository, UpdateResult } from 'typeorm';
import { MarkResponseInterface } from './response/mark-response.interface';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { AddModelDto } from './dto/add-models.dto';
import { Model } from './model.entity';
import { ModelResponseInterface } from './response/model-response.interface';
import { UpdateModelDto } from './dto/update-model.dto';


export class PostsService extends TypeOrmQueryService<Mark> {

    constructor(
        @InjectRepository(Mark)
        private readonly markRepo: Repository<Mark>,
        @InjectRepository(Model)
        private readonly modelRepo: Repository<Model>
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
            const mark = await this.markRepo.findOne({ where: { name: name }, relations: ["model"] });
            mark.model.forEach(async (m) => await this.modelRepo.softDelete(m.id))
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

            deletedMark.model.forEach(async (m) => await this.modelRepo.restore(m.id));
            await this.markRepo.restore(deletedMark.id);
            const mark = await this.markRepo.findOne({ where: { id: deletedMark.id }, relations: ["model"] });

            return {
                mark: {
                    name: mark.name,
                    models: mark.model.map((m) => m)
                }
            }
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    //ADD NEW MODEL 
    async addNewModels(dto: AddModelDto): Promise<ModelResponseInterface> {
        try {
            const mark = await this.markRepo.findOne({ where: { name: dto.mark }, relations: ["model"] })
            const newModel = await this.modelRepo.create({
                ...dto,
                mark: mark
            });
            await this.modelRepo.save(newModel);
            return {
                model: {
                    name: newModel.name,
                    price: newModel.price,
                    year: newModel.year,
                    engine: newModel.engine,
                    color: newModel.color,
                    mark: mark.name
                }
            }

        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);

        }
    }

    //GET MODEL BY NAME
    async getModel(name: string): Promise<ModelResponseInterface[]> {
        try {
            const model = await this.modelRepo
                .createQueryBuilder("model")
                .leftJoinAndSelect('model.mark', 'mark')
                .where("model.name like :name", { name: `%${name}%` })
                .getMany();

            return model.map((m) => {
                return {
                    model: {
                        name: m.name,
                        price: m.price,
                        year: m.year,
                        engine: m.engine,
                        color: m.color,
                        mark: m.mark.name
                    }
                }
            })
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.NOT_FOUND)
        }
    }

    //UPDATE MODEL
    async updateModel(dto: UpdateModelDto, id: number): Promise<ModelResponseInterface> {
        try {
            const model = await this.modelRepo.findOne({ where: { id: id }, relations: ['mark'] });
            await this.modelRepo.update(model.id, {
                ...dto,
                mark: model.mark
            })

            return {
                model: {
                    name: model.name,
                    price: model.price,
                    year: model.year,
                    engine: model.engine,
                    color: model.color,
                    mark: model.mark.name
                }
            }
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    //DELETE MODEL
    async deleteModel(id: number): Promise<UpdateResult> {
        try {
            const model = await this.modelRepo.findOne({ where: { id: id } });
            return await this.modelRepo.softDelete(model.id);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }


    //RESTROE DELETED MODEL
    async restoreModel(id: number): Promise<ModelResponseInterface> {
        try {
            const deletedModel = await this.modelRepo.findOne({ where: { id: id }, withDeleted: true, relations: ['mark'] });
            await this.modelRepo.restore(deletedModel.id);
            return {
                model: {
                    name: deletedModel.name,
                    price: deletedModel.price,
                    year: deletedModel.year,
                    engine: deletedModel.engine,
                    color: deletedModel.color,
                    mark: deletedModel.mark.name
                }
            }
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
