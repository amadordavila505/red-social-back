import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesService } from "../services/files.service";
import { fileNamer } from "src/helpers/fileName.helper";
import { Response } from 'express';
import { fileFilter } from "src/helpers/fileFilterhelper";
import { diskStorage } from "multer";


@Controller('files')
export class FilesController {
    constructor(
        private readonly filesService: FilesService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        //Llamamos al fileFilter de muter y le asignamos nuestro helper
        fileFilter: fileFilter,

        //Definimos el almacenamiento donde se va aguardar y lo renombramos
        storage: diskStorage({
            destination: './static/publications/',
            filename: fileNamer,
        })
    
    }))
    uploadImage(@UploadedFile() file: Express.Multer.File){
        if(!file) {
            throw new BadRequestException('Asegurese que el archivo sea una imagen');
        }
        const  url  = `${file.filename}`;

        return { url };
    }
    @Get('publications/:imageName')
    findPublications(@Res() res:Response, @Param('imageName') imageName: string) {
        const path = this.filesService.getStaticImageName(imageName);

        // return path;
        res.sendFile(path);
    }
    @Get('user/:imageName')
    findUser(@Res() res:Response, @Param('imageName')imageName:string) {
        const path = this.filesService.getStaticImageName(imageName);
    
            //return path;
            res.sendFile(path);
            return path;
    }
}


