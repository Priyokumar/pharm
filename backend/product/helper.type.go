package product

import (
	"backend/db"
	"log"

	"gorm.io/gorm/clause"
)

func getTypes() ([]Type, error) {
	var types []Type
	result := db.GormDB.Find(&types)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return nil, result.Error
	}
	return types, nil
}

func addOrUpdateType(t *Type) error {

	result := db.GormDB.Clauses(clause.OnConflict{UpdateAll: true}).Create(t)

	if result.Error != nil {
		log.Println(result.Error.Error())
		return result.Error
	}

	return nil
}

func deleteType(id string) error {

	result := db.GormDB.Delete(&Type{}, id)

	if result.Error != nil {
		log.Println(result.Error.Error())
		return result.Error
	}
	return nil
}
