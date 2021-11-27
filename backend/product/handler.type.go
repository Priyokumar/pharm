package product

import (
	"strconv"

	"github.com/labstack/echo/v4"
)

func GetTypesHandler(c echo.Context) error {

	data, err := getTypes()
	if err != nil {
		c.JSON(500, err)
	}
	c.JSON(200, data)
	return nil
}

func AddOrUpdateType(c echo.Context) error {

	id := c.Param("id")
	o, _ := strconv.ParseInt(id, 10, 64)
	t := new(Type)
	t.ID = o
	if err := c.Bind(t); err != nil {
		c.JSON(400, err)
		return err
	}
	err := addOrUpdateType(t)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	c.JSON(200, "Done")
	return nil
}

func DeleteType(c echo.Context) error {

	id := c.Param("id")
	err := deleteType(id)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	c.JSON(200, "Done")
	return nil
}
