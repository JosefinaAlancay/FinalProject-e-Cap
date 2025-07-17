import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class CourseFilterDTO {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    limit?: number;
    
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    offset?: number;

    @IsOptional()
    category_id?: string;

    @IsOptional()
    title?: string;

    @IsOptional()
    level?: string;

}