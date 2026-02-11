import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
   constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const user = this.usersRepository.create(createUserDto);
    user.password = await bcrypt.hash(user.password, 10);
    console.log('Creating user:', user);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<any> {
    const users = this.usersRepository.find();
    return users;
  }

  async findOne(id: string): Promise<any> {
    const user = this.usersRepository.findOneBy({ id });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const user = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });
    if (user) {
      return await this.usersRepository.save(user);
    } else {
      return { message: 'User not found' };
    }
  }

  async remove(id: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ id });

    if (user) {
      return this.usersRepository.delete(id);
    } else {
      return { message: 'User not found' };
    } 
    
  }
  async findOneByEmail(email: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }
}
