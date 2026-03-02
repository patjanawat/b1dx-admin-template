'use client';

import { AppPageHeader, ExportExcelButton } from '@b1dx/ui';
import { toast } from 'sonner';
import { FilterProductsSection } from '@/features/orders';

export default function FilterProductsPage() {
  const handleExport = () => {
    toast.success('ส่งออกไฟล์ Excel เรียบร้อยแล้ว', {
      description: 'ไฟล์กำลังถูกดาวน์โหลดลงในเครื่องของคุณ',
    });
  };

  return (
    <div className="space-y-6">

      <AppPageHeader
        title="ตัวกรองสินค้า"
        description="จัดการและกรองรายการสินค้าตามเงื่อนไขที่ต้องการ เพื่อความสะดวกในการแพ็คและจัดส่ง"
        actions={
          <ExportExcelButton onClick={handleExport}>EXPORT EXCEL</ExportExcelButton>
        }
      />

      <FilterProductsSection />

    </div>
  );
}
