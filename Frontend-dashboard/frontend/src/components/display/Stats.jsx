import { useContext } from 'react';
import { Context } from '../../ContextProvider';

export default function Stats() {
    let { Filters, HotelData } = useContext(Context);
    let [filter, setFilter] = Filters;
    let [hotelData, setHotelData] = HotelData;
    
    return (
        <>
            0
        </>
    )
}