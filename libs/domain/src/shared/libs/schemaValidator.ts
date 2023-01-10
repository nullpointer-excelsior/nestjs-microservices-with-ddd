import * as Joi from "joi";
import { DomainException } from "../seedwork/DomainException";

export function schemaValidator<T>(value: T, schema: Joi.Schema) {
    try {
        return Joi.attempt(value, schema)
    } catch (err) {
        throw new DomainException(err)
    }
}