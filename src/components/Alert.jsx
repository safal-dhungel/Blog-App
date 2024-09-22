import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../store/alertSlice';

const Alert = ({ show }) => {
    const dispatch = useDispatch();
    const type = useSelector((state) => state.alert.type);
    const message = useSelector((state) => state.alert.message);

    useEffect(() => {
        const id = setTimeout(() => {
            dispatch(hideAlert());
        }, 5000);
        return () => {
            clearTimeout(id);
        }
    },)

    return (
        <div className={`
            ${type === 'info' ? 'bg-blue-700 text-white' : ''}
            ${type === 'warning' ? 'bg-yellow-500 text-black' : ''}
            ${type === 'error' ? 'bg-red-800 text-white' : ''}
            ${type === 'success' ? 'bg-green-300 text-black' : ''}
            ${type === 'loading' ? 'bg-white text-black' : ''}
            ${!type && 'bg-white'}
            p-3 font-bold w-full ss:w-auto fixed bottom-0 left-0 z-[999]
            duration-300 flex gap-3 justify-start items-center  ${show ? '' : 'transform translate-y-[100%] opacity-0 gap-1'}
            `}>
            {type === 'loading' &&
                <div className=''>
                    <img src="/loading.gif" className='w-[40px] h-[40px]' alt="loading" />
                </div>
            }
            <div className=''>{message}</div>
        </div>
    );
}

export default Alert