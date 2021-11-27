package recieving

import (
	"backend/db"
	"backend/inventory"
	"log"

	"gorm.io/gorm/clause"
)

func findRecievings() (r []Recieving, err error) {
	result := db.GormDB.Preload("Supplier").Preload("Items").Find(&r)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return nil, result.Error
	}
	return r, nil
}

func findRecieving(id string) (s *Recieving, err error) {
	result := db.GormDB.Preload("Supplier").Preload("Items").First(s, "id = ?", id)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return nil, result.Error
	}
	return s, nil
}

func addOrUpdateRecieving(s *Recieving) error {
	result := db.GormDB.Clauses(clause.OnConflict{UpdateAll: true}).Create(s)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return result.Error
	}
	return nil
}

func deleteRecieving(id string) error {
	result := db.GormDB.Delete(&Recieving{}, id)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return result.Error
	}
	return nil
}

func processInventory(items []RecievingItem) error {

	for _, item := range items {

		i, err := inventory.GetInventoryByProductIDAndBatchNo(item.Product, item.BatchNo)

		if err != nil {
			log.Println(err)
			return err
		}

		if i == nil {
			newInventory := inventory.Inventory{
				ID:           0,
				CostPrice:    item.CostPrice,
				SellingPrice: item.SellingPrice,
				BatchNo:      item.BatchNo,
				MfgDate:      item.MfgDate,
				ExpiryDate:   item.ExpiryDate,
				Quantity:     item.Quantity,
				IsExpired:    false,
				Product:      item.Product,
				ProductRef:   item.ProductRef,
			}
			err = inventory.AddOrUpdateInventory(&newInventory)
			if err != nil {
				log.Println(err)
				return err
			}
		} else {
			i.CostPrice = item.CostPrice
			i.SellingPrice = item.SellingPrice
			i.Quantity += item.Quantity
			err = inventory.AddOrUpdateInventory(i)
			if err != nil {
				log.Println(err)
				return err
			}
		}
	}
	return nil
}
