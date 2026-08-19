import {IInvoiceRepository} from '../../../domain/invoices/repositories/invoice.repository';
import {ICompanyRepository} from '../../../domain/companies/repositories/company.repository.interface';
import {IThirdPartyRepository} from '../../../domain/third-parties/repositories/third-party.repository';
import {XmlGeneratorService} from '../services/xml-generator.service';
import {calculateCufe} from '../../../shared/utils/cufe.calculator';
import DianStatus from '../../../domain/invoices/enums/dian-status.enum';
import DocumentStatus from '../../../domain/shared/enums/document-status.enum';
import {Invoice} from '../../../domain/invoices/entities/invoice.entity';
import {IInventoryRepository} from '../../../domain/inventory/repositories/inventory.repository.interface';
import {IProductRepository} from '../../../domain/inventory/repositories/product.repository.interface';
import {InventoryMovement} from '../../../domain/inventory/entities/inventory-movement.entity';
import {MovementType} from '../../../domain/inventory/enums/movement-type.enum';
import ProductType from '../../../domain/inventory/enums/product-type.enum';
import {IAccountRepository, ILedgerEntryRepository} from '../../../domain/accounting/repositories/accounting.repository.interface';
import {AccountingOrchestratorService} from '../../accounting/services/accounting-orchestrator.service';

export class IssueElectronicInvoiceUseCase {
  constructor(
    private invoiceRepository: IInvoiceRepository,
    private companyRepository: ICompanyRepository,
    private thirdPartyRepository: IThirdPartyRepository,
    private xmlGeneratorService: XmlGeneratorService = new XmlGeneratorService(),
    private inventoryRepository?: IInventoryRepository,
    private productRepository?: IProductRepository,
    private accountRepository?: IAccountRepository,
    private ledgerEntryRepository?: ILedgerEntryRepository,
  ) {}

  async execute(invoiceId: string, nitBuyer: string, options?: any): Promise<Invoice>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    if (invoice.status !== DocumentStatus.APPROVED)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }`,
      );
    }

    const company = await this.companyRepository.findById(invoice.companyId);
    if (!company)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    const nitSeller = company.nit ?? '900000000'; // Fallback if missing

    // Generate CUFE
    const now = new Date();
    const issueDate = now.toISOString().split('T')[0];
    const issueTime =
      now.toISOString().split('T')[1].substring(0, 8) + '-05:00';

    const cufe = calculateCufe({
      invoiceNumber: invoice.number ?? 'SETP990001',
      issueDate,
      issueTime,
      subtotal: invoice.subtotal,
      iva: invoice.iva,
      total: invoice.total,
      nitSeller,
      nitBuyer,
      technicalKey: 'fc8a842a-18e0-4748-a83a-4e98f06f527c', // DIAN Mock Technical Key
      environment: '2', // Test
    });

    invoice.cufe = cufe;
    invoice.qr = `https://catalogo-vpfe.dian.gov.co/document/searchqc?documentkey=${cufe}`;
    invoice.dianStatus = DianStatus.PENDING;
    invoice.dianMessage = 'XML Generado. Listo para transmisión real.';

    // Generate XML
    invoice.xmlPayload = this.xmlGeneratorService.generateInvoiceXml(
      invoice,
      nitSeller,
      nitBuyer,
    );

    // Save changes
    await this.invoiceRepository.update(invoice, options);

    // Registrar salidas de inventario asociadas
    if (this.inventoryRepository && this.productRepository)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }),
            options,
          );
        }
      }
    }

    // Registrar asientos contables de la venta
    if (
      this.accountRepository &&
      this.ledgerEntryRepository &&
      this.productRepository
    )  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
      }

      const buyers = await this.thirdPartyRepository
        .find(invoice.companyId, {search: nitBuyer})
        .catch(() => []);
      const buyer = buyers.length > 0 ? buyers[0] : null;

      await orchestrator
        .recordSaleAccounting({
          companyId: invoice.companyId,
          saleId: invoice.id,
          items: itemsForAccounting,
          paymentMethod: 'CASH',
          total: invoice.total,
          taxTotal: invoice.iva,
          thirdPartyId: buyer?.id,
        })
        .catch(err => {
          console.error(
            '[Accounting] Error registrando asientos de factura:',
            err?.message,
          );
        });
    }

    return invoice;
  }
}
