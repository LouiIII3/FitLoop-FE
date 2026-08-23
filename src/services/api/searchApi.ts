import { ProductResponse } from "./productApi";
import { getProducts, mockDelay } from "@/data/mockStore";

export async function fetchSearchResults(keyword: string): Promise<ProductResponse[]> {
  await mockDelay();
  const query = keyword.trim().toLowerCase();
  return getProducts().filter((product) =>
    [product.name, product.category, ...product.tags].some((value) => value.toLowerCase().includes(query))
  ) as ProductResponse[];
}
