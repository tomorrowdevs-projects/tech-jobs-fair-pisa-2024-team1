import { atom } from "nanostores"
import { Report } from "../types"
import { useStore } from "@nanostores/react"
import { getReports } from "../api"
import { useState } from "react"

export const $allReports = atom<Report[]>([])

export const useReports = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const allReports = useStore($allReports)

    const findReports = async () => {

        try {
            setLoading(true)
            const { data } = await getReports();
            $allReports.set(data)
            setLoading(false)
            return data
        } catch (err) {
            setLoading(false)
            throw err
        }
    }

    return {
        loading,
        allReports,
        findReports
    }
}