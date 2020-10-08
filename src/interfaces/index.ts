export interface Product {
  id: string;
  name: string;
  prices: Array<{ price: number }>;
  series: string;
  vendor_code: string;
}
