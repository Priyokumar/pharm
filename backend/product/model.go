package product

import "gorm.io/gorm"

type Category struct {
	gorm.Model
	ID   int64  `json:"id" gorm:"primaryKey;autoIncrement:true"`
	Name string `json:"name"`
}

type Type struct {
	gorm.Model
	ID   int64  `json:"id" gorm:"primaryKey;autoIncrement:true"`
	Name string `json:"name"`
}

type Product struct {
	gorm.Model
	ID          int64  `json:"id" gorm:"primaryKey;autoIncrement:true"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Type        string `json:"type"`
	Category    string `json:"category"`
}

func (Type) TableName() string {
	return "medicineType"
}

func (Category) TableName() string {
	return "medicineCategory"
}
