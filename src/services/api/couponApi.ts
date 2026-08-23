export type DiscountType = "FIXED";
export type CouponStatus = "ACTIVE" | "PAUSED" | "EXPIRED";

export interface CouponRegisterPayload {
  couponName: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number | null;
  validFrom: string;
  validTo: string;
}

export async function registerCoupon(payload: CouponRegisterPayload): Promise<string> {
  const coupons = JSON.parse(localStorage.getItem("fitloop_mock_coupons") ?? "[]") as CreatedCouponDTO[];
  const created: CreatedCouponDTO = {
    id: Date.now(), title: payload.couponName, discountText: `${payload.discountValue.toLocaleString()}원 할인`,
    minOrderText: `${payload.minOrderValue.toLocaleString()}원 이상 구매 시`,
    periodText: `${payload.validFrom} ~ ${payload.validTo}`, status: "ACTIVE", issuedCount: 0, usedCount: 0,
  };
  localStorage.setItem("fitloop_mock_coupons", JSON.stringify([created, ...coupons]));
  return "쿠폰이 등록되었습니다.";
}

export interface CreatedCouponDTO {
  id: number;
  title: string;
  discountText: string;
  minOrderText: string;
  periodText: string;
  status: CouponStatus;
  issuedCount: number;
  usedCount: number;
}

export async function fetchMyCreatedCoupons(): Promise<CreatedCouponDTO[]> {
  const saved = typeof window !== "undefined" ? localStorage.getItem("fitloop_mock_coupons") : null;
  return saved ? JSON.parse(saved) : [{
    id: 1, title: "첫 구매 웰컴 쿠폰", discountText: "5,000원 할인", minOrderText: "30,000원 이상 구매 시",
    periodText: "발급 후 30일", status: "ACTIVE", issuedCount: 128, usedCount: 43,
  }];
}
