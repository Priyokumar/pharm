// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'pharm-f0874',
    appId: '1:237392242702:web:76f4ac7217ba5e6caab45f',
    storageBucket: 'pharm-f0874.appspot.com',
    apiKey: 'AIzaSyC-hFf9BpCYVY-g0UezHaLAz5FMFiri8-Y',
    authDomain: 'pharm-f0874.firebaseapp.com',
    messagingSenderId: '237392242702',
  },
  production: false,
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
    MedicineTypes: "types",
    MedicineCategories: "categories",
    Medicines: "products",
    Suppliers: "suppliers",
    Inventories: "inventories",
    Recievings: "recievings",
    Sales: "sales"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
