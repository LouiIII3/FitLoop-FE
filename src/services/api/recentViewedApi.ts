import { ProductResponse } from "./productApi";
import { getProducts, mockDelay } from "@/data/mockStore";

export const fetchRecentViewedProducts = async (): Promise<ProductResponse[]> => {
  await mockDelay();
  return getProducts().slice(0, 6) as ProductResponse[];
};
