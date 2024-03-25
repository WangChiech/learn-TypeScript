# TypeScript 类型

Object 包含所有除 Top Type 以外的类型

object 包含所有非原始类型的类型 

## JavaScript 基础类型
### string
### number
### boolean
### symbol
### bigint
### object
包含所有引用类型
### null
### undefined
## JavaScript 包装类型
### String、Number、Boolean、Symbol
### Object
原型链的顶端是`Object.prototype`，在 TypeScript 中 Object 表现为包含所有类型
**赋值为对象的属性不能包含`Object.prototype`中的属性**
```
// 对于 undefined、null ，需要关闭 strictNullChecks
const val1: Object = undefined;
const val2: Object = null;
const val3: Object = 'wj';
const val4: Object = 599;
const val5: Object = { name: 'wj' };
const val6: Object = () => {};
const val7: Object = [];
```

## 复合类型
### class
### Array
### 元组(Tuple)
元素个数和类型固定的数组
```
type Tuple1 = [number, string]
```
### 接口(Interface)
可以描述对象、函数、构造器的结构

**对象**
```
interface IPerson {
  name: string
  age: number
}
class Person implements IPerson {
  name: string
  age: number
}
const obj: IPerson = {
  name: 'wj',
  age: 18
}
```
**函数**
```
interface Fn {
  (name: string): string
}
```
**构造器**
```
interface PersonConstructor {
  new (name: string, age: number): IPerson
}
function createPerson(ctor: PersonConstructor): IPerson {
  return new ctor('wj', 18)
}
```
**对象、class类型也称为索引类型**
```
// 索引签名
interface IPerson {
  [prop: string]: string | number
}
const obj: IPerson = {}
obj.name = 'wj'
obj.age = 18
```
### 枚举(Enum)

## 字面量类型
### 基本字面量

### 字符串字面量

### {}
初始化时可以初始化为任意值，但后续无法对其属性进行访问，或作操作
```
// 对于 undefined、null ，需要关闭 strictNullChecks
const val1: {} = undefined;
const val2: {} = null;
const val3: {} = 'wj';
const val4: {} = 599;
const val5: {} = { name: 'wj' };
const val6: {} = () => {};
const val7: {} = [];

console.log(val5)
console.log(val5.name) // Error
val6() // Error
```
## 四种特殊类型
### void
有类型，空类型
### never
一个虚无的不存在的类型，表示用不返回，只能兼容 never 类型，可以被任意类型兼容
```typescript
function err(msg: string): never {
  throw new Error(msg)
}
```
```
type IsNever<T> = [T] extends [never] ? true : false
```

`never` 本质上是类型系统的最底层类型(Bottom Type)
### unknown
跳过类型检查，可以兼容任意类型，但只能被 unknown、any 兼容
```typescript
let unknownVal: unknown = 'unknown val';
unknownVal = 100;
let str: string = unknownVal // Error
const anyVal: any = unknownVal;
// unknown 类型进行属性访问需要类型断言
unknownVal?.fn() // compile Error
(unknownVal as { fn: () => {} })?.fn() // runtime Error
```
```
type IsUnknown<T> = unknown extends T
  ? IsAny<T> extends true
    ? false
    : true
  : false;
```
### any
跳过类型检查，可以兼容任意类型，也可以被任意类型兼容
```typescript
let anyVal = 'any val'
anyVal = 100
let str: string = anyVal
```
```
type IsAny<T> = 1 extends (2 & T) ? true : false
```
```
type res1 = any & 1 // any & 任意类型均为 any
type res2 = any | unknown // any | 任意类型均为 any

type res6 = 1 extends any ? true : false // 1 为任意类型均为 true
// any extend 任意类型(unknown 除外)， 结果为两种值的联合类型
type res3 = any extends 1 ? true : false // boolean
type res4 = any extends never ? 'a' : 'b' // 'a' | 'b'
type res5 = any extends unknown ? 'a' : 'b' // 'a'
```
```
type key = keyof any // string | number | symbol
```
`any` 本质是类型系统中的顶级类型(Top Type)



## 类型的装饰
类型系统支持描述类型的属性，如可选、只读等
```
interface IPerson {
  readonly name: string
  age?: number
}
type Tuple1 = [string, number?]
```

## 断言

### 非空断言
`fn!.f!()`

## 泛型
```
type Conditional<Type, Condition, TruthyResult, FalsyResult> =
  Type extends Condition ? TruthyResult : FalsyResult;

//  "passed!"
type Result1 = Conditional<'linbudu', string, 'passed!', 'rejected!'>;

```
**当泛型传入参数为 never，则直接返回 never**
```
// 直接使用，仍然会进行判断
type Tmp3 = never extends string ? 1 : 2; // 1

type Tmp4<T> = T extends string ? 1 : 2;
// 通过泛型参数传入，会跳过判断
type Tmp4Res = Tmp4<never>; // never

// 如果判断条件是 never，还是仅在作为泛型参数时才跳过判断
type Special3 = never extends never ? 1 : 2; // 1
type Special4<T> = T extends never ? 1 : 2;
type Special4Res = Special4<never>; // never
```

**当泛型传入参数为 any，则返回条件类型两个结果的联合类型**
```
// 直接使用，返回联合类型
type Tmp1 = any extends string ? 1 : 2;  // 1 | 2

type Tmp2<T> = T extends string ? 1 : 2;
// 通过泛型参数传入，同样返回联合类型
type Tmp2Res = Tmp2<any>; // 1 | 2

// 如果判断条件是 any，那么仍然会进行判断
type Special1 = any extends any ? 1 : 2; // 1
type Special2<T> = T extends any ? 1 : 2;
type Special2Res = Special2<any>; // 1
```