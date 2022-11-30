import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Universe } from 'src/universe/universe.entity';
import { HeroDto } from './hero.dto';
import { HeroService } from './hero.service';

@Controller('hero')
export class HeroController {
  constructor(private heroService: HeroService) { }

  @Get()
  async getAllHeroes() {
    const heroes = await this.heroService.findAll();
    return heroes;
  }

  @Post()
  async createOne(@Body() hero: HeroDto) {
    const heroes = await this.heroService.createOne(hero);
    return heroes;
  }

  @Put()
  async updateOne(@Body() hero1: HeroDto) {
    const hero = await this.heroService.updateOne(hero1);
    return hero;
  }
}