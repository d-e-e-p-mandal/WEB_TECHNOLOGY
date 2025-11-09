## 🧩 1. module.exports (CommonJS System)
Used in Node.js (before ES6) to export functions, objects, or variables from one file to another.

exports
```js
// 📁 math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = {
    add : add,
    subtract : subtract
};

// or, short form of object
// module.exports = {
//   add,
//   subtract
// };
```

or, also we can do like this

```js
// 📁 math.js
module.exports.add = (a, b) => a + b;
module.exports.sub = (a, b) => a + b;
```

require :
```js
// 📁 app.js
const math = require('./math'); // import entire module

console.log(math.add(5, 3));  // 8
console.log(math.subtract(5, 3)); // 2
```
or, rename math
```js
const m = require('./math'); // import entire module

console.log(m.add(5, 3));  // 8
console.log(m.subtract(5, 3)); // 2
```