package recieving

import (
	"github.com/labstack/echo/v4"
)

func GetRecievingsHandler(c echo.Context) error {

	data, err := findRecievings()
	if err != nil {
		c.JSON(500, err)
	}
	c.JSON(200, data)
	return nil
}

func GetRecievingHandler(c echo.Context) error {

	id := c.Param("id")
	m, err := findRecieving(id)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	c.JSON(200, m)
	return nil
}

func AddRecievingHandler(c echo.Context) error {

	r := new(Recieving)
	if err := c.Bind(r); err != nil {
		c.JSON(400, err)
		return err
	}
	err := addOrUpdateRecieving(r)
	if err != nil {
		c.JSON(500, err)
		return err
	}

	err = processInventory(r.Items)

	if err != nil {
		c.JSON(500, err)
		return err
	}

	c.JSON(200, "Done")
	return nil
}

func DeleteRecievingHandler(c echo.Context) error {

	id := c.Param("id")
	err := deleteRecieving(id)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	c.JSON(200, "Done")
	return nil
}
