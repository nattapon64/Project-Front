import React from 'react'
import SlibraSTD from './slibraSTD'
import useAuth from '../hooks/useAuth'
import axios from 'axios'

function profileSTD() {
    const { user } = useAuth();

    return (
        <div>
            <SlibraSTD/>
            <div>
                
            </div>
        </div>
    )
}

export default profileSTD