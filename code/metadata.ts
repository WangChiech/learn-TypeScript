import 'reflect-metadata'

class Cls {
  public static clsMethod() {}
  public insMethod() {}
}
let obj = new Cls()

Reflect.defineMetadata('meta', 'class', Cls)

