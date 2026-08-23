export const fetchWalletBalance = async (): Promise<number> => {
  if (typeof window === "undefined") return 125000;
  return Number(localStorage.getItem("fitloop_mock_wallet") ?? 125000);
};
