function calculateFactorial(n: number): number {
  if (n <= 1) {
    return 1;
  }
  return n * calculateFactorial(n - 1);
}

function cachingDecorator(func: (x: number) => number) {
  const cache: Map<number, number> = new Map();

  return function (x: number) {
    if (cache.has(x)) {
      console.log('get from cache');
      return cache.get(x);
    }
    console.log('get from func');
    const result = func(x);

    cache.set(x, result);
    return result;
  };
}

const getFact = cachingDecorator(calculateFactorial);
export default getFact;
