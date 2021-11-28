package db

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type config struct {
	dbHost     string
	dbUser     string
	dbPassword string
	dbName     string
	dbPort     string
}

func getConfig() *config {

	config := new(config)
	config.dbHost = "localhost"
	config.dbUser = "pharm"
	config.dbPassword = "pharm"
	config.dbName = "pharm"
	config.dbPort = "5432"

	return config
}

// DB DB
var GormDB *gorm.DB

// InitiateDB InitiateDB
func InitiateDB() {

	config := getConfig()

	log.Println("Initializing DB")
	dsn := "host=" + config.dbHost + " user=" + config.dbUser + " password=" + config.dbPassword + " dbname=" + config.dbName + " port=" + config.dbPort + " sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Println("Database initialization failed.")
		log.Panic(err.Error())
	}
	GormDB = db
	log.Println("Initialized DB")
}
