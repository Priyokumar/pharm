package product

import (
	"backend/db"
	"log"

	"gorm.io/gorm/clause"
)

func findCategories() ([]Category, error) {
	var categories []Category
	result := db.GormDB.Find(&categories)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return nil, result.Error
	}
	return categories, nil
}

func addOrUpdateCategory(cat *Category) error {

	result := db.GormDB.Clauses(clause.OnConflict{UpdateAll: true}).Create(cat)

	if result.Error != nil {
		log.Println(result.Error.Error())
		return result.Error
	}

	return nil
}

func deleteCategory(id string) error {

	result := db.GormDB.Delete(&Category{}, id)

	if result.Error != nil {
		log.Println(result.Error.Error())
		return result.Error
	}
	return nil
}
