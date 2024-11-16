import { ObjectTyped } from "object-typed";

export class MultiUIValueBinding<T, U = T> {

    public get value(): U {
        return this.internalValue as U;
    }
    private internalValue?: U;
    private subscriptions: ((x: U) => Promise<any>)[] = []
    private onUpdate = (x: T) => this.setInternalValue(x);

    setInternalValue(x: any) {
        this.internalValue = this.parseFn?.(x) ?? x;
        Promise.all(this.subscriptions.map(y => y(this.internalValue as U)));
    }

    constructor(private propertyPrefix: string, private parseFn?: (input: T) => U, private deparseFn?: (input: U) => T) {
        engine.off(this.propertyPrefix + "->");
        this.reactivate();
    }

    async set(newValue: U) {
        engine.call(this.propertyPrefix + "!", this.deparseFn?.(newValue) ?? newValue);
    }

    dispose() {
        engine.off(this.propertyPrefix + "->", this.onUpdate);
        this.subscriptions = []
    }
    reactivate() {
        this.subscriptions = []
        engine.call(this.propertyPrefix + "?").then((x) => this.setInternalValue(x)).catch((y)=>console.warn(`ERR: ${this.propertyPrefix}?\n${y}`));
        engine.off(this.propertyPrefix + "->", this.onUpdate);
        engine.on(this.propertyPrefix + "->", this.onUpdate, this);
    }

    subscribe(fn: (x: U) => Promise<any>) {
        this.subscriptions.push(fn);
    }

}



type ConstructorReturnType<P> = P extends new (name: string) => MultiUIValueBinding<infer R> ? MultiUIValueBinding<R> : never
export type ConstructorObjectToInstancesObject<P> = Omit<{ [key in keyof P]: ConstructorReturnType<P[key]> }, `_${string}`>
type alpha = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
export type BindingClassObj = {
    _prefix: string,
    [key: `${alpha}${string}`]: new (...x: any[]) => any
}
export function InitializeBindings<T extends BindingClassObj>(obj: T): ConstructorObjectToInstancesObject<Omit<T, '_prefix'>> {
    const keys = ObjectTyped.keys(obj) as (Exclude<keyof typeof obj & string, `_${string}`>)[];
    const result = {} as ConstructorObjectToInstancesObject<typeof obj>
    for (let entry of keys) {
        if (entry == "_prefix") continue;
        result[entry] = new (obj as Omit<typeof obj, "_prefix">)[entry as any](obj._prefix + "." + entry)
    }
    return result;
}