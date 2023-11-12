// publication.dto.ts
export class PublicationDTO {
    title?: string;
    description: string;
    image?: string;
    likes?: string[];
    comments?: string[];
    userCreated: {
      idUser: string;
      username: string;
      avatar: string;
    };
  }
  
  // add-like.dto.ts
  export class AddLikeDTO {
    userId: string;
  }
  
  // add-comment.dto.ts
  export class AddCommentDTO {
    userId: string;
    comment: string;
  }
  