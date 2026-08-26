import {
  Invoice,
  InvoiceItem,
} from '../../../domain/invoices/entities/invoice.entity';
import DocumentStatus from '../../../domain/shared/enums/document-status.enum';
import {IInvoiceRepository} from '../../../domain/invoices/repositories/invoice.repository';
import {IInvoiceResolutionRepository} from '../../../domain/invoices/repositories/invoice-resolution.repository';
import {InvoiceResolution, InvoiceDocumentType} from '../../../domain/invoices/entities/invoice-resolution.entity';
import {AnyObject} from '@loopback/repository';

export interface CreateInvoiceDTO {
  companyId: string;
  items: InvoiceItem[];
  ivaPercent?: number;
  reteFuentePercent?: number;
  reteIVAPercent?: number;
  reteICAPercent?: number;
}

export class CreateInvoiceUseCase {
  constructor(
    private readonly repo: IInvoiceRepository,
    private readonly resolutionRepository: IInvoiceResolutionRepository,
  )  { /* Inyectado por constructor */ }

  async execute(dto: CreateInvoiceDTO, options?: AnyObject): Promise<Invoice>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    // 1. Obtener la resolución de facturación activa para la empresa
    let resolution = await this.resolutionRepository.findActiveByDocumentType(
      dto.companyId,
      InvoiceDocumentType.INVOICE,
    );

    if (!resolution)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
      resolution = await this.resolutionRepository.create(defaultResolution);
    }

    // 2. Validar vigencia de la resolución
    if (!resolution.isValidAt(new Date())) {
      throw new Error('La resolución de facturación asociada se encuentra vencida');
    }

    // 3. Validar disponibilidad de números
    if (!resolution.hasAvailableNumbers()) {
      throw new Error('La resolución de facturación ha consumido todos los consecutivos autorizados');
    }

    // 4. Generar y reservar el consecutivo oficial DIAN
    const nextNumber = await this.resolutionRepository.incrementAndGetNextNumber(
      resolution.id,
      dto.companyId,
    );

    // 5. Instanciar la factura
    const invoice = new Invoice({
      companyId: dto.companyId,
      resolutionId: resolution.id,
      number: nextNumber,
      items: dto.items,
      status: DocumentStatus.APPROVED, // Para ser emitida ante la DIAN debe estar aprobada
    });

    // 6. Calcular subtotales e impuestos
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

    // 7. Evaluar si el consumo de consecutivos supera el 90%
    const totalNumbers = resolution.toNumber - resolution.fromNumber + 1;
    const consumed = resolution.currentNumber - resolution.fromNumber;
    if (consumed / totalNumbers >= 0.9)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }-${resolution.resolutionNumber} supera el 90% (${consumed}/${totalNumbers}). Por favor solicite una nueva resolución.`;
    }

    // 8. Persistir en la base de datos
    const created = await this.repo.create(invoice, options);
    created.resolutionWarning = invoice.resolutionWarning;
    return created;
  }
}

export default CreateInvoiceUseCase;
