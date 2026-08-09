import {DomainEntity} from '../../shared/domain.entity';
import DocumentStatus from '../../shared/enums/document-status.enum';

export enum InvoiceDocumentType {
  INVOICE = 'INVOICE',
  CREDIT_NOTE = 'CREDIT_NOTE',
  DEBIT_NOTE = 'DEBIT_NOTE',
  POS = 'POS',
  EQUIVALENT_DOCUMENT = 'EQUIVALENT_DOCUMENT',
}

export class InvoiceResolution extends DomainEntity {
  resolutionNumber: string;
  prefix: string;
  fromNumber: number;
  toNumber: number;
  currentNumber: number;
  technicalKey?: string;
  validFrom: Date;
  validTo: Date;
  documentType: InvoiceDocumentType;
  status: DocumentStatus;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: Partial<InvoiceResolution>) {
    super(data);
    if (this.currentNumber === undefined || this.currentNumber === null) {
      this.currentNumber = this.fromNumber ?? 1;
    }
    if (this.isActive === undefined || this.isActive === null) {
      this.isActive = true;
    }
    if (!this.documentType) {
      this.documentType = InvoiceDocumentType.INVOICE;
    }
    if (!this.status) {
      this.status = DocumentStatus.DRAFT;
    }
  }

  isValidAt(date: Date = new Date()): boolean {
    if (!this.isActive) return false;
    return date >= this.validFrom && date <= this.validTo;
  }

  hasAvailableNumbers(): boolean {
    return this.currentNumber <= this.toNumber;
  }

  getFormattedNextNumber(): string {
    const padded = this.currentNumber.toString().padStart(6, '0');
    return this.prefix ? `${this.prefix}-${padded}` : padded;
  }

  incrementNumber(): void {
    if (
      this.status === DocumentStatus.APPROVED ||
      this.status === DocumentStatus.ANNULLED
    ) {
      throw new Error(
        `No se puede modificar la resolución cuando tiene estado ${this.status}`,
      );
    }
    if (!this.hasAvailableNumbers()) {
      throw new Error(
        `La resolución ${this.prefix} ${this.resolutionNumber} ha alcanzado su límite (${this.toNumber})`,
      );
    }
    this.currentNumber += 1;
    this.updatedAt = new Date();
  }
}
