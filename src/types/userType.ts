import { CoreResponse } from "./coreTypes";

export interface UserResponse extends CoreResponse {
  data: Data;
}

export interface Data {
  id: number;
  name: string;
  role: string;
  username: string;
}
