package recieving

import (
	"backend/product"
	"backend/supplier"
	"time"
)

type RecievingItem struct {
	ID           int64           `json:"id" gorm:"primaryKey"`
	CostPrice    float64         `json:"costPrice"`
	SellingPrice float64         `json:"sellingPrice"`
	BatchNo      string          `json:"batchNo"`
	MfgDate      time.Time       `json:"mfgDate"`
	ExpiryDate   time.Time       `json:"expiryDate"`
	Quantity     int             `json:"quantity"`
	ProductRef   int64           `json:"productRef"`
	Product      product.Product `json:"product" gorm:"foreignKey:ProductRef"`
	RecievingRef int64           `json:"recieving"`
}

type Recieving struct {
	ID           int64             `json:"id" gorm:"primaryKey"`
	RecievedDate string            `json:"recievedDate"`
	RecievedBy   string            `json:"recievedBy"`
	SupplierRef  string            `json:"supplierRef"`
	Supplier     supplier.Supplier `json:"supplier" gorm:"foreignKey:SupplierRef"`
	Items        []RecievingItem   `json:"items" gorm:"foreignKey:RecievingRef"`
}
