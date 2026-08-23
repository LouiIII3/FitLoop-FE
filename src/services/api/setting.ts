export interface AccountPayload {
  bankName: string;
  accountNumber: string;
  depositor: string;
}


export async function saveAccountSetting(payload: AccountPayload): Promise<void> {
  localStorage.setItem("fitloop_mock_account", JSON.stringify(payload));
}
