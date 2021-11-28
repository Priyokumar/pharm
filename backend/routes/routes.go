package routes

import (
	"backend/inventory"
	"backend/product"
	"backend/recieving"
	"backend/sale"
	"backend/supplier"
	"log"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func NewEcho() *echo.Echo {
	log.Println("Setting up routes")
	e := echo.New()

	e.Static("/", "ui")
	echo.NotFoundHandler = func(c echo.Context) error {
		return c.File("ui/index.html")
	}

	e.Use(middleware.CORSWithConfig(middleware.DefaultCORSConfig))

	v1 := e.Group("v1")

	// Categories routes
	v1.GET("/categories", product.GetCategoriesHandler)
	v1.POST("/categories", product.AddOrUpdateCategory)
	v1.PUT("/categories/:id", product.AddOrUpdateCategory)
	v1.DELETE("/categories/:id", product.DeleteCategory)

	// Types routes
	v1.GET("/types", product.GetTypesHandler)
	v1.POST("/types", product.AddOrUpdateType)
	v1.PUT("/types/:id", product.AddOrUpdateType)
	v1.DELETE("/types/:id", product.DeleteType)

	// Products routes
	v1.GET("/products", product.GetProductsHandler)
	v1.POST("/products", product.AddOrUpdateProduct)
	v1.GET("/products/:id", product.GetProductsHandler)
	v1.PUT("/products/:id", product.AddOrUpdateProduct)
	v1.DELETE("/products/:id", product.DeleteMedicine)

	// Supplier routes
	v1.GET("/suppliers", supplier.GetSuppliersHandler)
	v1.POST("/suppliers", supplier.AddOrUpdateSupplierHandler)
	v1.GET("/suppliers/:id", supplier.GetSuppliersHandler)
	v1.PUT("/suppliers/:id", supplier.AddOrUpdateSupplierHandler)
	v1.DELETE("/suppliers/:id", supplier.DeleteSupplierHandler)

	// Recieving routes
	v1.GET("/recievings", recieving.GetRecievingsHandler)
	v1.POST("/recievings", recieving.AddRecievingHandler)
	v1.GET("/recievings/:id", recieving.GetRecievingsHandler)
	v1.DELETE("/recievings/:id", recieving.DeleteRecievingHandler)

	// Inventory routes
	v1.GET("/inventories", inventory.GetInventoriesHandler)
	v1.POST("/inventories", inventory.AddOrUpdateInventoryHandler)
	v1.GET("/inventory", inventory.GetFirstInventoryHandler)
	v1.GET("/inventories/:id", inventory.GetInventoryHandler)
	v1.DELETE("/inventories/:id", inventory.DeleteInventory)

	// Sales routes
	v1.GET("/sales", sale.GetSalesHandler)
	v1.POST("/sales", sale.AddSaleHandler)
	v1.GET("/sales/:id", sale.GetSaleHandler)
	//v1.DELETE("/sales/:id", sale.DeleteSaleHandler)

	return e
}
