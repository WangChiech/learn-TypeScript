type BuildArr<Len extends number, Arr extends unknown[] = []> =
  Len extends Arr['length']
    ? Arr
    : BuildArr<Len, [...Arr, unknown]>

type res1 = BuildArr<3>

type Subtract<Num1 extends number, Num2 extends number> = 
  BuildArr<Num1> extends [...args: BuildArr<Num2>, ...args2: infer Rest]
    ? Rest['length']
    : never
type res2 = Subtract<55, 2>

type Multiply<Num1 extends number, Num2 extends number, Arr extends unknown[] = []> =
  Num2 extends 0
    ? Arr['length']
    : Multiply<Num1, Subtract<Num2, 1>, [...Arr, ...BuildArr<Num1>]>
type res3 = Multiply<2, 4>

type Divide<Num1 extends number, Num2 extends number, Arr extends unknown[] = []> =
  Num1 extends 0
    ? Arr['length']
    : Divide<Subtract<Num1, Num2>, Num2, [...Arr, unknown]>
type res4 = Divide<6, 2>

type StrLen<Str extends string, Arr extends unknown[] = []> =
  Str extends `${string}${infer Rest}`
    ? StrLen<Rest, [...Arr, unknown]>
    : Arr['length']
type res5 = StrLen<'abc'>
type res6 = '1' extends `${string}${infer R}` ? R : false

type CreateThan<
  Num1 extends number,
  Num2 extends number,
  Arr extends unknown[] = []
> = Num1 extends Num2
  ? false
  : Arr['length'] extends Num2
    ? true
    : Arr['length'] extends Num1
      ? false
      : CreateThan<Num1, Num2, [...Arr, unknown]>

type res7 = CreateThan<9, 6>

type FibonacciLoop<
  PrevArr extends unknown[],
  CurrentArr extends unknown[],
  IndexArr extends unknown[] = [],
  Num extends number = 1
> = IndexArr['length'] extends Num
  ? CurrentArr['length']
  :FibonacciLoop<CurrentArr, [...PrevArr, ...CurrentArr], [...IndexArr, unknown], Num>
type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>
type res = Fibonacci<3>