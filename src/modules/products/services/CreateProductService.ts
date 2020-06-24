import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepostory: IProductsRepository,
  ) {}

  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const checkProductExists = await this.productsRepostory.findByName(name);

    if (checkProductExists) {
      throw new AppError('Product name already used');
    }

    const product = await this.productsRepostory.create({
      name,
      price,
      quantity,
    });

    return product;
  }
}

export default CreateProductService;
