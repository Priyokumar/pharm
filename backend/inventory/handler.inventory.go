package inventory

import (
	"strconv"

	"github.com/labstack/echo/v4"
)

func GetInventoriesHandler(c echo.Context) error {

	data, err := findInventories()
	if err != nil {
		c.JSON(500, err)
	}
	c.JSON(200, data)
	return nil
}

func GetInventoryHandler(c echo.Context) error {

	query := c.QueryParams()
	i := CreateQuery(query)
	id := c.Param("id")
	o, _ := strconv.ParseInt(id, 10, 64)
	i.ID = o
	m, err := findInventory(i)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	c.JSON(200, m)
	return nil
}

func GetFirstInventoryHandler(c echo.Context) error {

	query := c.QueryParams()
	i := CreateQuery(query)
	m, err := findInventory(i)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	c.JSON(200, m)
	return nil
}

func AddOrUpdateInventoryHandler(c echo.Context) error {

	i := new(Inventory)
	id := c.Param("id")
	o, _ := strconv.ParseInt(id, 10, 64)
	i.ID = o
	if err := c.Bind(i); err != nil {
		c.JSON(400, err)
		return err
	}
	err := AddOrUpdateInventory(i)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	c.JSON(200, "Done")
	return nil
}

func DeleteInventory(c echo.Context) error {

	id := c.Param("id")
	o, _ := strconv.ParseInt(id, 10, 64)
	err := deleteInventory(o)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	c.JSON(200, "Done")
	return nil
}
