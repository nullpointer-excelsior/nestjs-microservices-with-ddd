import { IsString } from "class-validator";

export class StartTrackingRequest {
    @IsString()
    vehiculeID: string;
    @IsString()
    plate: string;
    driver:{
        ID: string;
        firstname: string;
        lastname: string;
        cellphone: string;
    }
    position: {
        lattitude: string;
        longitude: string;
        timestamp: Date;
    }
}