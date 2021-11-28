export const environment = {
  firebase: {
    projectId: 'pharm-f0874',
    appId: '1:237392242702:web:76f4ac7217ba5e6caab45f',
    storageBucket: 'pharm-f0874.appspot.com',
    apiKey: 'AIzaSyC-hFf9BpCYVY-g0UezHaLAz5FMFiri8-Y',
    authDomain: 'pharm-f0874.firebaseapp.com',
    messagingSenderId: '237392242702',
  },
  production: true,
  collection:{
    MedicineTypes : "MedicineTypes",
    MedicineCategories:"MedicineCategories",
    Medicines: "Medicines",
    Inventories: "Inventories",
    Recievings: "Recievings",
    Suppliers: "Suppliers"
  },
  baseURL: "/v1",
  apiEndpoints: {
    MedicineTypes: "medicineTypes",
    MedicineCategories: "medicineCategories",
    Medicines: "medicines",
    Suppliers: "suppliers",
    Inventories: "inventories",
    Recievings: "recievings",
    Sales: "sales"
  }
};
