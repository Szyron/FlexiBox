import React from 'react'

function RecentOrdersTable() {
  return (
    <div className="card rounded-lg p-4 sm:p-6 bg-base-100">
      <h3 className="text-lg font-semibold text-primary mb-4">
        Legutóbbi rendelések
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-[var(--text-base-content)] uppercase border-b border-[var(--border-base-300)]">
            <tr>
              <th className="px-4 py-3">Rendelés ID</th>
              <th className="px-4 py-3 hidden md:table-cell">Vevő</th>
              <th className="px-4 py-3">Összeg</th>
              <th className="px-4 py-3">Státusz</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[var(--border-base-300)]">
              <td className="px-4 py-4 font-medium text-primary">#12548</td>
              <td className="px-4 py-4 hidden md:table-cell">Kovács Anna</td>
              <td className="px-4 py-4">15,990 Ft</td>
              <td className="px-4 py-4">
                <span className="bg-yellow-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                  Feldolgozás alatt
                </span>
              </td>
            </tr>
            <tr className="border-b border-[var(--border-base-300)]">
              <td className="px-4 py-4 font-medium text-primary">#12547</td>
              <td className="px-4 py-4 hidden md:table-cell">Nagy Gábor</td>
              <td className="px-4 py-4">32,500 Ft</td>
              <td className="px-4 py-4">
                <span className="bg-success text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                  Teljesítve
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-4 font-medium text-primary">#12546</td>
              <td className="px-4 py-4 hidden md:table-cell">Tóth Eszter</td>
              <td className="px-4 py-4">8,200 Ft</td>
              <td className="px-4 py-4">
                <span className="bg-warning text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                  Törölve
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentOrdersTable