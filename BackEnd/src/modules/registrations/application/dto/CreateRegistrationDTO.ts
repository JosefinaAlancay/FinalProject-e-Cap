import { IsEnum, IsInt } from "class-validator";
import { RegistrationStatus } from "../../domain/value-objects/registration.enum";

export class CreateRegistrationDto {
    @IsEnum(RegistrationStatus)
    status: RegistrationStatus;

    @IsInt()
    userId: number;

    @IsInt()
    saleId: number;

    @IsInt()
    courseId: number;
}
