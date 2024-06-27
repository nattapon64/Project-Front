import React from 'react';
import Slibaradmin from './slibaradmin';  // ตรงนี้เปลี่ยนเป็น Slibaradmin พิมพ์ใหญ่ตามที่ได้ export ออกมา
import useAuth from '../hooks/useAuth';

function MainAM() {
  const { user } = useAuth();
  return (
    <div className='flex'>
      <div className='drawer lg:drawer-open'>
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center p-4">
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mb-4">Open drawer</label>
          <div className='flex flex-col items-center justify-center h-full w-full h-screen'>
            {user?.username && (
              <div className="mb-4 text-4xl font-bold text-center text-gray-800">
                ยินดีต้อนรับ {user.frist_name} {user.last_name}
              </div>
            )}
          </div>
        </div>
        <Slibaradmin /> {/* แก้เป็น Slibaradmin */}
      </div>
    </div>
  );
}

export default MainAM;
