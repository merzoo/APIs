const runPromiseInSequence = (promiseArr, value) =>
  promiseArr.reduce(
    (promiseChain, currentValue) => promiseChain.then(currentValue),
    Promise.resolve(value)
  );

// test case

const as1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("as1");
    resolve(1);
  }, 1000);
});

const as2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("as2");
    resolve(2);
  }, 2000);
});

const promiseArr = [as1, as2];

runPromiseInSequence(promiseArr, "init");
