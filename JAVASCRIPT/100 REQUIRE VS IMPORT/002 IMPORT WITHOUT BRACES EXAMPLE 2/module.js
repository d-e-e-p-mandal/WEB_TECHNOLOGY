
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
  