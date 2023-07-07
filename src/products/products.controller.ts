/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  private currentId = 1; // Initialize the currentId property to 1

  constructor(private readonly productsService: ProductsService) { }
  // Inject the ProductsService instance into the controller

  @Post()
  addProduct(
    @Body('title') prodTitle: string, // Extract the 'title' property from the request body
    @Body('description') prodDesc: string, // Extract the 'description' property from the request body
    @Body('price') prodPrice: number, // Extract the 'price' property from the request body
  ) {
    const generatedId = this.currentId; // Store the currentId value in generatedId
    this.currentId++; // Increment the currentId by 1 for the next product
    this.productsService.insertProduct(prodTitle, prodDesc, prodPrice); // Call the insertProduct method of the productsService to add the product
    return { id: generatedId }; // Return an object with the generatedId as the response
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts(); // Call the getProducts method of the productsService to retrieve all products
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId); // Call the getSingleProduct method of the productsService to retrieve a single product based on the provided ID
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string, // Extract the 'id' parameter value from the request URL
    @Body('title') prodTitle: string, // Extract the 'title' property from the request body
    @Body('description') prodDesc: string, // Extract the 'description' property from the request body
    @Body('price') prodPrice: number, // Extract the 'price' property from the request body
  ) {
    this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice); // Call the updateProduct method of the productsService to update the product
    return null; // Return null as the response
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    this.productsService.deleteProduct(prodId); // Call the deleteProduct method of the productsService to delete the product
    return null; // Return null as the response
  }
}
