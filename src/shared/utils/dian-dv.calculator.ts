/**
 * Algoritmo oficial DIAN (Módulo 11) para calcular el Dígito de Verificación del NIT en Colombia.
 */
export function calculateDIANDigitVerification(nit: string): string {
  if (!nit) return '';
  const cleanNit = nit.replace(/\D/g, '');
  if (!cleanNit) return '';

  const vpri = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
  const z = cleanNit.length;

  let x = 0;
  let y = 0;

  for (let i = 0; i < z; i++) {
    y = parseInt(cleanNit.substring(z - 1 - i, z - i), 10);
    x += y * vpri[i];
  }

  const yModulo = x % 11;
  if (yModulo > 1) {
    return (11 - yModulo).toString();
  }
  return yModulo.toString();
}
