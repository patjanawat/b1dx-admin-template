export interface MockProduct {
  id: number;
  shop: string;
  name: string;
  barcode: string;
  orders: number;
  toPack: number;
  stock: number;
  shortage: number;
  sku: string;
  cfCode: string;
  shelf: string;
}

export interface FilterWarehouse {
  id: string;
  label: string;
}

export const MOCK_PRODUCTS: MockProduct[] = [
  { id: 1, shop: 'SAUCE THAI', name: 'ซอสแกงเขียวหวาน ตรา มะหญิง By พริกคั่วกะปิหอม',                          barcode: '001-1',        orders: 1, toPack: 1, stock: 0,   shortage: -1, sku: '001',         cfCode: '', shelf: ''               },
  { id: 2, shop: 'SAUCE THAI', name: 'ซอสผัดเข้มข้น Stir-Fried Sauce ตรา มะหญิง By พริกคั่วกะปิหอม',           barcode: '42623107186',  orders: 1, toPack: 2, stock: 98,  shortage: 0,  sku: '42623107186', cfCode: '', shelf: ''               },
  { id: 3, shop: 'SAUCE THAI', name: 'ซอสแกงคั่ว ตรา มะหญิง By พริกคั่วกะปิหอม',                               barcode: '',             orders: 1, toPack: 1, stock: 190, shortage: 0,  sku: '006',         cfCode: '', shelf: 'W01R01C01RK01' },
  { id: 4, shop: 'SAUCE THAI', name: 'ซอสผัดกะเพรา ตรา มะหญิง By พริกคั่วกะปิหอม',                             barcode: '002-1',        orders: 1, toPack: 1, stock: 108, shortage: 0,  sku: '002',         cfCode: '', shelf: 'W01R01C01RK01' },
];

export const FILTER_WAREHOUSES: FilterWarehouse[] = [
  { id: 'all',         label: 'All Warehouses' },
  { id: 'sauce-thai',  label: 'SAUCE THAI'     },
  { id: 'warehouse-b', label: 'Warehouse B'    },
  { id: 'warehouse-c', label: 'Warehouse C'    },
];
