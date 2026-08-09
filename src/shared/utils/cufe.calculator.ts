import * as crypto from 'crypto';

export interface CufeInput {
  invoiceNumber: string;
  issueDate: string; // YYYY-MM-DD
  issueTime: string; // HH:mm:ss-05:00
  subtotal: number;
  iva: number;
  total: number;
  nitSeller: string;
  nitBuyer: string;
  technicalKey: string;
  environment: '1' | '2'; // 1 = Production, 2 = Test
}

export function calculateCufe(input: CufeInput): string {
  // Format values according to DIAN specifications:
  // Decimals must be formatted with two decimal places using '.' as separator and no thousands separators.
  const formatAmount = (val: number) => val.toFixed(2);

  // String concatenation chain:
  // NumFact + FecFact + HoraFact + ValFac + CodImp1 + ValImp1 + CodImp2 + ValImp2 + CodImp3 + ValImp3 + ValTol + NitOFE + NumAdq + ClTec + TipoAmbiente
  // For the MVP, we assume standard Colombia VAT (IVA) as the primary tax.
  const ivaCode = '01'; // Standard DIAN code for IVA (01 = IVA)
  const ivaAmount = formatAmount(input.iva);

  // We can leave ReteFuente and ICA as 0 or empty for the CUFE hash chain base if not present,
  // or use placeholders '01' / '0.00' for other taxes if not applicable.
  const tax2Code = '02'; // ReteFuente placeholder or empty
  const tax2Amount = '0.00';
  const tax3Code = '03'; // ICA placeholder or empty
  const tax3Amount = '0.00';

  const chain =
    input.invoiceNumber +
    input.issueDate +
    input.issueTime +
    formatAmount(input.subtotal) +
    ivaCode +
    ivaAmount +
    tax2Code +
    tax2Amount +
    tax3Code +
    tax3Amount +
    formatAmount(input.total) +
    input.nitSeller +
    input.nitBuyer +
    input.technicalKey +
    input.environment;

  // Generate SHA-384
  return crypto.createHash('sha384').update(chain).digest('hex');
}
