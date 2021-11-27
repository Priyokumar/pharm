package product

import (
	"backend/db"
	"log"

	"gorm.io/gorm/clause"
)

func findProducts() ([]Product, error) {
	var p []Product
	result := db.GormDB.Find(&p)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return nil, result.Error
	}
	return p, nil
}

func findProduct(id string) (p *Product, err error) {
	result := db.GormDB.First(p, "id = ?", id)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return nil, result.Error
	}
	return p, nil
}

func addOrUpdateProduct(m *Product) error {
	result := db.GormDB.Clauses(clause.OnConflict{UpdateAll: true}).Create(m)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return result.Error
	}
	return nil
}

func deleteProduct(id string) error {
	result := db.GormDB.Delete(&Product{}, id)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return result.Error
	}
	return nil
}
