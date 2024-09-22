import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = "p-2 border-4 border-transparent focus:border-blue-400",
    ...props },
    ref) {
    const id = useId();
    
    return (
        <div className='w-full'>
            {label && (
                <label htmlFor={id}
                    className='inline-block mb-1 pl-1'>
                    {label}
                </label>
            )}

            <input
                className={`rounded-lg bg-gray-700 text-white outline-none focus:bg-gray-600 duration-200 border border-gray-200 w-full ${className}`}
                type={type}
                ref={ref}
                {...props}
                id={id}
            />

        </div>
    )
})


export default Input