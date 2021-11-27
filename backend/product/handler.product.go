package product

import (
	"strconv"

	"github.com/labstack/echo/v4"
)

func GetProductsHandler(c echo.Context) error {

	data, err := findProducts()
	if err != nil {
		c.JSON(500, err)
	}
	c.JSON(200, data)
	return nil
}

func GetMedicineHandler(c echo.Context) error {

	id := c.Param("id")
	m, err := findProduct(id)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	c.JSON(200, m)
	return nil
}

func AddOrUpdateProduct(c echo.Context) error {

	id := c.Param("id")
	o, _ := strconv.ParseInt(id, 10, 64)
	p := new(Product)
	p.ID = o
	if err := c.Bind(p); err != nil {
		c.JSON(400, err)
		return err
	}
	err := addOrUpdateProduct(p)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	c.JSON(200, "Done")
	return nil
}

func DeleteMedicine(c echo.Context) error {

	id := c.Param("id")
	err := deleteProduct(id)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	c.JSON(200, "Done")
	return nil
}
