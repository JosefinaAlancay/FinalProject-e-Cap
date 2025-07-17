import { IsString, Length } from "class-validator";

export class UpdateCategoryDTO {
    
    @IsString()
    @Length(2, 100)
    name?: string;
}
