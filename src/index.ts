import 'reflect-metadata'

function Prop() {
  return (target, key: string) => {
    const type = Reflect.getMetadata('design:type', target, key)
    console.log(`${key} type: ${type}`)
    // other...
  }
}

class SomeClass {
  @Prop()
  Aprop: string = '1'
}
