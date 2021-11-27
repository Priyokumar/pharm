package sale

import (
	"backend/db"
	"backend/inventory"
	"log"

	"gorm.io/gorm/clause"
)

func findSales() (r []Sale, err error) {
	result := db.GormDB.Preload("Customer").Preload("Items").Find(&r)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return nil, result.Error
	}
	return r, nil
}

func findSale(id string) (s *Sale, err error) {
	result := db.GormDB.Preload("Customer").Preload("Items").First(s, "id = ?", id)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return nil, result.Error
	}
	return s, nil
}

func addOrUpdateSale(s *Sale) error {
	result := db.GormDB.Clauses(clause.OnConflict{UpdateAll: true}).Create(s)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return result.Error
	}
	return nil
}

func deleteSale(id string) error {
	result := db.GormDB.Delete(&Sale{}, id)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return result.Error
	}
	return nil
}

func processSale(items []SaleItem) error {

	for _, item := range items {

		item.Inventory.Quantity -= item.Quantity
		err := inventory.AddOrUpdateInventory(&item.Inventory)
		if err != nil {
			return err
		}
		log.Println(item)
	}
	return nil
}
