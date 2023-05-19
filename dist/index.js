import 'reflect-metadata';
function Prop() {
    return (target, key) => {
        // const type = Reflect.getMetadata('design:type', target, key)
        // console.log(`${key} type: ${type}`)
        // other...
        return '2';
    };
}
class SomeClass {
    @Prop()
    Aprop = '1';
}
