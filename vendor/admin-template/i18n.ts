import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "common": {
        "search_placeholder": "Search orders, customers, SKUs...",
        "dashboard": "Dashboard",
        "orders": "Orders",
        "all_orders": "All Orders",
        "processing_orders": "Processing Orders",
        "packing": "Packing",
        "tracking_update": "Tracking Update",
        "tracking_status": "Tracking Status",
        "inventory": "Inventory",
        "customers": "Customers",
        "reports": "Reports",
        "settings": "Settings",
        "main": "Main",
        "management": "Management",
        "analysis": "Analysis",
        "export_excel": "Export Excel",
        "clear": "Clear",
        "search": "Search",
        "sort": "Sort",
        "advanced_search": "Advanced Search",
        "warehouse": "Warehouse",
        "channel": "Channel",
        "shipping": "Shipping",
        "order_id": "Order ID",
        "status": "Status",
        "manage": "Manage",
        "total": "Total",
        "recent_orders": "Recent Orders",
        "welcome_back": "Welcome back, Alex. Here's what's happening today."
      },
      "status": {
        "wait_confirm": "Wait for Confirm",
        "wait_stock": "Wait for Stock",
        "wait_pickup": "Wait for Pickup",
        "wait_picking": "Wait for Picking",
        "packing": "Packing",
        "wait_shipping": "Wait for Shipping",
        "shipping": "Shipping",
        "returning": "Returning",
        "returned_wait_restock": "Returned - Wait for Restock",
        "returned_restocked": "Returned - Restocked",
        "delivered": "Delivered",
        "cancelled": "Cancelled",
        "confirmed": "Confirmed"
      }
    }
  },
  th: {
    translation: {
      "common": {
        "search_placeholder": "ค้นหาคำสั่งซื้อ, ลูกค้า, SKUs...",
        "dashboard": "แดชบอร์ด",
        "orders": "ออเดอร์",
        "all_orders": "ออเดอร์ทั้งหมด",
        "processing_orders": "พัสดุดำเนินการ",
        "packing": "แพ็กสินค้า",
        "tracking_update": "อัพเดท Tracking",
        "tracking_status": "เช็คสถานะพัสดุ",
        "inventory": "คลังสินค้า",
        "customers": "ลูกค้า",
        "reports": "รายงาน",
        "settings": "ตั้งค่า",
        "main": "หลัก",
        "management": "การจัดการ",
        "analysis": "การวิเคราะห์",
        "export_excel": "ส่งออก Excel",
        "clear": "ล้างค่า",
        "search": "ค้นหา",
        "sort": "เรียงลำดับ",
        "advanced_search": "ค้นหาขั้นสูง",
        "warehouse": "คลังสินค้า",
        "channel": "ช่องทางการขาย",
        "shipping": "ขนส่ง",
        "order_id": "เลขที่คำสั่งซื้อ",
        "status": "สถานะ",
        "manage": "จัดการ",
        "total": "ทั้งหมด",
        "recent_orders": "คำสั่งซื้อล่าสุด",
        "welcome_back": "ยินดีต้อนรับกลับ Alex นี่คือข้อมูลล่าสุดวันนี้"
      },
      "status": {
        "wait_confirm": "รอยืนยันสินค้า",
        "wait_stock": "รอจองสต็อก",
        "wait_pickup": "รอนัดรับ",
        "wait_picking": "รอหยิบ",
        "packing": "กำลังแพ็ค",
        "wait_shipping": "รอบนส่งเข้ารับ",
        "shipping": "กำลังจัดส่ง",
        "returning": "กำลังตีกลับ",
        "returned_wait_restock": "ตีกลับแล้วรอคืนสต็อก",
        "returned_restocked": "ตีกลับแล้ว คืนสต็อกแล้ว",
        "delivered": "จัดส่งสำเร็จ",
        "cancelled": "ยกเลิก",
        "confirmed": "ยืนยันแล้ว"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;