# Lecture 4

TypeScript
- Narrowing: type predicates
- Generics
- `keyof` operator
- `typeof` operator
- Indexed access types
- Index signatures
- Utility types
- Conditional types
- Mapped types
- Template literal types

TypeScript & React & TailwindCSS - Chessboard example

## Narrowing

More techniques to help with type narrowing

### Type Predicates

Sometimes you want more direct control over how types change throughout your code. To define a user-defined type guard, we simply need to define a function whose return type is a type predicate:

```ts
type Cat = {
  name: string;
  meow(): void;
}

type Dog = {
  name: string;
  bark(): void;
}

function isCat(animal: Cat | Dog): animal is Cat {
  return (animal as Cat).meow !== undefined;
}

// Usage
function speak(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow(); // Type is Cat
  } else {
    animal.bark(); // Type is Dog
  }
}
```

## Generics

Generics allow you to create reusable components that can work with multiple types. Simple example is an identity function:

```ts
function identity<T>(arg: T): T {
    return arg;
}
```

Generics can take `N` number of arguments:

```ts
const swap = (a: any, b: any) => {
  return [b, a];
};

const swapped = swap(1, 2);

// Type is any[]
const swapped = swap(1, 2);
```

We look at the type of `swapped` and it is `any[]`. We can do better than this. How about,

```ts
const swap = (a: number, b: number) => {
  return [b, a];
};

// Type is number[]
const swapped = swap(1, 2);
```

This is all good, but we want to be able to swap any two types. This is where generics come in.

```ts
const swap = <T, U>(a: T, b: U): [U, T] => {
  return [b, a];
};

// Type is [string, number]
const swapped = swap(1, "2");
```

You can restrict the types that can be used with a generics using `extends`: 

```ts
function logLength<T extends { length: number }>(arg: T): void {
    console.log(arg.length);
}

// Usage
logLength("Hello, world!"); // 13
logLength([1, 2, 3, 4]);     // 4

// Error: Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
logLength(42); 
```

## `keyof` operator

The keyof operator takes an object type and produces a string or numeric literal union of its keys. 

```ts
type Person = { name: string; age: number; occupation: string }
type P = keyof Person; // P is "name" | "age" | "occupation"
```

## `typeof` operator

JS has a `typeof` operator you can use in an expressive context:

```ts
console.log(typeof "Hello, world!"); // "string"
```

TypeScript adds a typeof operator you can use in a type context to refer to the type of a variable or property:

```ts
const person = { name: "Beverly", age: 78, occupation: "LRN" };

type Person = typeof person; // { name: string; age: number; occupation: string }
```
Value and type are different things, so we can't do something like this:

```ts
type Person = person; // { name: string; age: number; occupation: string }
```

## Indexed Access Types

We can use an indexed access type to look up a specific property on another type:

```ts
type Person = { name: string; age: number; occupation: string };

type Age = Person["age"]; // number
type NameAndAge = Person["name" | "age"]; // number | string

// Error: Property 'alive' does not exist on type 'Person'.
type I1 = Person["alive"];
```
Another example of indexing with an arbitrary type is using number to get the type of an array’s elements. We can combine this with typeof to conveniently capture the element type of an array literal:

```ts
const people = [
  { name: "Charlie", age: 15, occupation: "Student" },
  { name: "Bob", age: 23, occupation: "Teacher" },
  { name: "Daphne", age: 38, occupation: "Doctor" },
];
 
type Person = typeof people[number] // { name: string; age: number; occupation: string }
type Age = typeof people[number]["age"]; // number
```

Can't use `const` that is a string to index a type:

```ts
const key = "age";
// Error: Type 'key' cannot be used as an index type. 'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'?
type Age = Person[key];

// remember that you have to use typeof
type Age = Person[typeof key];
```

## Index Signatures

Sometimes you don’t know all the names of a type’s properties ahead of time, but you do know the shape of the values. Index signatures are a way to describe this in typesript: 

```ts
type StringMap = { [key: string]: string };

const example: StringMap = {
  name: "John",
  age: "20",
};

example.age = 20; // Error: Type 'number' is not assignable to type 'string'.
```

## Utility Types

TypeScript includes several useful built-in utility types. These are useful, but if you find yourself copy/pasting the same utility type wrapping a Type, then you should consider creating a custom type for it. 

### `Partial<Type>` & `Required<Type>`

Constructs a type with all properties of Type set to optional. This means that every property of the type is made optional.

