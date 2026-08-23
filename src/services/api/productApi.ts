/* eslint-disable */
import { addProduct, findProduct, getProducts, mockDelay } from "@/data/mockStore";

export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  includeShipping: boolean;
  likeCount: number;
  createdAt: string;
  imageUrls: string[];
  tags?: string[];
  free: boolean;
  likedByMe: boolean;
}

export interface ProductDetail extends ProductResponse {
  description?: string;
  category?: string;
  sellerName?: string;
  rating?: number;
  reviewCount?: number;
  condition?: string;
  profileImages: string;
}

// 최근 상품 조회
export const fetchRecentProducts = async (
  page: number,
  size = 9
): Promise<ProductResponse[]> => {
  await mockDelay();
  return getProducts().slice(page * size, (page + 1) * size);
};

// 인기 상품 조회
export const fetchPopularProducts = async (
  page: number,
  size = 9
): Promise<ProductResponse[]> => {
  await mockDelay();
  return getProducts().sort((a, b) => b.likeCount - a.likeCount).slice(page * size, (page + 1) * size);
};

// 카테고리 상품 조회
export const fetchCategoryProducts = async (
  page: number,
  categoryCode: string,
  gender: string,
  size = 9
): Promise<ProductResponse[]> => {
  await mockDelay();
  void categoryCode;
  void gender;
  return getProducts().slice(page * size, (page + 1) * size);
};

// 상품 등록
export const registerProduct = async (productData: any) => {
  await mockDelay();
  return addProduct(productData);
};

// 상품 상세 조회
export const fetchProductDetail = async (
  id: string | number
): Promise<ProductDetail> => {
  await mockDelay();
  return findProduct(id);
};
