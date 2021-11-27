package sale

import (
	"backend/inventory"
	"time"
)

type SaleItem struct {
	ID            int64               `json:"id" gorm:"primaryKey"`
	Price         float64             `json:"price"`
	SubTotalPrice float64             `json:"subTotalPrice"`
	Quantity      int                 `json:"quantity"`
	InventoryRef  int64               `json:"inventoryRef"`
	Inventory     inventory.Inventory `json:"inventory" gorm:"foreignKey:InventoryRef"`
	SaleRef       int64               `json:"saleRef"`
}

type Sale struct {
	ID          int64      `json:"id" gorm:"primaryKey"`
	SoldDate    time.Time  `json:"soldDate" gorm:"autoCreateTime"`
	SUID        string     `json:"suid"`
	TotalAmount float64    `json:"totalAmount"`
	CustomerRef int64      `json:"customerRef"`
	Customer    Customer   `json:"customer" gorm:"foreignKey:CustomerRef"`
	Items       []SaleItem `json:"items" gorm:"foreignKey:SaleRef"`
}

type Customer struct {
	ID       int64  `json:"id" gorm:"primaryKey"`
	Name     string `json:"name"`
	MobileNo string `json:"mobileNo"`
	Address  string `json:"address"`
}
