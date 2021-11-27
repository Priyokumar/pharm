package main

import (
	"backend/db"
	"backend/inventory"
	"backend/product"
	"backend/recieving"
	"backend/routes"
	"backend/sale"
	"backend/supplier"
	"log"
	"net/http"
)

func init() {

	db.InitiateDB()
	db.GormDB.AutoMigrate(
		product.Category{},
		product.Type{},
		inventory.Inventory{},
		product.Product{},
		recieving.Recieving{},
		recieving.RecievingItem{},
		supplier.Supplier{},
		sale.Sale{},
		sale.SaleItem{},
		sale.Customer{},
	)
}

func main() {
	log.Println("Starting backend service.")
	e := routes.NewEcho()
	if err := e.Start(":8000"); err != http.ErrServerClosed {
		log.Println("Failed to run backend service.")
		log.Fatal(err)
	}
}
