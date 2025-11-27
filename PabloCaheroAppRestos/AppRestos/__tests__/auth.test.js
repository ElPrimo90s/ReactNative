

const isValidEmail = (email) => {
  // Regex básica para verificar el formato email@dominio.com
  if (!email) return false;
  const re = /\S+@\S+\.\S+/; 
  return re.test(email);
};

const isPasswordValid = (password) => {
  // La regla es: debe tener al menos 6 caracteres si no no deja crear la cuenta
  if (!password) return false;
  return password.length >= 6;
};


describe('Pruebas Unitarias: Validación de Datos', () => {

  test('Debe devolver true para un formato de correo electrónico válido', () => {
    expect(isValidEmail('usuario@apprestos.com')).toBe(true);
  });

  test('Debe devolver false para un correo electrónico sin @', () => {
    expect(isValidEmail('usuario.apprestos.com')).toBe(false);
  });

  test('Debe devolver false si la contraseña es menor a 6 caracteres', () => {
    expect(isPasswordValid('1234')).toBe(false);
  });

  test('Debe devolver true si la contraseña tiene 6 o más caracteres', () => {
    expect(isPasswordValid('123456')).toBe(true);
  });
});