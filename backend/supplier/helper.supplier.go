package supplier

import (
	"backend/db"
	"log"

	"gorm.io/gorm/clause"
)

func findSuppliers() (s []Supplier, err error) {
	result := db.GormDB.Find(&s)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return nil, result.Error
	}
	return s, nil
}

func findSupplier(id string) (s *Supplier, err error) {
	result := db.GormDB.First(s, "id = ?", id)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return nil, result.Error
	}
	return s, nil
}

func addOrUpdateSupplier(s *Supplier) error {
	result := db.GormDB.Clauses(clause.OnConflict{UpdateAll: true}).Create(s)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return result.Error
	}
	return nil
}

func deleteSupplier(id string) error {
	result := db.GormDB.Delete(&Supplier{}, id)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return result.Error
	}
	return nil
}
