## ES6 Modules (Modern JavaScript) :
Introduced with ECMAScript 2015 (ES6) — uses export and import keywords instead of module.exports and require().

### There are two kinds of exports in ES6 modules:
-	1.	Default export
-	2.	Named exports


## Default Exports :
When a file exports one main thing, it’s called a default export.
You import it without braces because there’s only one item being exported — no need to specify names.


Example 1 :
export :
```js
// 📁 greet.js
function greet(name) {
    console.log(`Hello, ${name}!`);
}

export default greet;
```
or, we can also like this
```js
// 📁 greet.js
export default function greet(name) {
  console.log(`Hello, ${name}!`);
}
```

import :
```js
// 📁 app.js
import greet from './greet.js';   // no braces
greet("Deep");
```
or, rename greet

```js
// 📁 app.js
import g from './greet.js';   // no braces
g("Deep");
```

Example 2 :
export:
```js
// module.js
function foo() {
    console.log('Foo');
  }
  
  function bar() {
    console.log('Bar');
  }
  
  export default {foo, bar};
  
  /*
    {foo, bar} is just an ES6 object literal that could be written like so:
  
    export default {
      foo: foo,
      bar: bar
    };
  
    It is the legacy of the "Revealing Module pattern"...
  */
  
```
or, warp inside a different function
```js
function foo() { console.log('Foo'); }
function bar() { console.log('Bar'); }

export default function main() {
  foo();
  bar();
}
```

import:
```js
// app.js
import module from './module.js';

module.foo(); // Foo
module.bar(); // Bar
```
or, rename version of module

```js
//app.js
import abc from './module.js';

abc.foo(); // Foo
abc.bar(); // Bar
```




## Named Exports → Require {} :
When you export several specific things (functions, variables, classes) from a file by name, you use named exports.

`To import them, you must use the exact names, inside curly braces {}, because you’re saying:“I only want these specific exported items by name.”`

Example 1:
export :
```js
// 📁 math.js
// You can export functions, constants, etc.
export function add(a, b) {
  return a + b;
}

export function sub(a, b) {
  return a - b;
}

export const PI = 3.14159;
```
or, we can also export 

```js
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

const PI = 3.14159;

export { add, sub, PI };
```

Import Now :
```js
// 📁 index.js
import { add, sub, PI } from './math.js';

console.log(add(3, 2)); // 5
console.log(sub(7, 4)); // 3
console.log(PI);        // 3.14159
```

or , renamed version
```js
import { add as sum, sub as difference } from './math.js';

console.log(sum(10, 5));       // 15
console.log(difference(10, 5)); // 5
```



## Mix Named and Default Exports :
Exaple 1 :
export :
```js
export function add(a, b) { return a + b; }
export function sub(a, b) { return a - b; }

export default function multiply(a, b) {
  return a * b;
}
```

import
```js
import multiply, { add, sub } from './math.js';

console.log(multiply(3, 2)); // 6
console.log(add(3, 2));      // 5
```





# 🧩 CommonJS vs ES6 Modules

| **Feature** | **CommonJS (`require`)** | **ES6 Module (`import`)** |
|--------------|---------------------------|-----------------------------|
| **Syntax** | `require()` / `module.exports` | `import` / `export` |
| **File extension** | `.js` | `.mjs` or `.js` *(with `"type": "module"` in package.json)* |
| **Default export** | `module.exports = value` | `export default value` |
| **Named exports** | `exports.name = value` | `export { name }` |
| **Import style** | `const obj = require('./file')` | `import { name } from './file.js'` |
| **Execution** | Synchronous | Asynchronous |
| **Environment** | Node.js | Browser + Node.js *(modern)* |

---

✅ **Summary:**
- **CommonJS** is the *older* Node.js module system (synchronous, `require()` based).  
- **ES6 Modules** are the *modern standard* (asynchronous, `import/export` based).  
- Use **ES6 modules** for modern JavaScript projects or frontend frameworks.