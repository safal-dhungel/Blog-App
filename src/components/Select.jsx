import React, { forwardRef, useId } from "react";

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className='inline-block mb-1 pl-1'>{label}</label>
            )}
            <select type="select" id={id} ref={ref} className={`p-2 rounded-lg bg-gray-700 focus:bg-gray-600 text-gray-300 border border-black w-full ${className}`} {...props} >
                {options.map((option)=>(
                    <option
                        value={option}
                        key={option}
                    >{option}</option>
                )
                )}
            </select>
        </div>
    )
}

//forwardRef help to control/access child component directly with ref 
export default forwardRef(Select);