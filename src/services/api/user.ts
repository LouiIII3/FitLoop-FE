const getAccessTokenFromCookie = (): string | null => {
  const match = document.cookie.match(/(?:^|; )access=([^;]*)/);
  return match ? match[1] : null;
};

// 사용자 정보 조회 API (반환 타입 명확히 지정)
export const fetchUserInfo = async (): Promise<{ username: string }> => {
  const saved = typeof window !== "undefined" ? localStorage.getItem("fitloop_mock_user") : null;
  const user = saved ? JSON.parse(saved) : { username: "demo@fitloop.kr" };
  return { username: user.username ?? "demo@fitloop.kr" };
};

//프로필 추가 API
export const registerInfomation = async (
  nickname: string,
  gender: string,
  ageRange: string,
  height: number,
  weight: number
): Promise<boolean> => {
  localStorage.setItem("fitloop_mock_profile", JSON.stringify({ nickname, gender, ageRange, height, weight }));
  return true;
};

export const deleteAccount = async (): Promise<void> => {
  void getAccessTokenFromCookie();
  localStorage.removeItem("fitloop_mock_user");
};
