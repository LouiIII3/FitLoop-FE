"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Typography, message, Spin } from "antd";
import { ArrowLeftOutlined, WalletOutlined } from "@ant-design/icons";
import Image from "next/image";
import { fetchWalletBalance } from "@/services/api/walletApi";
import { instance } from "@/config/apiConfig";
import BackButton from "@/ui/components/common/BackButton";

declare global {
  interface Window {
    IMP: any;
  }
}

const { Title, Text } = Typography;

const chargeOptions = [5000, 10000, 30000, 50000];

const getAccessTokenFromCookie = (): string | null => {
  const match = document.cookie.match(/(?:^|; )access=([^;]*)/);
  return match ? match[1] : null;
};

const ChargePage: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadWallet = async () => {
      try {
        const balance = await fetchWalletBalance();
        setWalletBalance(balance);
      } catch (err) {
        console.error("FitPay 잔액 불러오기 실패:", err);
        message.error("잔액을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadWallet();
  }, []);

    useEffect(() => {
    const script = document.createElement("script");
    script.src = process.env.NEXT_PUBLIC_IAMPORT_JS_URL!;
    script.async = true;
    script.onload = () => {
        if (window.IMP) {
        window.IMP.init(process.env.NEXT_PUBLIC_IAMPORT_IMP_CODE!);
        }
    };
    document.body.appendChild(script);
    }, []);

  const handleCharge = () => {
    if (!selectedAmount) {
      message.warning("충전할 금액을 선택해주세요.");
      return;
    }

    const { IMP } = window;
    if (!IMP) {
      message.error("결제 모듈이 아직 로드되지 않았습니다.");
      return;
    }

    IMP.request_pay(
      {
        pg: "kakaopay.TC0ONETIME",
        pay_method: "card",
        name: `${selectedAmount.toLocaleString()}원 상품권`,
        amount: selectedAmount,
        buyer_email: "test@example.com",
        buyer_name: "테스트 사용자",
        buyer_tel: "010-1234-5678",
      },
      async (rsp: any) => {
        if (rsp.success) {
          try {
            const accessToken = getAccessTokenFromCookie();
            if (!accessToken) {
              message.error("로그인이 필요합니다.");
              return;
            }

            const res = await instance.post(
              "/wallets/charge/verify",
              null,
              {
                params: { impUid: rsp.imp_uid },
                headers: { access: accessToken },
              }
            );

            const newBalance = res.data.balance;
            setWalletBalance(newBalance);
            message.success(
              `${res.data.paidAmount.toLocaleString()}원 충전 완료!`
            );
          } catch (err) {
            console.error("충전 실패:", err);
            message.error("서버와 통신 중 오류가 발생했습니다.");
          }
        } else {
          message.error(`결제 실패: ${rsp.error_msg}`);
        }
      }
    );
  };

  return (
    <div className="max-w-[420px] mx-auto min-h-screen bg-[var(--bg-gray)] flex flex-col">
      <div className="flex items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
        <BackButton className="text-sm cursor-pointer" />
        <Title level={5} className="m-0">
          FitPay 충전하기
        </Title>
        <div className="w-5" />
      </div>

      <div className="bg-white px-4 py-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WalletOutlined className="text-xl text-yellow-500" />
            <Text className="text-gray-600">현재 잔액</Text>
          </div>
          {loading ? (
            <Spin size="small" />
          ) : (
            <Text strong className="text-xl text-black">
              {walletBalance?.toLocaleString() ?? 0} 원
            </Text>
          )}
        </div>
      </div>

      <div className="bg-white px-4 py-5 mt-2">
        <Text strong className="text-gray-800 block mb-3">
          충전할 금액권을 선택해주세요
        </Text>
        <div className="grid grid-cols-2 gap-3">
          {chargeOptions.map((amount) => (
            <button
              key={amount}
              onClick={() => setSelectedAmount(amount)}
              className={`py-6 rounded-xl border text-lg font-semibold transition flex flex-col items-center justify-center ${
                selectedAmount === amount
                  ? "bg-yellow-100 border-yellow-500 text-yellow-700 shadow-sm"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:border-yellow-400"
              }`}
            >
              <Image
                src={`/assets/vouchers/${amount}.svg`}
                alt={`${amount}원 상품권`}
                width={120}
                height={80}
                className="mb-2"
              />
              <span className="text-sm">{amount.toLocaleString()} 원</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white px-4 py-5 mt-2">
        <Text strong className="text-gray-800 block mb-3">
          결제 수단
        </Text>
        <div
          className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-yellow-400 cursor-pointer transition"
          onClick={handleCharge}
        >
          <Image
            src="/assets/kakaopay-logo.png"
            alt="KakaoPay"
            width={40}
            height={40}
          />
          <Text className="text-black font-semibold">카카오페이 결제</Text>
        </div>
      </div>

      <div className="px-4 py-3 text-xs text-gray-500">
        <p>· 충전한 금액은 환불이 불가합니다.</p>
        <p>· 결제 시 카카오페이 포인트 적립 혜택을 받을 수 있습니다.</p>
      </div>

      <div className="mt-auto p-4 bg-white border-t border-gray-200">
        <Button
          block
          className="bg-[#FEE500] text-black font-semibold rounded-xl py-4 hover:opacity-90 transition"
          onClick={handleCharge}
          disabled={!selectedAmount}
        >
          {selectedAmount
            ? `${selectedAmount.toLocaleString()}원 결제하기`
            : "결제 금액 선택"}
        </Button>
      </div>
    </div>
  );
};

export default ChargePage;
