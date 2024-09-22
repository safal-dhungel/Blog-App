import React from 'react'

const Loading = ({className = 'w-full h-full',img = 'w-[100px] h-[100px]'}) => {
    return (
        <div className={`${className} flex gap-3 justify-center items-center z-[60]`}>
            <img src="/loading.gif" className={`${img}`} alt="loading" />
        </div>
    )
}

export default Loading