import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PublicationsService } from "../services/publications.service";
import { AddCommentDTO, AddLikeDTO, PublicationDTO } from "../dto/publications.dto";

  
  @Controller('publications')
  export class PublicationsController {
    constructor(private readonly publicationService: PublicationsService) {}
  
    @Post()
    private async create(@Body() DTO: PublicationDTO) {
      try {
        const publication = await this.publicationService.create(DTO);
        return publication;
      } catch (error) {
        console.log(error);
        throw new BadRequestException(error.message);
      }
    }
  
    @Get()
    private async getPublications() {
      try {
        const publications = await this.publicationService.getAll();
        return publications;
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    @Get(':id')
    private async getPublication(@Param('id') id: string) {
      try {
        const publication = await this.publicationService.get(id);
        return { status: 'success', data: publication };
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    @Get('user/:id')
    private async getPublicationByUser(@Param('id') id: string) {
      try {
        const publications = await this.publicationService.getPublicationsUser(id);
        return publications;
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    @Put(':id/addLike')
    private async addLike(@Param('id') id: string, @Body() DTO: AddLikeDTO) {
      try {
        const publication = await this.publicationService.addLike(id, DTO);
        return publication;
      } catch (error) {
        console.log(error);
        throw new BadRequestException(error.message);
      }
    }
  
    @Put(':id/deleteLike')
    private async deleteLike(@Param('id') id: string, @Body() DTO: AddLikeDTO) {
      try {
        const publication = await this.publicationService.deleteLike(id, DTO);
        return publication;
      } catch (error) {
        console.log(error);
        throw new BadRequestException(error.message);
      }
    }
  
    @Put(':id/addComment')
    private async addComment(@Param('id') id: string, @Body() DTO: AddCommentDTO) {
      try {
        const publication = await this.publicationService.addComment(id, DTO);
        return publication;
      } catch (error) {
        console.log(error);
        throw new BadRequestException(error.message);
      }
    }
  
    @Delete(':id')
    private async deletePublication(@Param('id') id: string) {
      try {
        const publication = await this.publicationService.delete(id);
        return { status: 'success', data: publication };
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  }
  
  