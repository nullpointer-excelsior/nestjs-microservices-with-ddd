import { IsEmail, Length, Max, validate, validateOrReject, validateSync } from "class-validator";
import { DomainEvent } from "../../src/shared/seedwork/DomainEvent";
import { DomainException } from "../../src/shared/seedwork/DomainException";
import { UniqueEntityID } from "../../src/shared/seedwork/UniqueEntityID";
import { Validator, isEmail, isAscii } from "class-validator";
import * as Joi from "joi";

interface ValueObjectProps {
    [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps | any> {

    constructor(protected readonly props: T) { }

    public equals(vo?: ValueObject<T>): boolean {
        if (vo === null || vo === undefined) {
            return false;
        }
        if (vo.props === undefined) {
            return false;
        }
        return JSON.stringify(this.props) === JSON.stringify(vo.props);
    }

}

class Email extends ValueObject<string>{

    get value() {
        return this.props
    }

}

class Contact extends ValueObject<{ readonly name: string, email: string }>{

    getValue() {
        return this.props
    }

}

describe('Seedwork', () => {

    it('ValueObject', () => {

        const x = new Email('xx@xxx.com')
        const y = new Email('xxx@xxx.com')
        const z = new Contact({ name: 'benjamin', email: '+569xxxxxxx' })
        expect(z.equals(new Contact({ name: 'benjamin', email: '+569xxxxx' }))).toBeFalsy()
        x.value
    })

})


const isEntity = (v: any): v is Entity<any> => {
    return v instanceof Entity;
};

export type EntityProps<T> = T & { id?: UniqueEntityID }
export type EntityValidator<T> = (state: T) => T

export abstract class Entity<T> {

    private id: UniqueEntityID;
    private state: T;
    private stateValidator: (state: T) => T

    constructor(props: EntityProps<T>, stateValidator?: EntityValidator<T>) {
        this.id = props.id ? props.id : new UniqueEntityID()
        this.stateValidator = stateValidator ? stateValidator : (props: T) => { return props }
        this.state = this.stateValidator({
            ...props
        })
    }

    get ID() {
        return this.id
    }

    setState(fn: (prevstate: T) => T) {
        const newstate = fn({ ...this.state })
        this.state = this.stateValidator({ ...newstate })
    }

    getState() {
        return {
            ...this.state
        }
    }

    equals(object?: Entity<T>): boolean {

        if (object == null || object == undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!isEntity(object)) {
            return false;
        }

        return this.id.equals(object.id);

    }

}

interface PersonState {
    name: string;
    email: string;
}

const validator = (state: PersonState) => {
    if (!isEmail(state.email)) {
        throw new DomainException(`Error validation: "${state.email}" is not a valid email address`)
    }
    return state
}

class Person extends Entity<PersonState> {

    constructor(props: EntityProps<PersonState>) {
        super(props, validator)
    }

}


describe('Seedwork', () => {

    it('call Entity.getState().email = "aaa" and state should not mutated', () => {
        const x = new Person({ name: 'benja', email: 'xxx@xxx.com' })
        x.getState().email = 'aaa'
        expect(x.getState().email).toBe('xxx@xxx.com')

    })

    it('call Entity.setState() and should mutate the state', async () => {
        const person = new Person({ name: 'benja', email: 'xxx@xxx.com' })
        person.setState((state) => ({
            ...state,
            email: 'benjamin@benjamin.com'
        }))
        expect(person.getState().email).toBe('benjamin@benjamin.com')

    })

    it('call Entity.setState() and should validate props', async () => {
        const x = new Person({ name: 'benja', email: 'xxx@xxx.com' })
        x.setState((state) => {
            state.email = 'benjamin@benjamin.com'
            return state
        })
        expect(x.getState().email).toBe('benjamin@benjamin.com')

    })


})



const isEntity3 = (v: any): v is EntityBase<any> => {
    return v instanceof EntityBase;
};


export abstract class EntityBase<T> {

    private id: UniqueEntityID;
    private events: DomainEvent<any>[] = []
    private state: T;

    protected abstract validateState(state: T): T

    constructor(props: EntityProps<T>) {
        this.id = props.id ? props.id : new UniqueEntityID()
        this.state = this.validateState({
            ...props
        })
    }

    get ID() {
        return this.id
    }

    protected getState() {
        return {
            ...this.state
        }
    }

    protected setState(fn: (prevstate: T) => T) {
        const newstate = fn({ ...this.state })
        const validstate = this.validateState({ ...newstate })
        this.state = { ...validstate }
    }

    addEvent(event: DomainEvent<any>) {
        this.events.push(event)
    }

    pullEvents() {
        const domainEvents = this.events.slice();
        this.events = [];
        return domainEvents;
    }

    public equals(object?: EntityBase<T>): boolean {

        if (object == null || object == undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!isEntity3(object)) {
            return false;
        }

        return this.id.equals(object.id);

    }

}


interface AnimalState {
    name: string;
    specie: string;
}

export class Animal extends EntityBase<AnimalState> {

    protected validateState(state: AnimalState): AnimalState {
        
        const schema = Joi.object<AnimalState>({
            name: Joi
                .string()
                .required()
                .error(new DomainException('Name required')),
            specie: Joi
                .string()
                .length(4)
                .required()
                .error(new DomainException('Invalid specie name'))
        })

        return Joi.attempt(state, schema)

    }

    get name() {
        return this.getState().name
    }

    get specie() {
        return this.getState().specie
    }

    sanitizeName() {
        
        this.setState((state) => {
            state.name = state.name.toLocaleLowerCase()
            return state
        })


    }



}


// describe('New Entity', () => {

//     it('validate instance', () => {
    
//         const animal = new Animal({ name: 'DOG', specie: 'bibagdgf' })
//         animal.sanitizeName()
//         console.log('Animal', animal)
//         expect(animal).toBeDefined()
        

//     })



// })