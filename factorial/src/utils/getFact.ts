function memoizedFactorial() {
  const cache: Map<number, number> = new Map();

  function factorial(n: number): number {
    if (cache.has(n)) {
      console.log(`from cache: ${n}`);
      return cache.get(n)!;
    }

    if (n <= 1) {
      cache.set(n, 1);
      return 1;
    }

    const result = n * factorial(n - 1);
    cache.set(n, result);
    return result;
  }

  return factorial;
}

const getFact = memoizedFactorial();
export default getFact;
