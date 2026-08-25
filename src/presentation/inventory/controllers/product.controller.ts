import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get,
  param,
  post,
  patch,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import {CreateProductUseCase} from '../../../application/inventory/use-cases/create-product.use-case';
import {GetProductsByCompanyUseCase} from '../../../application/inventory/use-cases/get-products-by-company.use-case';
import {Product} from '../../../domain/inventory/entities/product.entity';
import {ProductRepository} from '../../../infrastructure/inventory/repositories/product.repository';
import {ApiResponse} from '../../../shared/responses/api.response';

export class ProductController {
  constructor(
    @repository(ProductRepository)
    private productRepository: ProductRepository,
    @inject(RestBindings.Http.RESPONSE)
    private responseObj: Response,
    @inject('currentCompanyId')
    private currentCompanyId: string,
  ) {}

  @post('/products', {
    responses: {
      '201': {
        description: 'Product model instance',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {type: 'boolean'},
                message: {type: 'string'},
                data: {'x-ts-type': Product},
              },
            },
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: [
              'name',
              'purchasePrice',
              'salePrice',
              'sku',
            ],
            properties: {
              companyId: {type: 'string'},
              name: {type: 'string'},
              sku: {type: 'string'},
              purchasePrice: {type: 'number'},
              salePrice: {type: 'number'},
              stockMin: {type: 'number'},
              active: {type: 'boolean'},
              inventoryAccountCode: {type: 'string'},
              costAccountCode: {type: 'string'},
              taxPercentage: {type: 'string'},
              unitOfMeasure: {type: 'string'},
              warehouseId: {type: 'string'},
              quantity: {type: 'number'},
            },
          },
        },
      },
    })
    productData: Partial<Product>,
  ): Promise<ApiResponse<Product>> {
    try {
      productData.companyId = this.currentCompanyId;
      const useCase = new CreateProductUseCase(this.productRepository);
      this.responseObj.status(201);
      const product = await useCase.execute(productData);
      return ApiResponse.success(product, 'Producto creado exitosamente');
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @get('/products', {
    responses: {
      '200': {
        description: 'Array of Product model instances',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {type: 'boolean'},
                message: {type: 'string'},
                data: {type: 'array', items: {'x-ts-type': Product}},
              },
            },
          },
        },
      },
    },
  })
  async getByCompany(
    @param.query.string('companyId') companyId?: string,
  ): Promise<ApiResponse<Product[]>> {
    try {
      const useCase = new GetProductsByCompanyUseCase(this.productRepository);
      const products = await useCase.execute(companyId || this.currentCompanyId);
      return ApiResponse.success(
        products,
        'Productos recuperados exitosamente',
      );
    } catch (err: unknown) { this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  @patch('/products/{id}', {
    responses: {
      '200': {
        description: 'Producto actualizado exitosamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {type: 'boolean'},
                message: {type: 'string'},
              },
            },
          },
        },
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {type: 'string'},
              sku: {type: 'string'},
              purchasePrice: {type: 'number'},
              salePrice: {type: 'number'},
              stockMin: {type: 'number'},
              active: {type: 'boolean'},
              inventoryAccountCode: {type: 'string'},
              costAccountCode: {type: 'string'},
              taxPercentage: {type: 'string'},
              unitOfMeasure: {type: 'string'},
              warehouseId: {type: 'string'},
            },
          },
        },
      },
    })
    productData: Partial<Product>,
  ): Promise<ApiResponse<void>> {
    try {
      const existing = await this.productRepository.findById(id);
      if (!existing || existing.companyId !== this.currentCompanyId) {
        this.responseObj.status(404);
        return ApiResponse.error('Product not found');
      }

      const updated = new Product({
        ...existing,
        ...productData,
        id,
        companyId: this.currentCompanyId
      });

      await this.productRepository.save(updated);
      this.responseObj.status(200);
      return ApiResponse.success(undefined, 'Producto actualizado exitosamente');
    } catch (err: unknown) {
      this.responseObj.status(422);
      return ApiResponse.error(
        err instanceof Error ? err.message : String(err),
      );
    }
  }
}
