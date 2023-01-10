
interface ValueObjectProps {
    [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps | any> {

    constructor(protected props: T) { }

    getValue() {
        return this.props
    }

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
