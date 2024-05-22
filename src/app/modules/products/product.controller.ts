import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.zod.validation';
import { ZodError } from 'zod';

const createProduct = async (req: Request, res: Response) => {
  // creating schema validation by zod

  try {
    const productData = req.body;
    const zodparseData = productValidationSchema.parse(productData);
    const result = await ProductServices.createProduct(zodparseData);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: err.errors,
      });
    } else {
      res.status(500).json({
        success: true,
        message: 'Something wrong!',
        error: err,
      });
    }
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    let result;
    if (searchTerm) {
      result = await ProductServices.getProductByName(searchTerm as string);
      res.status(200).json({
        success: true,
        message: `Products matching search term ${searchTerm} fetched successfully!`,
        data: result,
      });
    } else {
      result = await ProductServices.getAllProducts();
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

const getSingleProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.getSingleProductFromdb(productId);
    res.status(200).json({
      success: true,
      message: 'Products retrived successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: 'Something wrong!',
      error: err,
    });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const productData = req.body;

    const result = await ProductServices.updateProductFromDb(
      productId,
      productData,
    );
    res.status(200).json({
      success: true,
      message: 'Products updated successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: 'Something wrong!',
      error: err,
    });
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.deleteProductFromDb(productId);
    res.status(200).json({
      success: true,
      message: 'Products deleted successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: 'Something wrong!',
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProducts,
  updateProduct,
  deleteProduct,
};
