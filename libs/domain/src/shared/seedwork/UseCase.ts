export interface UseCase<IN, OUT>{

    execute(input: IN): Promise<OUT>;

}