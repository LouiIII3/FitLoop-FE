type CreateCouponTemplateReq = {
  name: string;
  code: string;
  discountType: 'FIXED' | 'PERCENT';
  discountValue: number;
  maxDiscount: number | null;
  minOrderAmount: number;
  validFrom: string | null;
  validUntil: string | null;
  validDaysAfterIssue: number | null;
  stackable: boolean;
  targetType: 'ALL' | 'SELLER' | 'PRODUCT' | 'CATEGORY';
  targetIdsCsv: string;
  status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
  imageUrls?: string[];
};

export async function createCouponTemplate(body: CreateCouponTemplateReq) {
  const templates = JSON.parse(localStorage.getItem("fitloop_mock_coupon_templates") ?? "[]");
  localStorage.setItem("fitloop_mock_coupon_templates", JSON.stringify([{ id: Date.now(), ...body }, ...templates]));
  return { success: true };
}

export async function issueCouponToUser(body: { templateCode: string; userId: number }) {
  const issues = JSON.parse(localStorage.getItem("fitloop_mock_coupon_issues") ?? "[]");
  localStorage.setItem("fitloop_mock_coupon_issues", JSON.stringify([body, ...issues]));
  return { success: true };
}
