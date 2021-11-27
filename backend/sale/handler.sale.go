package sale

import (
	"github.com/labstack/echo/v4"
	"github.com/teris-io/shortid"
)

func GetSalesHandler(c echo.Context) error {

	data, err := findSales()
	if err != nil {
		c.JSON(500, err)
	}
	c.JSON(200, data)
	return nil
}

func GetSaleHandler(c echo.Context) error {

	id := c.Param("id")
	m, err := findSale(id)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	c.JSON(200, m)
	return nil
}

func AddSaleHandler(c echo.Context) error {

	r := new(Sale)
	sid, _ := shortid.New(1, shortid.DefaultABC, 2342)
	r.SUID, _ = sid.Generate()
	if err := c.Bind(r); err != nil {
		c.JSON(400, err)
		return err
	}
	err := addOrUpdateSale(r)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	err = processSale(r.Items)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	c.JSON(200, "Done")
	return nil
}

func DeleteSaleHandler(c echo.Context) error {

	id := c.Param("id")
	err := deleteSale(id)
	if err != nil {
		c.JSON(500, err)
		return err
	}
	c.JSON(200, "Done")
	return nil
}
