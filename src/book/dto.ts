import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBookDto{
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    author:string;

    constructor(data:CreateBookDto){
        this.name = data.name;
        this.author = data.author;
    }
}

export class UpdateBookDto{
    @IsOptional()
    name:string;

    @IsOptional()
    author:string;

    constructor(data:UpdateBookDto){
        this.name = data.name;
        this.author = data.author;
    }
}