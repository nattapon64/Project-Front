import React from 'react'
import SlibaraTC from './slibaraTC'
import useAuth from '../hooks/useAuth'

function MainTC() {
    const { user } = useAuth();

    return (
        <div className='min-h-screen flex bg-gray-100'>
            <SlibaraTC />
            <div className='flex flex-col items-center justify-center h-full w-full h-screen'>
                {user?.username && (
                    <div className="mb-4 text-4xl font-bold text-center text-gray-800">
                        ยินดีต้อนรับ {user.username}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MainTC
