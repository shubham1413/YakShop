import { Stock } from "./Stock";

export interface OrderRequest {
  customer: string;
  order: Stock;
}
