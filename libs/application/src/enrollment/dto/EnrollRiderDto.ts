import { UniqueEntityID } from "@app/domain/shared/seedwork/UniqueEntityID";

export interface EnrollRiderDto {
    accountID: UniqueEntityID;
    firstname: string;
    lastname: string;
    phoneNumber: string;
}
