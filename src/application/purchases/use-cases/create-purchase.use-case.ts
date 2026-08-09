import {AccountingOrchestratorService} from '../../../application/accounting/services/accounting-orchestrator.service';
import {
  IAccountRepository,
  ILedgerEntryRepository,
} from '../../../domain/accounting/repositories/accounting.repository.interface';
import {IInventoryRepository} from '../../../domain/inventory/repositories/inventory.repository.interface';
import {MovementType} from '../../../domain/inventory/enums/movement-type.enum';
import {InventoryMovement} from '../../../domain/inventory/entities/inventory-movement.entity';
import {IProductRepository} from '../../../domain/inventory/repositories/product.repository.interface';
import {PurchaseItem} from '../../../domain/purchases/entities/purchase-item.entity';
import {Purchase} from '../../../domain/purchases/entities/purchase.entity';
import {
  IPurchaseItemRepository,
  IPurchaseRepository,
} from '../../../domain/purchases/repositories/purchase.repository.interface';

export interface CreatePurchaseItemDto {
  productId: string;
  quantity: number;
  cost: number;
  warehouseId: string;
}

export interface CreatePurchaseDto {
  companyId: string;
  supplier?: string;
  items: CreatePurchaseItemDto[];
}

export class CreatePurchaseUseCase {
  constructor(
    private readonly inventoryRepository: IInventoryRepository,
    private readonly purchaseRepository: IPurchaseRepository,
    private readonly purchaseItemRepository: IPurchaseItemRepository,
    private readonly productRepository?: IProductRepository,
    private readonly accountRepository?: IAccountRepository,
    private readonly ledgerEntryRepository?: ILedgerEntryRepository,
  )  { /* Inyectado por constructor */ }

  async execute(dto: CreatePurchaseDto): Promise<Purchase>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    // 2. Calcular total
    const total = dto.items.reduce(
      (sum, item) => sum + item.cost * item.quantity,
      0,
    );

    // 3. Persistir compra
    const purchase = await this.purchaseRepository.create(
      new Purchase({
        companyId: dto.companyId,
        supplier: dto.supplier,
        total,
        createdAt: new Date(),
      }),
    );

    // 4. Persistir ítems y registrar movimiento IN por cada producto
    const accountingItems: Array<{
      productId: string;
      inventoryAccountCode: string;
      quantity: number;
      cost: number;
    }> = [];

    for (const item of dto.items)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }),
      );

      await this.inventoryRepository.registerMovement(
        new InventoryMovement({
          companyId: dto.companyId,
          productId: item.productId,
          warehouseId: item.warehouseId,
          type: MovementType.IN,
          quantity: item.quantity,
          referenceType: 'PURCHASE',
          referenceId: purchase.id,
        }),
      );

      // Obtener cuenta contable del producto
      let inventoryAccountCode = '1435';
      if (this.productRepository)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
      }

      accountingItems.push({
        productId: item.productId,
        inventoryAccountCode,
        quantity: item.quantity,
        cost: item.cost,
      });
    }

    // 5. Registrar asientos contables automáticos
    if (this.accountRepository && this.ledgerEntryRepository)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  })
        .catch(err => {
          // No bloqueamos la compra si falla el registro contable
          console.error(
            '[Accounting] Error registrando asientos de compra:',
            err?.message,
          );
        });
    }

    return purchase;
  }
}
