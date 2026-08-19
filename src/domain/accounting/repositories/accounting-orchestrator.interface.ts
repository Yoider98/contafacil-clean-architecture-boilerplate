import {LedgerEntry} from '../entities/ledger-entry.entity';

export interface SaleAccountingData {
  companyId: string;
  saleId: string;
  items: Array<{
    productId: string;
    inventoryAccountCode: string; // cuenta 1435 del producto
    quantity: number;
    salePrice: number; // precio de venta por unidad
    purchaseCost: number; // costo de compra por unidad (para cálculo costo de ventas)
    taxAmount?: number; // IVA total por la cantidad de este ítem
  }>;
  paymentMethod: string;
  total: number;
  taxTotal?: number;
  thirdPartyId?: string;
}

export interface PurchaseAccountingData {
  companyId: string;
  purchaseId: string;
  items: Array<{
    productId: string;
    inventoryAccountCode: string; // cuenta 1435 del producto
    quantity: number;
    cost: number; // costo por unidad
    taxAmount?: number; // IVA total por la cantidad de este ítem
  }>;
  total: number;
  taxTotal?: number;
  thirdPartyId?: string;
}

export interface InventoryAdjustAccountingData {
  companyId: string;
  movementId: string;
  productId: string;
  inventoryAccountCode: string; // cuenta 1435 del producto
  quantity: number;
  unitCost: number;
  isPositive: boolean; // true = entrada, false = salida por ajuste
}

export interface IAccountingOrchestrator {
  /**
   * Registra asientos contables automáticos para una venta:
   * - DB Caja/Bancos (1105/1110) + CR Ingresos (4135)
   * - DB Costo ventas (6135) + CR Inventario (1435)
   */
  recordSaleAccounting(data: SaleAccountingData): Promise<LedgerEntry[]>;

  /**
   * Registra asientos contables automáticos para una compra:
   * - DB Inventario (1435) + CR Proveedores (2205)
   */
  recordPurchaseAccounting(
    data: PurchaseAccountingData,
  ): Promise<LedgerEntry[]>;

  /**
   * Registra asientos contables para ajustes de inventario.
   * Positivo: DB Inventario + CR Otros ingresos
   * Negativo: DB Gasto + CR Inventario
   */
  recordInventoryAdjustAccounting(
    data: InventoryAdjustAccountingData,
  ): Promise<LedgerEntry[]>;
}
