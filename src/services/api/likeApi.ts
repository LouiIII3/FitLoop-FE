import { setProductLike } from "@/data/mockStore";

// 좋아요
export const likeProduct = async (id: number) => {
  setProductLike(id, true);
};

// 좋아요 취소
export const unlikeProduct = async (id: number) => {
  setProductLike(id, false);
};
