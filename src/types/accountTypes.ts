export interface AccountAddRequest {
  name: string;
  phoneNumber: string;
}

export interface AccountResponse {
  data: AccountTypes[];
}

export interface AccountTypes {
  id: number;
  name: string;
  phoneNumber: string;
  isActive: boolean;
  createdAt: string;
}
