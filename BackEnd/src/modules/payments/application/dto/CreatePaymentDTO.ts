import { IsNumber, IsEnum, IsInt } from "class-validator";
import { PaymentMethod, PaymentStatus } from "../../domain/value-objects/payment.enum";

export class CreatePaymentDTO {
    @IsNumber()
    amount: number;

    @IsEnum(PaymentMethod)
    method: PaymentMethod;

    @IsEnum(PaymentStatus)
    status: PaymentStatus;

    @IsInt()
    saleId: number;
}
