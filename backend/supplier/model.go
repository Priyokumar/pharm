package supplier

type Supplier struct {
	ID            int64  `json:"id" gorm:"primaryKey;autoIncrement:true"`
	Name          string `json:"name"`
	ContactPerson string `json:"contactPerson"`
	ContactNo     int64  `json:"contactNo"`
	Address       string `json:"address"`
	Active        bool   `json:"active"`
}
