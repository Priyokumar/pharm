export interface IMedicineType {
  id?: number;
  name: string;
}

export interface IMedicineCategory {
  id?: number;
  name: string;
}

export interface IMedicine {
  id: number;
  name: string;
  description: string;
  category: string;
  type: string;
}

export interface IInventory {
  id: number;
  product: IMedicine;
  sellingPrice: number;
  costPrice: number;
  isExpired: boolean;
  batchNo: string;
  mfgDate: Date;
  expiryDate: Date;
  quantity: number;
}

export interface ISupplier {
  id: number;
  name: string;
  address: string;
  contactPerson: string;
  contactNo: string;
  active: boolean;
}

export interface IRecieving {
  id?: number;
  supplier: ISupplier;
  recievedDate: string;
  items: IRecievingItem[];
  recievedBy: string;
}

export interface IRecievingItem {
  id?: number;
  product: IMedicine;
  costPrice: number;
  sellingPrice: number;
  batchNo: string;
  mfgDate: Date;
  expiryDate: Date;
  quantity: number;
}

export interface ISale {
  id?: number;
  soldDate?: Date;
  suid?: string;
  totalAmount: number;
  customer: ICustomer;
  items: ISaleItem[];
}

export interface ISaleItem {
  id?: number;
  inventory: IInventory;
  price: number;
  quantity: number;
  subTotalPrice: number;
}

export interface ICustomer {
  id?: number;
  name: string;
  mobileNo: string;
  address: string;
}
