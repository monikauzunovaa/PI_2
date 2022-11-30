import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HeroDto } from './hero.dto';
import { Hero } from './hero.entity';

@Injectable()
export class HeroService {
  constructor(
    @Inject('HERO_REPOSITORY')
    private heroRepository: Repository<Hero>,
  ) { }
  public async findAll(): Promise<Hero[]> {
    return this.heroRepository.find(
      { relations: ['powers', 'universe'] }
    );
  }

  public async createOne(hero: HeroDto): Promise<Hero> {
    let createdHero = await this.heroRepository.save(hero);

    createdHero = await this.heroRepository.findOne({
      where: { id: createdHero.id },
      relations: ['powers', 'universe']
    });
    return createdHero;
  }

  public async updateOne(hero: HeroDto): Promise<Hero> {
    await this.heroRepository.update(hero.id, {
      ...(hero.universe && { universe: hero.universe })
    });
    const foundHero = await this.heroRepository.findOne({
      where: { id: hero.id }
    })
    return foundHero;
  }

  // public async updateOne(hero: HeroDto): Promise<Hero> {
  //   const foundHero = await this.heroRepository.save({...hero});
  //   return foundHero;
  // }
}