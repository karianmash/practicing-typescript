import { customersURL } from './config';
import { Customer } from './interfaces';

export async function getProducts(): Promise<Customer[]> {
  const response: Response = await fetch(customersURL);
  const products: Customer[] = await response.json();
  return products;
}
