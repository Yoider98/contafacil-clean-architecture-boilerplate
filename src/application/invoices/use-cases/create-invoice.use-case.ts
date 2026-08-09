import {
  Invoice,
  InvoiceItem,
} from '../../../domain/invoices/entities/invoice.entity';
import DocumentStatus from '../../../domain/shared/enums/document-status.enum';
import {IInvoiceRepository} from '../../../domain/invoices/repositories/invoice.repository';

export interface CreateInvoiceDTO {
  companyId: string;
  items: InvoiceItem[];
  ivaPercent?: number;
  reteFuentePercent?: number;
  reteIVAPercent?: number;
  reteICAPercent?: number;
}

export class CreateInvoiceUseCase {
  constructor(private repo: IInvoiceRepository)  { /* Inyectado por constructor */ }

  async execute(dto: CreateInvoiceDTO): Promise<Invoice>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });

    const subtotal = dto.items.reduce(
      (s, it) => s + it.quantity * it.unitPrice,
      0,
    );

    invoice.calculateTaxes({
      baseAmount: subtotal,
      ivaPercent: dto.ivaPercent,
      reteFuentePercent: dto.reteFuentePercent,
      reteIVAPercent: dto.reteIVAPercent,
      reteICAPercent: dto.reteICAPercent,
    });

    const created = await this.repo.create(invoice);
    return created;
  }
}

export default CreateInvoiceUseCase;
