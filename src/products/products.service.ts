/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = []; // array to store products
  private currentId = 1;

  insertProduct(title: string, desc: string, price: number) {
    const prodId = this.currentId.toString(); // Convert currentId to string and assign it to prodId
    const newProduct = new Product(prodId, title, desc, price); // Create a new Product instance
    this.products.push(newProduct); // Add the newProduct to the products array
    this.currentId++;
    return prodId;
  }

  getProducts() {
    return [...this.products]; // Return a shallow copy of the products array
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0]; // Call the findProduct method to retrieve the product and its index
    return { ...product }; // Return a shallow copy of the product
  }

  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(productId); // Call the findProduct method to retrieve the product and its index
    const updatedProduct = { ...product }; // Create a shallow copy of the product
    if (title) {
      updatedProduct.title = title; // Update the title property if there is data
    }
    if (desc) {
      updatedProduct.description = desc; // Update the description property if there is data
    }
    if (price) {
      updatedProduct.price = price; // Update the price property if there is data
    }
    this.products[index] = updatedProduct; // Replace the product at the specified index with the updatedProduct
  }

  deleteProduct(prodId: string) {
    const index = this.findProduct(prodId)[1]; // Call the findProduct method to get the product index
    this.products.splice(index, 1); // Remove the product from the products array at the specified index
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id); // Find the product with the specified id
    const product = this.products[productIndex]; // get the product from the products array based on the index
    if (!product) {
      throw new NotFoundException('Could not find product.'); //  if the product is not found
    }
    return [product, productIndex]; // Return the product and its index as a tuple
  }
}
