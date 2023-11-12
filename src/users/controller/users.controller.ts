// users.controller.ts

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { CreateUserDto } from '../dto/users.dto';


  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post()
    async create(@Body() userDto:CreateUserDto) {
      return await this.usersService.create(userDto);
    }
  
    @Get()
    findAll() {
      return this.usersService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe)id: number) {
      return this.usersService.findOne(id);
    }
  
    @Get(':username')
    async getByUsername(@Param('username') username: string) {
      return await this.usersService.getByUsername(username);
    }
  
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id:number,
        @Body() createUserDto: CreateUserDto,
    ) {
        return this.usersService.update(id, createUserDto);
    }
    @Delete(':id')
    async delete(@Param('id') id: string) {
      await this.usersService.delete(Number(id));
      return { status: 'success' };
    }
  }
  