// Pulled from the Microsoft TypeScript handbook
// See: https://www.typescriptlang.org/docs/handbook/mixins.html
export function Mixin(baseCtors: any[]) {
    return (target: any) => {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                target.prototype[name] = baseCtor.prototype[name];
            });
        });
    };
}
