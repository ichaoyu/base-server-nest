import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
} from '@nestjs/common';
import { DemoApiService } from './demo-api.service';
import { CreateDemoApiDto } from './dto/create-demo-api.dto';
import { UpdateDemoApiDto } from './dto/update-demo-api.dto';

@Controller('demo-api')
export class DemoApiController {
	constructor(private readonly demoApiService: DemoApiService) {}

	@Post()
	create(@Body() createDemoApiDto: CreateDemoApiDto) {
		return this.demoApiService.create(createDemoApiDto);
	}

	@Get()
	findAll() {
		return this.demoApiService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.demoApiService.findOne(+id);
	}

	@Get('/query')
	getQuery(@Query('age') age: number, @Query('name') name: string): string {
		return `name: ${name}, age: ${age}`;
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateDemoApiDto: UpdateDemoApiDto) {
		return this.demoApiService.update(+id, updateDemoApiDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.demoApiService.remove(+id);
	}
}
