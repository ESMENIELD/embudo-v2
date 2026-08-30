import { products } from "../lib/products";

export function getAllProducts() {
  return products.filter((product) => product.active);
}

export function getProductById(productId) {
  return products.find(
    (product) => product.id === productId && product.active
  );
}