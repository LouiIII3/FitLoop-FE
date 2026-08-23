/* eslint-disable */
import { addCartId, clearCartIds, findProduct, getCartIds, mockDelay, removeCartId } from '@/data/mockStore';

export const fetchCartItems = async () => {
  await mockDelay();
  return getCartIds().map((id, index) => {
    const product = findProduct(id);
    return { cartId: index + 1, productId: id, productName: product.name, price: product.price,
      category: product.category, sellerNickname: product.sellerName, sellerId: index % 2 + 1,
      imageUrls: product.imageUrls };
  });
};

export const addToCart = async (productId: number): Promise<any> => {
    addCartId(productId);
    return { success: true };
  };
  
  export const removeFromCart = async (productId: number): Promise<any> => {
    removeCartId(productId);
    return { success: true };
  };
  

export const clearCart = async () => {
  clearCartIds();
  return { success: true };
};
