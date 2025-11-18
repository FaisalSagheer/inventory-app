'use client'
import data from "../data.json"

import { DataTable } from "../../../components/data-table"

function Inventory() {
    return (
        <div className="pt-5">
            <DataTable data={data} />
        </div>
    )
}

export default Inventory
