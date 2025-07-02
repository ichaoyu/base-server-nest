import { Injectable } from '@nestjs/common';
import { CreateDemoApiDto } from './dto/create-demo-api.dto';
import { UpdateDemoApiDto } from './dto/update-demo-api.dto';

@Injectable()
export class DemoApiService {
  create(createDemoApiDto: CreateDemoApiDto) {
    return 'This action adds a new demoApi';
  }

  findAll() {
    return `This action returns all demoApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} demoApi`;
  }

  update(id: number, updateDemoApiDto: UpdateDemoApiDto) {
    return `This action updates a #${id} demoApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} demoApi`;
  }
}
