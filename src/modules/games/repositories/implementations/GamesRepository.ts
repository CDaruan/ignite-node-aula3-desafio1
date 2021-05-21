import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const games = await this.repository
      .createQueryBuilder("games")
      .where(`LOWER(title) ILIKE LOWER('%${param}%')`)
      .getMany();

    return await this.repository
      .createQueryBuilder("games")
      .where(`LOWER(title) ILIKE LOWER('%${param}%')`)
      .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const count = await this.repository.query(`SELECT COUNT(*) FROM games`);

    return await this.repository.query(`SELECT COUNT(*) FROM games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return (await this.repository
      .createQueryBuilder("game")
      .innerJoinAndSelect("game.users", "user")
      .where("game.id = :id", { id })
      .getOneOrFail()).users;
  }
}
