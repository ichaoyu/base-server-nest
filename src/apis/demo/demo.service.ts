import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DemoEntity } from '@/entities';

import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';

@Injectable()
export class DemoService {
  constructor(
    @InjectRepository(DemoEntity)
    private demoModel: Repository<DemoEntity>,
  ) {}
  create(createDemoDto: CreateDemoDto) {
    return 'This action adds a new demo';
  }

  async findAll() {
    // return `This action returns all demo`;
    return this.demoModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} demo`;
  }

  update(id: number, updateDemoDto: UpdateDemoDto) {
    return `This action updates a #${id} demo`;
  }

  remove(id: number) {
    return `This action removes a #${id} demo`;
  }
}
