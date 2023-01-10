import { UniqueEntityID } from "@app/domain/shared/seedwork/UniqueEntityID";

export interface EnrollDriverDto {
    accountID: UniqueEntityID;
    licence: string;
    email: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    plate: string;
    model: string;
    color: string;
    year: string;
    capacity: number;
}