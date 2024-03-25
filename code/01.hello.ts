type u<A extends string, B extends number> = `${A}_${B}`
type res = u<'a' | 'b', 0 | 1>