import React from 'react'
import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { incrementAction, decrementAction } from '../../features/seatAmount/seatAmountActions.js'

export default function SeatBlock(props) {

    const [reservedByUs, setReservedByUs] = useState(props.ourSeats)

    const dispatch = useDispatch()

    var res;

    if (props.reserved === undefined) {
        res =   <div style={{display: 'flex', border: '2px solid', width: `${props.width}px`, height: `${props.height}px`, opacity: '0'}}>
                    
                </div>
    }
    else if (props.reserved === true) {
        res =   <div style={{display: 'flex', border: '2px solid', width: `${props.width}px`, height: `${props.height}px`, backgroundColor: 'black'}}>
                    
                </div>
    }
    else {
        const func = props.cannotChange ? () => {} : () => {
            props.object.reservedByUs = !reservedByUs

            if (reservedByUs)
                dispatch(decrementAction())
            else
                dispatch(incrementAction())

            setReservedByUs(!reservedByUs)
        } 

        res =   <div 
                onClick={func}
                style={{display: 'flex', border: '2px solid', width: `${props.width}px`, height: `${props.height}px`, cursor: props.cannotChange ? 'inherit' : 'pointer', backgroundColor: `${reservedByUs ? 'orange' : 'white'}`}}>
                    
                </div>
    }

    return (
        res
    )
}