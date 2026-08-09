import {
  InvoiceResolution,
  InvoiceDocumentType,
} from '../../../domain/invoices/entities/invoice-resolution.entity';
import {IInvoiceResolutionRepository} from '../../../domain/invoices/repositories/invoice-resolution.repository';

export interface CreateInvoiceResolutionDTO {
  companyId: string;
  resolutionNumber: string;
  prefix: string;
  fromNumber: number;
  toNumber: number;
  validFrom: Date;
  validTo: Date;
  technicalKey?: string;
  documentType?: InvoiceDocumentType;
}

export class CreateInvoiceResolutionUseCase {
  constructor(private resolutionRepository: IInvoiceResolutionRepository)  { /* Inyectado por constructor */ }

  async execute(dto: CreateInvoiceResolutionDTO): Promise<InvoiceResolution>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    if (dto.fromNumber >= dto.toNumber)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    if (new Date(dto.validFrom) >= new Date(dto.validTo)) {
      throw new Error(
        'La fecha inicial debe ser menor a la fecha de vencimiento',
      );
    }

    const existing = await this.resolutionRepository.findByPrefix(
      dto.companyId,
      dto.prefix,
    );

    if (existing)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }`,
      );
    }

    const resolution = new InvoiceResolution({
      companyId: dto.companyId,
      resolutionNumber: dto.resolutionNumber,
      prefix: dto.prefix,
      fromNumber: dto.fromNumber,
      toNumber: dto.toNumber,
      currentNumber: dto.fromNumber,
      validFrom: new Date(dto.validFrom),
      validTo: new Date(dto.validTo),
      technicalKey: dto.technicalKey,
      documentType: dto.documentType ?? InvoiceDocumentType.INVOICE,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.resolutionRepository.create(resolution);
  }
}
