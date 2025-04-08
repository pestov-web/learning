function FactResult({ factResult }: { factResult: number | string | null }) {
  return (
    <div className="result">
      {typeof factResult === 'number' ? (
        <h2>Результат: {factResult}</h2>
      ) : factResult === null ? (
        ''
      ) : (
        <h2>Ошибка: {factResult}</h2>
      )}
    </div>
  );
}

export default FactResult;
