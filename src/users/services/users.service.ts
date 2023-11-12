// users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/users.dto';


@Injectable()
export class UsersService {
  findOne(id: number) {
    throw new Error("Method not implemented.");
  }
  findAll() {
    throw new Error("Method not implemented.");
  }
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userDTO: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(userDTO);
    return await this.userRepository.save(newUser);
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: Number(id) } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, userDTO: CreateUserDto): Promise<User> {
    const user = await this.getById(id);
    const updatedUser = Object.assign(user, userDTO);
    return await this.userRepository.save(updatedUser);
  }

  async delete(id: number): Promise<void> {
    const user = await this.getById(id);
    await this.userRepository.remove(user);
  }
}
