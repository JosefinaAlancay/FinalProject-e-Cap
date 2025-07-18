import { IsNumber, IsInt, IsArray } from "class-validator";

export class CreateSaleDTO {
    @IsNumber()
    total: number;

    @IsInt()
    userId: number;

    @IsArray()
    @IsInt({ each: true })
    courseId: number;
}
