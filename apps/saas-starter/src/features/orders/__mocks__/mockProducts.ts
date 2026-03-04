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
  { id:  1, shop: 'SAUCE THAI',  name: 'ซอสแกงเขียวหวาน ตรา มะหญิง By พริกคั่วกะปิหอม',                          barcode: '001-1',        orders: 3, toPack: 3,  stock: 0,   shortage: -3, sku: '001',         cfCode: 'CF001', shelf: ''               },
  { id:  2, shop: 'SAUCE THAI',  name: 'ซอสผัดเข้มข้น Stir-Fried Sauce ตรา มะหญิง By พริกคั่วกะปิหอม',           barcode: '42623107186',  orders: 2, toPack: 4,  stock: 98,  shortage: 0,  sku: '42623107186', cfCode: '',      shelf: ''               },
  { id:  3, shop: 'SAUCE THAI',  name: 'ซอสแกงคั่ว ตรา มะหญิง By พริกคั่วกะปิหอม',                               barcode: '',             orders: 1, toPack: 1,  stock: 190, shortage: 0,  sku: '006',         cfCode: 'CF006', shelf: 'W01R01C01RK01' },
  { id:  4, shop: 'SAUCE THAI',  name: 'ซอสผัดกะเพรา ตรา มะหญิง By พริกคั่วกะปิหอม',                             barcode: '002-1',        orders: 5, toPack: 5,  stock: 108, shortage: 0,  sku: '002',         cfCode: 'CF002', shelf: 'W01R01C01RK01' },
  { id:  5, shop: 'SAUCE THAI',  name: 'ซอสพะแนง ตรา มะหญิง By พริกคั่วกะปิหอม',                                 barcode: '003-1',        orders: 2, toPack: 2,  stock: 1,   shortage: -1, sku: '003',         cfCode: 'CF003', shelf: 'W01R01C02RK01' },
  { id:  6, shop: 'SAUCE THAI',  name: 'น้ำพริกเผา ตรา มะหญิง อเนกประสงค์',                                       barcode: '004-1',        orders: 4, toPack: 8,  stock: 50,  shortage: 0,  sku: '004',         cfCode: 'CF004', shelf: 'W01R02C01RK01' },
  { id:  7, shop: 'HERB SHOP',   name: 'ชาสมุนไพร ดอกอัญชัน มะนาว ออร์แกนิก 30 ซอง',                             barcode: 'HS-001',       orders: 6, toPack: 6,  stock: 0,   shortage: -6, sku: 'HS001',       cfCode: '',      shelf: ''               },
  { id:  8, shop: 'HERB SHOP',   name: 'ชาขิงผสมตะไคร้ ออร์แกนิก บรรจุ 20 ซอง',                                  barcode: 'HS-002',       orders: 3, toPack: 3,  stock: 24,  shortage: 0,  sku: 'HS002',       cfCode: 'CF102', shelf: 'W01R03C01RK02' },
  { id:  9, shop: 'HERB SHOP',   name: 'น้ำมันมะพร้าวสกัดเย็น บริสุทธิ์ 100% ขนาด 500ml',                         barcode: 'HS-010',       orders: 2, toPack: 2,  stock: 15,  shortage: 0,  sku: 'HS010',       cfCode: 'CF110', shelf: 'W01R03C02RK01' },
  { id: 10, shop: 'HERB SHOP',   name: 'สบู่สมุนไพรไพล+ขมิ้น สูตรผิวขาว ก้อน 100g',                              barcode: 'HS-020',       orders: 8, toPack: 16, stock: 10,  shortage: -6, sku: 'HS020',       cfCode: '',      shelf: 'W02R01C01RK01' },
  { id: 11, shop: 'SNACK WORLD', name: 'ทุเรียนอบกรอบ 100% หมอนทอง ขนาด 150g',                                    barcode: 'SW-101',       orders: 5, toPack: 10, stock: 40,  shortage: 0,  sku: 'SW101',       cfCode: 'CF201', shelf: 'W02R01C02RK01' },
  { id: 12, shop: 'SNACK WORLD', name: 'กล้วยหอมอบกรอบ ไม่มีน้ำตาล ขนาด 80g',                                     barcode: 'SW-102',       orders: 7, toPack: 7,  stock: 0,   shortage: -7, sku: 'SW102',       cfCode: 'CF202', shelf: ''               },
  { id: 13, shop: 'SNACK WORLD', name: 'มะม่วงอมตากแห้ง รสหวานอมเปรี้ยว ขนาด 200g',                               barcode: 'SW-103',       orders: 3, toPack: 3,  stock: 75,  shortage: 0,  sku: 'SW103',       cfCode: '',      shelf: 'W02R02C01RK01' },
  { id: 14, shop: 'SNACK WORLD', name: 'เม็ดมะม่วงหิมพานต์อบ รสธรรมชาติ เกรด A 200g',                             barcode: 'SW-104',       orders: 4, toPack: 4,  stock: 3,   shortage: -1, sku: 'SW104',       cfCode: 'CF204', shelf: 'W02R02C01RK02' },
  { id: 15, shop: 'SNACK WORLD', name: 'ข้าวเกรียบกุ้งสด รสดั้งเดิม ขนาด 120g',                                   barcode: 'SW-105',       orders: 2, toPack: 4,  stock: 60,  shortage: 0,  sku: 'SW105',       cfCode: 'CF205', shelf: 'W02R02C02RK01' },
  { id: 16, shop: 'BEAUTY CO',   name: 'ครีมบำรุงหน้า วิตามิน C เข้มข้น SPF30 ขนาด 50ml',                         barcode: 'BC-001',       orders: 3, toPack: 3,  stock: 22,  shortage: 0,  sku: 'BC001',       cfCode: 'CF301', shelf: 'W03R01C01RK01' },
  { id: 17, shop: 'BEAUTY CO',   name: 'เซรั่มไฮยาลูโรนิค กระชับรูขุมขน 30ml',                                     barcode: 'BC-002',       orders: 6, toPack: 6,  stock: 0,   shortage: -6, sku: 'BC002',       cfCode: '',      shelf: ''               },
  { id: 18, shop: 'BEAUTY CO',   name: 'มาส์กหน้า แผ่นคอลลาเจน ชุด 10 แผ่น',                                      barcode: 'BC-010',       orders: 4, toPack: 8,  stock: 14,  shortage: -2, sku: 'BC010',       cfCode: 'CF310', shelf: 'W03R01C02RK01' },
  { id: 19, shop: 'BEAUTY CO',   name: 'น้ำมิสต์บำรุงผิวหน้า ดอกกุหลาบ 100ml',                                    barcode: 'BC-015',       orders: 5, toPack: 5,  stock: 30,  shortage: 0,  sku: 'BC015',       cfCode: 'CF315', shelf: 'W03R02C01RK01' },
  { id: 20, shop: 'BEAUTY CO',   name: 'โลชั่นบำรุงผิวกาย นมข้าว อ่อนโยน ขนาด 400ml',                              barcode: 'BC-020',       orders: 2, toPack: 2,  stock: 45,  shortage: 0,  sku: 'BC020',       cfCode: '',      shelf: 'W03R02C01RK02' },
  { id: 21, shop: 'HOME DECOR',  name: 'เทียนหอมอโรมา กลิ่นลาเวนเดอร์ บรรจุ 2 ชิ้น',                              barcode: 'HD-001',       orders: 3, toPack: 6,  stock: 18,  shortage: 0,  sku: 'HD001',       cfCode: 'CF401', shelf: 'W04R01C01RK01' },
  { id: 22, shop: 'HOME DECOR',  name: 'พรมเช็ดเท้า ผ้าฝ้าย ลายเรขาคณิต 45x75cm',                                 barcode: 'HD-005',       orders: 4, toPack: 4,  stock: 0,   shortage: -4, sku: 'HD005',       cfCode: '',      shelf: ''               },
  { id: 23, shop: 'HOME DECOR',  name: 'กล่องเก็บของ ผ้าลินิน ฝาปิดแม่เหล็ก ชุด 3 ใบ',                            barcode: 'HD-010',       orders: 2, toPack: 6,  stock: 9,   shortage: 0,  sku: 'HD010',       cfCode: 'CF410', shelf: 'W04R01C02RK01' },
  { id: 24, shop: 'HOME DECOR',  name: 'หมอนอิง ผ้าซักได้ ลายดอกไม้ 45x45cm',                                      barcode: 'HD-015',       orders: 1, toPack: 2,  stock: 12,  shortage: 0,  sku: 'HD015',       cfCode: 'CF415', shelf: 'W04R02C01RK01' },
];

export const FILTER_WAREHOUSES: FilterWarehouse[] = [
  { id: 'all',         label: 'All Warehouses' },
  { id: 'sauce-thai',  label: 'SAUCE THAI'     },
  { id: 'warehouse-b', label: 'Warehouse B'    },
  { id: 'warehouse-c', label: 'Warehouse C'    },
];
