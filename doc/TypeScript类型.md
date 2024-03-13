# TypeScript 类型

## primitive
### string
### number
### boolean
### symbol
### bigint
### object
### null
### undefined
### void
有类型，空类型
### never
什么也没有，表示用不返回，只能兼容 never 类型，可以被任意类型兼容
```typescript
function err(msg: string): never {
  throw new Error(msg)
}
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
### any
跳过类型检查，可以兼容任意类型，也可以被任意类型兼容
```typescript
let anyVal = 'any val'
anyVal = 100
let str: string = anyVal
```

`any` 本质是类型系统中的顶级类型(Top Type)