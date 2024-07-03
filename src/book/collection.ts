import { Request, Response } from "express";
import { CreateBookDto, UpdateBookDto } from "./dto";
import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../config/prisma";

export class BookCollection{
    async Create(req:Request,res:Response){
        try {
            const dto = new CreateBookDto(req.body);

            const errors = await validate(dto);

            if(errors.length>0){
                return res.status(StatusCodes.CONFLICT).json({
                    error: errors.map((e)=>e.constraints)
                })
            }

            const book = await prisma.book.create({
                data:{
                    name:dto.name,
                    author:dto.author
                }
            })

            return res.status(StatusCodes.CREATED).json(book)
        } catch (error:any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: error || error.message,
            })
        }
    }

    async GetAll(_req:Request,res:Response){
        try {
            const books = await prisma.book.findMany();
            return res.status(StatusCodes.ACCEPTED).json(books)
        } catch (error:any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: error || error.message
            })
        }
    }

    async GetById(req:Request,res:Response){
        try {
            const id = Number(req.params.id);

            const book = await prisma.book.findUnique({
                where:{
                    id:id
                }
            })

            if(book === null){
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "No book found by that id"
                })
            }

            return res.status(StatusCodes.ACCEPTED).json(book)
        } catch (error:any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: error || error.message
            })
        }
    }

    async Delete(req:Request,res:Response){
        try {
            const id = Number(req.params.id);
            await prisma.book.delete({
                where:{
                    id:id
                }
            });

            return res.status(StatusCodes.ACCEPTED).json({
                message:"book has been deleted"
            })


        } catch (error:any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error:error || error.message
            })
        }
    }

    async Update(req:Request,res:Response){
        try {
            const id = Number(req.params.id);

            const dto = new UpdateBookDto(req.body);

            const errors = await validate(dto);

            if(errors.length>0){
                return res.status(StatusCodes.CONFLICT).json({
                    error: errors.map((e)=>e.constraints)
                })
            }

            const updateBook = await prisma.book.update({
                where:{
                    id:id
                },
                data:{
                    name:dto.name,
                    author:dto.author,
                }
            })

            return res.status(StatusCodes.ACCEPTED).json(updateBook)
        } catch (error:any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: error || error.message
            })
        }
    }
}