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
	"os"
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

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	if err := e.Start(":" + port); err != http.ErrServerClosed {
		log.Println("Failed to run backend service.")
		log.Fatal(err)
	}
}
