import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideInfoAlert } from '../store/infoAlertSlice';
import { Button } from '../components'

const InfoAlert = ({ show }) => {
    const dispatch = useDispatch();
    const type = useSelector((state) => state.infoAlert.type);
    const message = useSelector((state) => state.infoAlert.message);

    useEffect(() => {
        const id = setTimeout(() => {
            dispatch(hideInfoAlert());
        }, 20000);
        return () => {
            clearTimeout(id);
        }
    },)

    return (
        <div className={`
            bg-blue-500 text-white
            p-3 font-bold w-full ss:w-auto fixed top-0 right-0 z-[999]
            duration-300 flex gap-3 justify-between items-start  ${show ? '' : 'transform -translate-y-[100%] opacity-0 gap-1'}
            `}>
                <div className='max-w-[30px] max-h-[30px] min-w-[30px] min-h-[30px] rounded-full bg-white flex items-center justify-center'>
            <img src="/info.svg" className='w-full h-full' alt="info" />
                </div>
            {message}
            <Button onClick={() => { dispatch(hideInfoAlert()) }} className='max-w-[30px] max-h-[30px] min-w-[30px] min-h-[30px] rounded-full bg-white flex items-center justify-center'>
                <img src="/close.svg" className='w-full h-full' alt="close" />
            </Button>
        </div>
    );
}

export default InfoAlert