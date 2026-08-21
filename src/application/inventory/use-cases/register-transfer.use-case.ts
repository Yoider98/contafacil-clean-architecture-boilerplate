import {InventoryMovement} from '../../../domain/inventory/entities/inventory-movement.entity';
import {MovementType} from '../../../domain/inventory/enums/movement-type.enum';
import {IInventoryRepository} from '../../../domain/inventory/repositories/inventory.repository.interface';
import {IProductRepository} from '../../../domain/inventory/repositories/product.repository.interface';
import {IWarehouseRepository} from '../../../domain/inventory/repositories/warehouse.repository.interface';
import {PostgresDataSource} from '../../../infrastructure/database/datasources/postgres.datasource';
import {IsolationLevel} from '@loopback/repository';

export interface RegisterTransferDto {
  companyId: string;
  productId: string;
  sourceWarehouseId: string;
  destWarehouseId: string;
  quantity: number;
  userId?: string;
  notes?: string;
}

export class RegisterTransferUseCase {
  constructor(
    private readonly inventoryRepository: IInventoryRepository,
    private readonly productRepository: IProductRepository,
    private readonly warehouseRepository: IWarehouseRepository,
    private readonly dataSource: PostgresDataSource,
  )  { /* Inyectado por constructor */ }

  async execute(
    dto: RegisterTransferDto,
  ): Promise< {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }> {
    if (!dto.companyId) throw new Error('companyId is required');
    if (!dto.productId) throw new Error('productId is required');
    if (!dto.sourceWarehouseId) throw new Error('sourceWarehouseId is required');
    if (!dto.destWarehouseId) throw new Error('destWarehouseId is required');
    if (dto.sourceWarehouseId === dto.destWarehouseId)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    if (!dto.quantity || dto.quantity <= 0)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    // 1. Validar que el producto y las bodegas existan
    const product = await this.productRepository.findById(dto.productId);
    if (!product || product.companyId !== dto.companyId)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    const sourceWarehouse = await this.warehouseRepository.findById(dto.sourceWarehouseId);
    if (!sourceWarehouse || sourceWarehouse.companyId !== dto.companyId)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    const destWarehouse = await this.warehouseRepository.findById(dto.destWarehouseId);
    if (!destWarehouse || destWarehouse.companyId !== dto.companyId)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    // 2. Validar existencias en origen
    const currentStock = await this.inventoryRepository.calculateStock(
      dto.companyId,
      dto.productId,
      dto.sourceWarehouseId,
    );
    if (currentStock - dto.quantity < 0)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }, Required: ${dto.quantity}`,
      );
    }

    // 3. Iniciar Transacción SQL
    const tx = await this.dataSource.beginTransaction(
      IsolationLevel.READ_COMMITTED,
    );

    const referenceId = 'TRANS-' + Date.now();

    try {
      // 4. Salida en origen (TRANSFER_OUT)
      const outMovement = await this.inventoryRepository.registerMovement(
        new InventoryMovement({
          companyId: dto.companyId,
          productId: dto.productId,
          warehouseId: dto.sourceWarehouseId,
          type: MovementType.OUT,
          quantity: dto.quantity,
          referenceType: 'TRANSFER_OUT',
          referenceId,
        }),
        {transaction: tx},
      );

      // 5. Entrada en destino (TRANSFER_IN)
      const inMovement = await this.inventoryRepository.registerMovement(
        new InventoryMovement({
          companyId: dto.companyId,
          productId: dto.productId,
          warehouseId: dto.destWarehouseId,
          type: MovementType.IN,
          quantity: dto.quantity,
          referenceType: 'TRANSFER_IN',
          referenceId,
        }),
        {transaction: tx},
      );

      await tx.commit();
      return {outMovement, inMovement};
    } catch (err: unknown)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
  }
}
