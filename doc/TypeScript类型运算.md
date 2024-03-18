# TypeScript 类型运算

操作符、关键字、专用语法

类型创建、类型保护

## 条件: `extends ? :`
条件类型(Conditional Type)，TypeScript 中条件判断使用`extends ? :`
```
type isAbc<T> = T extends 'abc' ? true : false
type res1 = isAbc<'abc'> // true
type res2 = isAbc<'str'> // false
```

## 推导: `infer`
用于提取类型的一部分
```
type First<Tuple extends unknown[]> = Tuple extends [infer T, ...infer R] ? T : never
type res = First<[1, 2, 3]>
```

## 联合: `|`
联合类型(Union)，表示类型可以是几个类型之一
```
type Union1 = 1 | 2 | 3
```

## 交叉: `&`
交叉类型(Intersection)，表示对类型做合并

```
type StrAndNum = string & number // never
type Obj = { name: string } & { age: number }
```

## 映射类型
```
type clone<T> = {
  [k in keyof T]: T[k]
}
```
**`keyof T`**是查询索引类型中所有的索引(索引查询)

**`T[k]`**是取索引类型某个索引的值(索引访问)

**`in`**是用于遍历连个类型的运算符

**`as` 运算符**可以重映射索引
```
// k => string | number | symbol; k & string => string
type MapType<T> = {
  [k in keyof T as `newName_${k & string}`]: T[k]
}
```

## 索引类型
### 索引签名类型
```
interface StringOrBooleanTypes {
  propA: number;
  propB: boolean;
  [key: string]: number | boolean; // *
}
```
### 索引类型查询
**keyof** 操作符，返回所有键转成字面量类型后组成的联合类型
```
interface o {
  name: string
  age: number
}
type oKeys = keyof o // 'name' | 'age'
type keys = keyof any // string | number | symbol
```
### 索引类型访问
通过键的字面量类型，访问这个键对应值的类型
```
interface o {
  name: string
  [key: string]: number | string
}
type propNameType = o['name'] // string
type propType = o[string] // number | string

// keyof 获取所有键对应的值
interface obj {
  name: string
  age: number
}
type propObjType = obj[keyof obj] // string | number
```

## typeof 类型查询

## 类型守卫
```
export type Falsy = false | "" | 0 | null | undefined;

export const isFalsy = (val: unknown): val is Falsy => !val;

// 不包括不常用的 symbol 和 bigint
export type Primitive = string | number | boolean | undefined;

export const isPrimitive = (val: unknown): val is Primitive => ['string', 'number', 'boolean' , 'undefined'].includes(typeof val);
```
### 类型断言守卫
```
let name: any = 'linbudu';

function assertIsNumber(val: any): asserts val is number {
  if (typeof val !== 'number') {
    throw new Error('Not a number!');
  }
}

assertIsNumber(name);

// number 类型！
name.toFixed();

```