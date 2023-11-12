import { Injectable, NotFoundException } from "@nestjs/common";
import { Publication } from "../entities/publications.entity";
import { EntityRepository, Repository, } from "typeorm";
import { AddCommentDTO, AddLikeDTO, PublicationDTO } from "../dto/publications.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
@EntityRepository(Publication)
export class PublicationsRepository extends Repository<Publication> {
  // Agrega tus métodos personalizados aquí si los necesitas
}

@Injectable()
export class PublicationsService {
  constructor(
    @InjectRepository(PublicationsRepository)
    private readonly publicationRepository: PublicationsRepository,
  ) {}

  async create(publicationDTO: PublicationDTO): Promise<Publication> {
    const newPublication = this.publicationRepository.create(publicationDTO);
    return await this.publicationRepository.save(newPublication);
  }

  async getAll(): Promise<Publication[]> {
    return await this.publicationRepository.find();
  }

  async get(id: string): Promise<Publication> {
    return await this.publicationRepository.findOne({ where: { id: Number(id) } });
  }

  async getPublicationsUser(userId: string): Promise<Publication[]> {
    return await this.publicationRepository
      .createQueryBuilder('publication')
      .where('publication.userCreated.idUser = :userId', { userId })
      .getMany();
  }

  async addLike(id: string, addLikeDTO: AddLikeDTO): Promise<Publication> {
    const publication = await this.publicationRepository.findOne({ where: { id: Number(id) } });

    if (!publication) {
      throw new NotFoundException('Publicación no encontrada');
    }

    publication.likes.push(addLikeDTO.userId);
    return await this.publicationRepository.save(publication);
  }

  async deleteLike(id: string, addLikeDTO: AddLikeDTO): Promise<Publication> {
    const publication = await this.publicationRepository.findOne({ where: { id: Number(id) } });

    if (!publication) {
      throw new NotFoundException('Publicación no encontrada');
    }

    publication.likes = publication.likes.filter((userId) => userId !== addLikeDTO.userId);
    return await this.publicationRepository.save(publication);
  }

  async addComment(id: string, addCommentDTO: AddCommentDTO): Promise<Publication> {
    const publication = await this.publicationRepository.findOne({ where: { id: Number(id) } });

    if (!publication) {
      throw new NotFoundException('Publicación no encontrada');
    }

    publication.comments.push(`${addCommentDTO.userId}: ${addCommentDTO.comment}`);
    return await this.publicationRepository.save(publication);
  }

  async delete(id: string): Promise<void> {
    await this.publicationRepository.delete(id);
  }
}
