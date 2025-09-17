import React from 'react'

function StatCard({ title, value, change, icon, changeColor }) {
    return (
        <div className="card p-6 rounded-lg flex flex-col bg-base-100">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-primary">{title}</p>
                <span className="material-symbols-outlined">
                    {icon}
                </span>
            </div>
            <p className="text-3xl font-bold text-info mt-2">{value}</p>
            {change && (
                <p className={`text-xs mt-1 ${changeColor}`}>{change}</p>
            )}
        </div>
    )
}

export default StatCard