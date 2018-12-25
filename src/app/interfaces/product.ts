export interface IProduct {
  allowRecharge: boolean;
  customerType: customerType;
  id: number;
  includes: IIncludeProduct[];
  name: string;
  price: number;
  rechargePrice: number;
  sku: string;
  type: productType;
  validValue: number;
  vendor?: IProductVendor;
}

export interface IIncludeProduct {
  connectedProduct: IProduct;
  type: any;
}

export interface IProductVendor {
  allowManual: boolean;
  id: number;
  name: string;
}

export enum customerType {
  adult = 'ADULT',
  child = 'CHILD'
}

export enum productType {
  basicSingle = 'BASIC_SINGLE',
  basicValidHours = 'BASIC_VALID_HOURS',
  passLimited = 'PASS_LIMITED',
  passUnlimited = 'PASS_UNLIMITED'
}
