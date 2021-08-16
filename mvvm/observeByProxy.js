const observeByProxy = (data) => {
  if (!data || Object.prototype.toString.call(data) !== "[object Object]") {
    return;
  }

  Object.keys(data).forEach((key) => {
    let currentValue = data[key];

    if (typeof currentValue === "object") {
      observeByProxy(currentValue);

      data[key] = new Proxy(currentValue, {
        set(target, property, value, receiver) {
          if (property !== "length") {
            console.log(`setting key: ${key}, new value is ${currentValue}`);
          }
          return Reflect.set(target, property, value, receiver);
        },
      });
    } else {
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
  });
};

const data = {
  a: 1,
  b: [1, 2, 3],
};

observeByProxy(data);

data.b.push(7);
