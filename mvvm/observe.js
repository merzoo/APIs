function observe(data) {
  if (data == null || typeof data !== "object") return data;

  for (let key in data) {
    let currentValue = data[key];

    observe(currentValue);

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      set(value) {
        currentValue = value;
        console.log(`set new value ${value}`);
      },
      get() {
        console.log(`get value ${currentValue}`);
        return currentValue;
      },
    });
  }
}

// test object
const data = {
  a: 1,
  b: 2,
  c: { d: 4 },
};

// test case
observe(data);

data.a = 3; // set new value 3 -> success!
console.log(data.a); // get value 3 -> success!
