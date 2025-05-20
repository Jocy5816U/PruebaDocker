const { suma } = require('./index');

test('suma de 3 + 4 debe ser 7', () => {
  expect(suma(3, 4)).toBe(7);
});

test('suma de 5 + 6 debe ser 11', () => {
  expect(suma(5, 6)).toBe(11);
});

test('suma de 10 + 20 debe ser 30', () => {
  expect(suma(10, 20)).toBe(30);
});
