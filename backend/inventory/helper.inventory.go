package inventory

import (
	"backend/db"
	"backend/product"
	"log"
	"net/url"

	"gorm.io/gorm/clause"
)

func findInventories() (i []Inventory, err error) {
	result := db.GormDB.Preload("Product").Find(&i)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return nil, result.Error
	}
	return i, nil
}

func findInventory(i Inventory) (*Inventory, error) {
	result := db.GormDB.Preload("Product").First(&i, i)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return nil, result.Error
	}
	return &i, nil
}

func AddOrUpdateInventory(i *Inventory) error {
	result := db.GormDB.Clauses(clause.OnConflict{UpdateAll: true}).Create(i)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return result.Error
	}
	return nil
}

func GetInventoryByProductIDAndBatchNo(product product.Product, batchNo string) (i *Inventory, err error) {
	log.Println("GetInventoryByIDAndBatchNo")
	result := db.GormDB.First(&i, Inventory{BatchNo: batchNo, Product: product})
	if result.Error != nil {
		log.Println(result.Error.Error())
		return nil, nil
	}
	log.Println(i)
	return i, nil
}

func GetInventoryByID(id string) (i *Inventory, err error) {
	result := db.GormDB.First(i, "product.id = ?", id)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return nil, result.Error
	}
	return i, nil
}

func deleteInventory(id int64) error {
	result := db.GormDB.Delete(&Inventory{}, id)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return result.Error
	}
	return nil
}

func CreateQuery(query url.Values) Inventory {

	var i Inventory

	batchNo := query.Get("batchNo")
	//productIDStr := query.Get("productID")

	if batchNo != "" {
		i.BatchNo = batchNo
	}
	/* if productIDStr != "" {
		productID, _ := strconv.ParseInt(productIDStr, 10, 64)
		i.Product = product.Product{ID: productID}
	} */
	return i
}
