import { CircularProgress } from '@mui/material';
import './index.scss';

export default function LoadingComponent() {
    return (
        <div className='loading-container'>
            <CircularProgress />
        </div>
    );
}