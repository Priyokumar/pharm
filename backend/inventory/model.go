package inventory

import (
	"backend/product"
	"time"

	"gorm.io/gorm"
)

type Inventory struct {
	gorm.Model
	ID           int64           `json:"id" gorm:"primaryKey"`
	CostPrice    float64         `json:"costPrice"`
	SellingPrice float64         `json:"sellingPrice"`
	BatchNo      string          `json:"batchNo"`
	MfgDate      time.Time       `json:"mfgDate"`
	ExpiryDate   time.Time       `json:"expiryDate"`
	Quantity     int             `json:"quantity"`
	IsExpired    bool            `json:"isExpired"`
	ProductRef   int64           `json:"productRef"`
	Product      product.Product `json:"product" gorm:"foreignKey:ProductRef"`
}
