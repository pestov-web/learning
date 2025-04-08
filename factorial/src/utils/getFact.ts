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
      return cache.get(x) as number; // ниже тоже, как избежать использования as number, не указывая полотна типов и проверок при объявлении функции?
    }
    console.log('get from func');
    const result = func(x) as number;

    cache.set(x, result);
    return result;
  };
}

const getFact = cachingDecorator(calculateFactorial);
export default getFact;
