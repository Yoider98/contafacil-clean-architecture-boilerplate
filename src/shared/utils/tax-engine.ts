export type TaxCalculationInput = {
  baseAmount: number; // valor sin impuestos
  ivaPercent?: number; // porcentaje de IVA (ej. 19)
  reteFuentePercent?: number; // porcentaje de retención en la fuente
  reteIVAPercent?: number; // porcentaje de retención sobre IVA
  reteICAPercent?: number; // porcentaje de reteICA
};

export type TaxCalculationResult = {
  subtotal: number;
  iva: number;
  reteFuente: number;
  reteIVA: number;
  reteICA: number;
  total: number;
};

export function calculateTaxes(
  input: TaxCalculationInput,
): TaxCalculationResult {
  const {
    baseAmount,
    ivaPercent = 19,
    reteFuentePercent = 0,
    reteIVAPercent = 0,
    reteICAPercent = 0,
  } = input;

  const subtotal = Number(baseAmount || 0);
  const iva = Number(subtotal * (ivaPercent / 100) || 0);
  const reteFuente = Number(subtotal * (reteFuentePercent / 100) || 0);
  const reteIVA = Number(iva * (reteIVAPercent / 100) || 0);
  const reteICA = Number(subtotal * (reteICAPercent / 100) || 0);

  const total = subtotal + iva - reteFuente - reteIVA - reteICA;

  return {
    subtotal,
    iva,
    reteFuente,
    reteIVA,
    reteICA,
    total,
  };
}

export default calculateTaxes;