```ts
type Person = {
  name: string;
  age: number;
  occupation: string;
}

type PartialPerson = Partial<Person>; // { name?: string; age?: number; occupation?: string; }
```

Opposite of `Partial` is `Required`:

```ts 
type RequiredPerson = Required<PartialPerson>; // { name: string; age: number; occupation: string; }
```

### `Readonly<Type>`

`ReadOnly` creates a type with all the properties set to readonly

```ts
type ReadonlyPerson = Readonly<Person>; // { readonly name: string; readonly age: number; readonly occupation: string; }

// Error: Cannot assign to 'name' because it is a read-only property.
person.name = "Beverly";
```

### `Record<Keys, Type>`

`Record` constructs an object type whose property keys are `Keys` and whose property values are `Type`. This utility is often used to define the shape of an object:

```ts
type Names = "linda" | "jane" | "john";
 
interface PersonInfo {
    age: number;
    occupation: string;
}
 
const people: Record<Names, PersonInfo> = {
  linda: { age: 54, occupation: "veterinarian" },
  jane: { age: 23, occupation: "programmer"  },
  john: { age: 34, occupation: "teacher" },
};
 
people.jane; // const people: Record<Names, PersonInfo>
```

### `Pick<Type, Keys>` & `Omit<Type, Keys>`

`Pick` selects a set of properties `Keys` (string literal or union of string literals) from `Type`.

```ts
type Person = {
  name: string;
  age: number;
  occupation: string;
}

type PersonPreview = Pick<Person, "age" | "occupation">; // { age: number; occupation: string }
```

`Omit` is the opposite of `Pick`:

```ts
type PersonPreview = Omit<Person, "name">; // { age: number; occupation: string }
```

### `Exclude<UnionType, ExcludedMembers>` & `Extract<Type, Union>`

`Exclude` removes all `ExcludeMembers` from the union `UnionType`. Common example is if ou have a union type of a bunch of different data types that you want to filter out certain types:

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
 
type NoCircles = Exclude<Shape, { kind: "circle" }> // { kind: "square"; x: number } | { kind: "triangle"; x: number; y: number }
```

`Extract` is the opposite of `Exclude`.

```ts
type Triangle = Extract<Shape, { kind: "triangle" }> // { kind: "triangle"; x: number; y: number }
```

### NonNullable<Type>

Constructs a type by excluding null and undefined from Type.

```ts
type T0 = NonNullable<string | number | undefined>; // string | number
type T1 = NonNullable<string[] | null | undefined>; // string[]
```

### `Parameters<Type>` & `ReturnType<Type>`

```ts
function getNames(p: Person) {
  return p.name;
}

type P = Parameters<typeof getNames>; // [Person]
type R = ReturnType<typeof getNames>; // string
```

## Conditional Types

Conditional types in TS allow you to create types that depend on a condition, enabling more flexibility. Folows the syntax:

```ts
T extends U ? X : Y // if `T` extends `U`, then `X` otherwise `Y`
```

Data can be complex and a combination of different types. Conditional types allow us to express these complex combinations in a type safe way.

```ts
type Shape =
  | { kind: "circle"; radius: number; dimensions: 2 }
  | { kind: "cube"; s: number; dimensions: 3; }
  | { kind: "triangle"; x: number; y: number; dimensions: 2; };


type ThreeDimentional<T> = T extends {dimensions: 3} ? T : never;

type Objects3D = ThreeDimentional<Shape>
```

Conditional types make it easier to create simple utility types

```ts 
type Flatten<T> = T extends any[] ? T[number] : T;

type Str = Flatten<string[]>; // string
type Num = Flatten<number>; // number
```

## Mapped Types


## Template Literal Types



# TypeScript & React & TailwindCSS - Chessboard example

## Run example

Run `npm install` to install the dependencies and then `npm run dev` to start the dev server.

## TailwindCSS

[TailwindCSS](https://tailwindcss.com/) is a utility first CSS framework for building modern web applications. It is highly customizable allowing for developers to implement their own design system. TailwindCSS allows for handling of hover, focus, and other states with ease. 

- [colors](https://tailwindcss.com/docs/customizing-colors)
- [spacing](https://tailwindcss.com/docs/customizing-spacing)

TailwindCSS can be customized by modifying the `tailwind.config.js` file.

## React & TypeScript

Change `.jsx` to `.tsx` extension will enable TS to do type checking on the JSX React components. 

- [React cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example)


