import React from 'react'
import './style.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { setAmountAction } from '../../features/seatAmount/seatAmountActions.js'
import { setSeatsAction } from '../../features/seats/seatsActions.js'
import { useDispatch } from 'react-redux'

export default function SelectionPage() {

    const [ilosc, setIlosc] = useState(1)
    const [obokSiebie, setObokSiebie] = useState(false)

    const dispatch = useDispatch()

    return (
        <div className="selection-container">
            <div className="wrapper">
                <div className="holder">
                    <p>Liczba miejsc: </p>
                    <TextField
                        className="numberField"
                        id="filled-number"
                        label="Number"
                        type="number"
                        value={ilosc}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onChange={(event) => event.target.value < 1 ? setIlosc(1) : setIlosc(event.target.value)}
                        style={{width: "180px"}}
                    />
                </div>
                <div className="holder">
                <FormControlLabel
                    value="end"
                    control={<Checkbox 
                        color="primary"
                        value={obokSiebie} 
                        onChange={() => setObokSiebie(!obokSiebie)}
                    />}
                    label="Czy miejsca mają być obok siebie?"
                    labelPlacement="end"
                />
                </div>
                <div className="holder">
                    <Link 
                    to = "/seats" 
                    style = {{ color: 'inherit', textDecoration: 'inherit', width: '300px', height: '60px'}}
                    onClick = {(event => {
                        dispatch(setSeatsAction([]))
                        dispatch(setAmountAction(ilosc, obokSiebie))
                    })}>
                        <Button
                        variant = 'outlined' 
                        style = {{width: '300px', height: '60px'}}
                        >
                        Wybierz miejsca
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}