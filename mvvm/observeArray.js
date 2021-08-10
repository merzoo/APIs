const arrExtend = Object.create(Array.prototype);
const arrMethods = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];

arrMethods.forEach((method) => {
  const oldMethod = Array.prototype[method];
  const newMethod = function (...args) {
    oldMethod.apply(this, args);
    console.log(`${method}方法被执行了!`);
  };
  return (arrExtend[method] = newMethod);
});

Array.prototype = Object.assign(Array.prototype, arrExtend);

let array = [1, 2, 3];

array.push(4);

console.log(array);
