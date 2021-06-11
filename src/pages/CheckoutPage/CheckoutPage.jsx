import React from 'react'
import './style.css'
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

export default function CheckoutPage() {

    const seats = useSelector(state => state.seats)

    var index = 0;

    return (
        <div className="checkout-container">
            <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            >
                <Grid item>
                    <h1>Twoja rezerwacja przebiegła pomyślnie!</h1>
                </Grid>
                {seats.map(
                    (value) => {
                        if (value.reservedByUs === true)
                        {
                            index++
                            return (
                                <Grid key={value.id} item>
                                    <p>{`- rząd x${value.cords.x}, miejsce y${value.cords.y} (id${index})`}</p>
                                </Grid>
                            )
                        }
                    }
                )}
                <Grid item>
                    <h1>Dziękujemy! W razie problemów prosimy o kontakt z działem administracji</h1>
                </Grid>
                <Grid item>
                    <Link 
                    to = "/" 
                    style = {{ color: 'inherit', textDecoration: 'inherit', width: '300px', height: '60px'}}>
                        <Button
                        variant = 'outlined' 
                        style = {{width: '300px', height: '60px'}}
                        >
                        Powrót do strony głównej
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </div>
    )
}
