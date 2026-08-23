export interface MockProduct {
  id: number;
  name: string;
  price: number;
  includeShipping: boolean;
  likeCount: number;
  createdAt: string;
  imageUrls: string[];
  tags: string[];
  free: boolean;
  likedByMe: boolean;
  description: string;
  category: string;
  sellerName: string;
  rating: number;
  reviewCount: number;
  condition: string;
  profileImages: string;
}

const image = (index: number) => `/assets/products/mock/product-${String(index).padStart(2, "0")}.png`;

export const mockProducts: MockProduct[] = [
  [1, "빈티지 워싱 데님 재킷", 42000, "아우터", ["빈티지", "데님"]],
  [2, "미니멀 크림 니트", 28000, "상의", ["미니멀", "니트"]],
  [3, "클래식 블랙 로퍼", 55000, "신발", ["클래식", "로퍼"]],
  [4, "오버핏 후드 스웨트", 32000, "상의", ["캐주얼", "후드"]],
  [5, "와이드 카고 팬츠", 39000, "하의", ["스트릿", "카고"]],
  [6, "레더 숄더백", 47000, "가방", ["레더", "데일리"]],
  [7, "울 블렌드 롱 코트", 89000, "아우터", ["겨울", "코트"]],
  [8, "플리츠 롱 스커트", 35000, "하의", ["페미닌", "스커트"]],
  [9, "컬러 블록 스니커즈", 61000, "신발", ["스니커즈", "유니크"]],
  [10, "스트라이프 셔츠", 26000, "상의", ["셔츠", "봄"]],
  [11, "실버 체인 목걸이", 18000, "액세서리", ["실버", "포인트"]],
  [12, "코튼 볼캡 무료나눔", 0, "액세서리", ["무료나눔", "볼캡"]],
].map(([id, name, price, category, tags], index) => ({
  id: id as number,
  name: name as string,
  price: price as number,
  includeShipping: index % 2 === 0,
  likeCount: 18 + index * 13,
  createdAt: new Date(Date.now() - index * 86400000).toISOString(),
  imageUrls: [image(index), image(index)],
  tags: tags as string[],
  free: price === 0,
  likedByMe: false,
  description: "깨끗하게 보관한 패션 아이템입니다. 사진과 설명을 확인하시고 편하게 문의해 주세요.",
  category: category as string,
  sellerName: ["모노샵", "옷장정리", "빈티지룸"][index % 3],
  rating: 4.7 + (index % 3) * 0.1,
  reviewCount: 12 + index,
  condition: index % 3 === 0 ? "새상품" : "사용감 적음",
  profileImages: `https://picsum.photos/seed/fitloop-profile-${index % 3}/200/200`,
}));

const PRODUCTS_KEY = "fitloop_mock_products";
const CART_KEY = "fitloop_mock_cart";
const LIKES_KEY = "fitloop_mock_likes";

const read = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
};

const write = <T>(key: string, value: T) => {
  if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(value));
};

export const getProducts = () => {
  const added = read<MockProduct[]>(PRODUCTS_KEY, []);
  const likes = read<number[]>(LIKES_KEY, []);
  return [...added, ...mockProducts].map((product) => ({
    ...product,
    likedByMe: likes.includes(product.id),
    likeCount: product.likeCount + (likes.includes(product.id) ? 1 : 0),
  }));
};

export const findProduct = (id: string | number) =>
  getProducts().find((product) => product.id === Number(id)) ?? mockProducts[0];

export const addProduct = (input: Record<string, unknown>) => {
  const added = read<MockProduct[]>(PRODUCTS_KEY, []);
  const product: MockProduct = {
    ...mockProducts[0],
    id: Date.now(),
    name: String(input.productName ?? "새 상품"),
    price: Number(input.price ?? 0),
    free: Boolean(input.isFree),
    includeShipping: Boolean(input.includeShipping),
    category: String(input.category ?? "기타"),
    condition: String(input.productCondition ?? "중고"),
    description: String(input.productDescription ?? ""),
    tags: Array.isArray(input.tags) ? input.tags.map(String) : [],
    imageUrls: Array.isArray(input.images) && input.images[0] !== "없음"
      ? input.images.map(String)
      : [image(0)],
    createdAt: new Date().toISOString(),
    likeCount: 0,
    likedByMe: false,
  };
  write(PRODUCTS_KEY, [product, ...added]);
  return product;
};

export const setProductLike = (id: number, liked: boolean) => {
  const likes = read<number[]>(LIKES_KEY, []);
  write(LIKES_KEY, liked ? [...new Set([...likes, id])] : likes.filter((item) => item !== id));
};

export const getCartIds = () => read<number[]>(CART_KEY, [2, 5]);
export const addCartId = (id: number) => write(CART_KEY, [...new Set([...getCartIds(), id])]);
export const removeCartId = (id: number) => write(CART_KEY, getCartIds().filter((item) => item !== id));
export const clearCartIds = () => write(CART_KEY, []);

export const mockDelay = async () => new Promise((resolve) => setTimeout(resolve, 120));
