import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto, PageOptionsDto } from 'src/common/dto/page.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async listAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder.orderBy('user.createdAt', pageOptionsDto.order).skip(pageOptionsDto.skip).take(pageOptionsDto.take);

    const count = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    return new PageDto(entities, count, pageOptionsDto);
  }

  findById(id: string): Promise<User> {
    return this.userRepository.findOne(id, { relations: ['client'] });
  }

  retriveUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async create(user: User): Promise<User> {
    const userExist = await this.userRepository.findOne({ email: user.email });
    if (userExist) throw new BadRequestException('User already registered with email');
    const createdUser = await this.userRepository.save(user);

    return createdUser;
  }
}
