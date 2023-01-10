import { Body, Controller, Post } from "@nestjs/common";
import { TrackingUseCasesService } from "../../../../../../libs/application/src/tracking/services/TrackingUseCasesService";
import { StartTrackingRequest } from "../model/StartTrackingRequest";
import { UpdateTrackingRequest } from "../model/UpdateTrackingRequest";

@Controller('tracking')
export class TrackingController {

    constructor(private readonly tracking: TrackingUseCasesService) {}

    @Post('start')
    startTracking(@Body() request: StartTrackingRequest) {
        this.tracking.startTracking(request)
    }

    @Post('update')
    updateTracking(@Body() request: UpdateTrackingRequest) {
        console.log('request', request)
        console.log('service', this.tracking)
        this.tracking.updateTracking(request)
    }
    
}