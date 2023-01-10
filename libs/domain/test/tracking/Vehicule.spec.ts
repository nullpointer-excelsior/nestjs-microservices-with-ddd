import { EntityProps } from "../../src/shared/seedwork/Entity"
import { Driver } from "../../src/context/tracking/entity/Driver"
import { Vehicule, VehiculeState } from "../../src/context/tracking/entity/Vehicule"
import { ButtonPanicActivated } from "../../src/context/tracking/event/ButtonPanicActivated"
import { ButtonPanicDesactivated } from "../../src/context/tracking/event/ButtonPanicDesactivated"
import { Plate } from "../../src/shared/domain/Plate"
import { GpsPosition } from "../../src/context/tracking/vo/GpsPosition"

class VehiculeFactory {
    
    static DEFAULT: EntityProps<VehiculeState> = {
        driver: new Driver({ firstname: ' juan', lastname: 'valdez', cellphone: '52625662'}),
        plate: new Plate('ABCD-1234'),
        position: new GpsPosition({ lattitude: '001', longitude: '562', timestamp: new Date()}),
        isPanicButtonActive: false,
        panicAlerts: []
    }

    static create(props: Partial<EntityProps<VehiculeState>>) {
        const newProps = {
            ...VehiculeFactory.DEFAULT,
            ...props
        }
        return new Vehicule(newProps)
    }

}

describe('tracking.Vehicule',() => {

    it('updatePosition()', () => {
        const vehicule = VehiculeFactory.create({})
        vehicule.updatePosition(new GpsPosition({ lattitude: '001', longitude: '562', timestamp: new Date()}))
        const result = vehicule.position
        expect(result.getValue().lattitude).toBe('001')
        expect(result.getValue().longitude).toBe('562')
    })

    it('activeButtonPanic()', () => {
        const vehicule = VehiculeFactory.create({})
        vehicule.activeButtonPanic(new GpsPosition({ lattitude: 'XXX', longitude: 'YYY', timestamp: new Date()}))
        const result = vehicule.position
        expect(result.getValue().lattitude).toBe('XXX')
        expect(result.getValue().longitude).toBe('YYY')
        expect(vehicule.isButtonPanicActive).toBeTruthy()
        const events = vehicule.pullEvents()
        expect(events).toHaveLength(2)
        const event = events[1]
        expect(event.name).toBe(ButtonPanicActivated.NAME)
    })

    it('desactiveButtonPanic()', () => {
        const vehicule = VehiculeFactory.create({ isPanicButtonActive: true })
        expect(vehicule.isButtonPanicActive).toBeTruthy()
        vehicule.desactiveButtonPanic(new GpsPosition({ lattitude: 'XXX', longitude: 'YYY', timestamp: new Date()}))
        const result = vehicule.position
        expect(result.getValue().lattitude).toBe('XXX')
        expect(result.getValue().longitude).toBe('YYY')
        expect(vehicule.isButtonPanicActive).toBeFalsy()
        const events = vehicule.pullEvents()
        expect(events).toHaveLength(2)
        const event = events[1]
        expect(event.name).toBe(ButtonPanicDesactivated.NAME)
    })

})