export interface StartTrackingDto {
    vehiculeID: string;
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