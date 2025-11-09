// 📁 math.js
function add(a, b) {
    return a + b;
  }
  
function subtract(a, b) {
    return a - b;
  }
  
  // Export functions
  module.exports = {
    add,
    subtract
  };

// object original form
//   module.exports = {
//     add : add,
//     subtract : subtract
//   };


// also we can do like this

//module.exports.add = (a, b) => a + b;
//module.exports.sub = (a, b) => a + b;