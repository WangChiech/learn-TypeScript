let unknownVal: unknown = 'unknown val';
unknownVal = 100;
let str: string = unknownVal // Error
const anyVal: any = unknownVal;
// unknown 类型进行属性访问需要类型断言
unknownVal?.fn() // compile Error
(unknownVal as { fn: () => {} })?.fn() // runtime Error