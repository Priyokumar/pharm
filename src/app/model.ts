export interface IMedicineType {
    id?: string;
    name: string;
}

export interface IMedicineCategory {
    id: string;
    name: string;
}

export interface IMedicine {
    id: string;
    name: string;
    description: string;
    category: string;
    type: string;
}

export interface IInventory {
    id: string;
    medicine: IMedicine;
    sellingPrice: number;
    costPrice: number;
    isExpired: boolean;
    batch: IBatch;
}

export interface IBatch {
    id: string;
    batchNo: string;
    mfgDate: Date;
    expiryDate: Date;
    quantity: number;
}

export interface ISupplier {
    id: string;
    name: string;
    address: string;
    contactPerson: string;
    contactNo: string;
    isActive: boolean;
}

export interface IRecieving {
    id: string;
    supplier: ISupplier;
    recievedDate: string;
    items: IRecievingItem[];
    recievedBy: string;
}

export interface IRecievingItem {
    id: string;
    medicine: IMedicine;
    batch: IBatch;
    costPrice: number;
    sellingPrice: number;
}

export interface ISaleItem {
    id: string;
    medicine: IMedicine;
    batch: IBatch;
    price: number;
    quantity: number;
    subTotalPrice: number;
}
