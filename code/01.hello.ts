interface Animal {
  name: string
  age?: number
}

const dog: Animal = {
  name: 'dog'
}

const cat: typeof dog = {
  name: 'cat',
  age: 2
}
console.log(cat.name)
console.log(cat.age)
