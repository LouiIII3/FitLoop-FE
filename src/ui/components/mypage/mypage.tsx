"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Typography, Button, List, Space, Image, Carousel } from "antd";
import { SettingOutlined, SwapOutlined, WalletOutlined } from "@ant-design/icons";
import BackButton from "@/ui/components/common/BackButton";
import { fetchRecentViewedProducts } from "@/services/api/recentViewedApi";
import { fetchWalletBalance } from "@/services/api/walletApi";
import ProductCard from "@/ui/components/common/ProductCard";
import { ProductResponse } from "@/services/api/productApi";
import Link from "next/link";

const { Title, Text } = Typography;

const MyPage: React.FC = () => {
  const router = useRouter();
  const [recentViewed, setRecentViewed] = useState<ProductResponse[]>([]);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadRecentViewed = async () => {
      try {
        const result = await fetchRecentViewedProducts();
        setRecentViewed(result);
      } catch (err) {
        console.error("최근 본 상품 불러오기 실패:", err);
      }
    };
    loadRecentViewed();
  }, []);

  useEffect(() => {
    const loadWallet = async () => {
      try {
        const balance = await fetchWalletBalance();
        setWalletBalance(balance);
      } catch (err) {
        console.error("FitPay 잔액 불러오기 실패:", err);
      }
    };
    loadWallet();
  }, []);

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;
    let targetScrollLeft = 0;
    let animationFrame: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      slider.scrollLeft = lerp(slider.scrollLeft, targetScrollLeft, 0.2);
      if (Math.abs(slider.scrollLeft - targetScrollLeft) > 0.5) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      isDragging = false;
      startX = e.pageX;
      scrollLeft = slider.scrollLeft;
      cancelAnimationFrame(animationFrame);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      const x = e.pageX;
      const walk = x - startX;
      if (Math.abs(walk) > 5) {
        isDragging = true;
        targetScrollLeft = scrollLeft - walk;
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const onMouseUp = () => {
      isDown = false;
      if (isDragging) {
        const preventClick = (e: MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();
          slider.removeEventListener("click", preventClick, true);
        };
        slider.addEventListener("click", preventClick, true);
      }
    };

    slider.addEventListener("mousedown", onMouseDown);
    slider.addEventListener("mousemove", onMouseMove);
    slider.addEventListener("mouseup", onMouseUp);
    slider.addEventListener("mouseleave", onMouseUp);

    slider.querySelectorAll("*").forEach((el) => {
      (el as HTMLElement).style.userSelect = "none";
      (el as HTMLElement).setAttribute("draggable", "false");
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      slider.removeEventListener("mousedown", onMouseDown);
      slider.removeEventListener("mousemove", onMouseMove);
      slider.removeEventListener("mouseup", onMouseUp);
      slider.removeEventListener("mouseleave", onMouseUp);
    };
  }, [recentViewed]);

  const banners = [
    "/assets/banners/banner_welcome_coupon.png",
    "/assets/banners/banner_winter_sale.png",
    "/assets/banners/banner_outer_category.png",
    "/assets/banners/banner_weekly_challenge.png",
    "/assets/banners/banner_notice.png",
  ];

  return (
    <div
      id="scrollable-container"
      className="max-w-[400px] mx-auto p-0 bg-[var(--bg-gray)] min-h-screen pb-[60px] overflow-auto"
    >
      <div className="bg-[var(--bg-white)] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BackButton />
            <Title level={4} className="m-0 text-[var(--text-black)]">
              마이페이지
            </Title>
          </div>
          <SettingOutlined
            className="text-[var(--icon-black)] text-lg cursor-pointer"
            onClick={() => router.push("/settings")}
          />
        </div>
        <div className="mt-4">
          <Text strong className="text-[var(--text-black)]">빵순이님, 안녕하세요 :)</Text>
        </div>

        <Card
          className="mt-4 w-full rounded-xl shadow-md bg-white border border-gray-100"
          styles={{ body: { padding: "20px" } }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/fitpay.svg"
                alt="FitPay"
                width={160}
                height={60}
                preview={false}
                className="opacity-95"
              />
            </div>

            <button
              aria-label="잔액 상세"
              onClick={() => router.push("/wallet")}
              className="flex flex-col items-end group text-right"
            >
              <span className="text-sm text-gray-500 mb-1">보유 잔액</span>
              <div className="flex items-center gap-1">
                <span className="text-3xl font-extrabold text-gray-900 tracking-tight group-hover:text-[#3B475C] transition-colors">
                  {walletBalance.toLocaleString()}<span className="text-2xl font-semibold ml-0.5">원</span>
                </span>
                <span className="text-gray-400 text-lg font-bold group-hover:translate-x-0.5 transition-transform">›</span>
              </div>
              <span className="text-xs text-gray-400 mt-1">터치하여 상세보기</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-10 mt-6">
            <Button
              block
              size="large"
              icon={<WalletOutlined />}
              className="
                h-12
                text-white font-semibold
                rounded-[12px]
                bg-[#3B475C] hover:!bg-[#2F3C52] active:!bg-[#2A354B]
                focus:!ring-2 focus:!ring-offset-2 focus:!ring-[#3B475C]
                border-0 transition
              "
              onClick={() => router.push('/wallet/charge')}
            >
              충전하기
            </Button>

            <Button
              block
              size="large"
              icon={<SwapOutlined />}
              className="
                h-12
                bg-white text-black font-semibold
                rounded-[12px]
                border border-[#E5E7EB]
                hover:!border-[#D1D5DB] hover:!bg-[#FAFAFA]
                active:!bg-[#F5F5F5]
                focus:!ring-2 focus:!ring-offset-2 focus:!ring-[#E5E7EB]
                shadow-sm transition
              "
              onClick={() => router.push('/wallet/transfer')}
            >
              계좌 송금
            </Button>
          </div>
        </Card>

        <Card className="mt-4 bg-[var(--bg-light-gray)] rounded-xl" styles={{ body: { display: "flex", alignItems: "center", justifyContent: "space-between" } }}>
          <div className="flex items-center">
            <Image src="/assets/sprout.png" alt="새싹" width={40} preview={false} />
            <div className="ml-2">
              <Text strong className="text-[var(--text-black)]">새싹</Text>
              <br />
              <Text className="text-[var(--text-gray)] text-xs">마일리지 1.5% 적립 & 쿠폰팩</Text>
            </div>
          </div>
          <Link href="/mypage/benefits">
            <Button className="bg-white text-black border border-gray-300 hover:bg-gray-100 transition" size="small">
              혜택 보기
            </Button>
          </Link>
        </Card>

        <Card className="mt-4">
          <Space size="large" wrap={false}>
            {["구매내역", "판매내역", "리뷰", "쿠폰", "포인트"].map((label, index) => (
              <div key={label}>
                <Text className="text-[var(--text-gray)] text-xs">{label}</Text>
                <br />
                <Text strong className="text-[var(--text-black)] text-sm">{["34", "100", "3", "5", "1,000p"][index]}</Text>
              </div>
            ))}
          </Space>
        </Card>
      </div>

      <div className="mt-4 max-h-[250px] overflow-hidden">
        <Carousel autoplay dots>
          {banners.map((banner, index) => (
            <div key={index}>
              <Image
                src={banner}
                alt={`광고 ${index + 1}`}
                width="100%"
                height="auto"
                preview={false}
                className="object-cover max-h-[250px]"
              />
            </div>
          ))}
        </Carousel>
      </div>

      <Card className="mt-4 rounded-none">
        <Text className="text-[var(--text-black)] text-base font-semibold block mb-2">최근 본 상품</Text>
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-scroll scrollbar-hide cursor-grab px-1"
          style={{ scrollBehavior: "auto" }}
        >
          {recentViewed.length > 0 ? (
            recentViewed.map((product) => (
              <div key={product.id} className="min-w-[160px] max-w-[160px] flex-shrink-0 shadow-sm" style={{ background: "var(--bg-white)" }}>
                <ProductCard
                  variant="recent"
                  product={{
                    id: product.id,
                    name: product.name,
                    imageUrl: product.imageUrls?.[0] ?? "/assets/product/no-image.png",
                    price: product.free ? "무료나눔" : `${product.price.toLocaleString()}원`,
                    tags: product.tags ?? [],
                    likedByMe: product.likedByMe,
                    likeCount: product.likeCount,
                  }}
                />
              </div>
            ))
          ) : (
            <Text className="text-[var(--text-gray)]">최근 본 상품이 없습니다.</Text>
          )}
        </div>
      </Card>

      <div className="mt-4 p-4">
        <Title level={5} className="mb-2 text-[var(--text-black)]">(주) 핏루프 사업자 정보</Title>
        <List size="small">
          {[
            { label: "대표이사", value: "이성희" },
            { label: "주소", value: "마포구 월드컵북로 481" },
            { label: "이메일", value: "jikdyoutu@gmail.com" },
          ].map(({ label, value }) => (
            <List.Item key={label} className="flex min-w-0">
              <Text className="text-[var(--text-gray)]">{label}</Text>
              <Text className="ml-2 text-[var(--text-black)] truncate">{value}</Text>
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
};

export default MyPage;
