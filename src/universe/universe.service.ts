import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UniverseDto } from './universe.dto';
import { Universe } from './universe.entity';

@Injectable()
export class UniverseService {
  constructor(
    @Inject('UNIVERSE_REPOSITORY')
    private universeRepository: Repository<Universe>,
  ) { }
  public async findAll(): Promise<Universe[]> {
    return this.universeRepository.find(
      // { relations: ['powers', 'universe'] }
      );
  }

  public async createOne(universe: UniverseDto): Promise<Universe> {
    let createdUniverse = await this.universeRepository.save(universe);

    createdUniverse = await this.universeRepository.findOne({
      where: { id: createdUniverse.id },
      // relations: ['powers', 'universe']
    });
    return createdUniverse;
  }

  // public async findOne(id: number): Promise<Hero> {
  //   const hero = this
  // }
}