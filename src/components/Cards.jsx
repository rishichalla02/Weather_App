import React from 'react'

export const Cards = ({ children, className = "" }) => {
    return (
        <div className={`bg-white  rounded-2xl shadow-xl ${className}`}>
            {children}
        </div>
    )
}

export const CardContent = ({ children, className = "" }) => {
    return (
        <div className={`p-12 w-full h-full ${className}`}>
            {children}
        </div>
    )
}