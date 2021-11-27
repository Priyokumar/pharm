package product

import (
	"strconv"

	"github.com/labstack/echo/v4"
)

func GetCategoriesHandler(c echo.Context) error {

	data, err := findCategories()
	if err != nil {
		c.JSON(500, err)
	}
	c.JSON(200, data)
	return nil
}

func AddOrUpdateCategory(c echo.Context) error {

	id := c.Param("id")
	o, _ := strconv.ParseInt(id, 10, 64)
	cat := new(Category)
	cat.ID = o
	if err := c.Bind(cat); err != nil {
		c.JSON(400, err)
		return err
	}
	err := addOrUpdateCategory(cat)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	c.JSON(200, "Done")
	return nil
}

func DeleteCategory(c echo.Context) error {

	id := c.Param("id")
	err := deleteCategory(id)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	c.JSON(200, "Done")
	return nil
}
