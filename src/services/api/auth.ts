
type UserRole = "ADMIN" | "MEMBER";

export interface LoginResult {
  personalInfo: boolean;
  fullName: string;
  role: UserRole;
}

// 로그인 API 호출
export const loginUser = async (
  username: string,
  password: string
): Promise<LoginResult> => {
  void password;
  const role: UserRole = username.toLowerCase().includes("admin") ? "ADMIN" : "MEMBER";
  localStorage.setItem("fitloop_mock_user", JSON.stringify({ username, name: role === "ADMIN" ? "관리자" : "핏루퍼" }));
  document.cookie = "access=mock-access; path=/; max-age=86400";
  document.cookie = "refresh=mock-refresh; path=/; max-age=86400";
  return { fullName: role === "ADMIN" ? "관리자" : "핏루퍼", personalInfo: true, role };
};

// 회원가입 API 호출
export const registerUser = async (
  username: string,
  password: string,
  email: string,
  name: string,
  birthday: string
): Promise<void> => {
  localStorage.setItem("fitloop_mock_user", JSON.stringify({ username, email, name, birthday, password }));
  alert("회원가입이 완료되었습니다!");
  window.location.href = "/login";
};

// Google OAuth2 로그인 URL 요청
export const getGoogleLoginUrl = async (): Promise<string> => {
  return "/mypage";
};

// 쿠키에서 특정 이름의 값을 꺼내는 함수
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift() || null;
  return null;
};

// access 토큰을 쿠키에서 꺼내서 로그아웃 요청
export const logoutUser = async (): Promise<void> => {
  void getCookie("access");
  localStorage.removeItem("fitloop_mock_user");
  document.cookie = "access=; path=/; max-age=0;";
  document.cookie = "refresh=; path=/; max-age=0;";
};
