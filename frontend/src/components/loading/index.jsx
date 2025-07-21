import { CircularProgress } from '@mui/material'
import './index.scss'

export default function Loading() {
    return (
        <div className='loading-container'>
            <CircularProgress />
        </div>
    )
}