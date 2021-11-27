package supplier

import (
	"strconv"

	"github.com/labstack/echo/v4"
)

func GetSuppliersHandler(c echo.Context) error {

	data, err := findSuppliers()
	if err != nil {
		c.JSON(500, err)
	}
	c.JSON(200, data)
	return nil
}

func GetSupplierHandler(c echo.Context) error {

	id := c.Param("id")
	m, err := findSupplier(id)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	c.JSON(200, m)
	return nil
}

func AddOrUpdateSupplierHandler(c echo.Context) error {

	id := c.Param("id")
	m := new(Supplier)
	o, _ := strconv.ParseInt(id, 10, 64)
	m.ID = o
	if err := c.Bind(m); err != nil {
		c.JSON(400, err)
		return err
	}
	err := addOrUpdateSupplier(m)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	c.JSON(200, "Done")
	return nil
}

func DeleteSupplierHandler(c echo.Context) error {

	id := c.Param("id")
	err := deleteSupplier(id)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	c.JSON(200, "Done")
	return nil
}
