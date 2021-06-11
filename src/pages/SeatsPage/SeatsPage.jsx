import React from 'react'
import './style.css'
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import { useState, useEffect } from 'react'
import axios from 'axios'
import SeatBlock from '../../components/SeatBlock/SeatBlock'
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setSeatsAction } from '../../features/seats/seatsActions.js'
import { setAmountAction } from '../../features/seatAmount/seatAmountActions'
import { Link } from "react-router-dom";

export default function SeatsPage() {
    const spacing = 1;

    const { height, width } = useWindowDimensions();

    const [num, setNum] = useState(15)

    const [seats, setSeats] = useState(useSelector(state => state.seats))

    const [loading, setLoading] = useState(false)

    const seatAmount = useSelector(state => state.seatAmount.reservedPlaces)

    const nextToEachOther = useSelector(state => state.seatAmount.nextToEachOther)

    const dispatch = useDispatch()

    useEffect(() => {
        const foundIndex = seats.findIndex(seat => seat.reservedByUs !== undefined)

        if (foundIndex >= 0 || seatAmount === 0)
            return;

        setLoading(true)

        axios.get("http://localhost:4000/seats")
            .then((response) => {
                //przerobienie danych
                var startingIndex = 0;
                var counter = 0;

                var currMaxX = 0;
                var currMaxY = 0;

                for (const seat of response.data) {
                    if (seat.cords === undefined)
                        continue;

                    if (seat.cords.y > currMaxY)
                        currMaxY = seat.cords.y

                    if (seat.cords.x > currMaxX)
                        currMaxX = seat.cords.x

                }

                setNum(currMaxY + 1)

                var arr = response.data.reduce(function (r, e) {
                    if (e.cords) {
                        while (e.cords.y !== counter) {
                            if (counter <= num - 1) {
                                r.push({
                                    id: `s${startingIndex}${counter}`,
                                    cords: {
                                        x: startingIndex,
                                        y: counter
                                    }
                                })
                            }

                            counter++
                            if (counter > num - 1) {
                                counter = 0;
                                startingIndex++;
                            }
                        }
                        r.push(e)
                        counter++;
                    }
                    return r;
                }, []);

                var copySeatAmount = seatAmount;

                var copyArr = arr.map(a => ({...a}));

                let condition = seatAmount > 0;

                var t0 = performance.now()

                while (condition)
                {
                    var randX = Math.floor(Math.random() * currMaxX);
                    var randY = Math.floor(Math.random() * currMaxY);

                    var beforeRandX = randX;
                    var beforeRandY = randY;
                    
                    const found = copyArr.find(element => (element.reserved === false && element.cords.x === randX && element.cords.y === randY))
                    if (found)
                    {
                        var maxFails = 5;
                        while (copySeatAmount > 0 && maxFails > 0)
                        {
                            const indexOf = copyArr.findIndex(element => (element.reserved === false && element.cords.x === randX && element.cords.y === randY))

                            if (indexOf >= 0) {
                                if (!!copyArr[indexOf].reservedByUs === false) {
                                    copyArr[indexOf].reservedByUs = true

                                    copySeatAmount--

                                    if (copySeatAmount === 0)
                                        condition = false

                                    maxFails = 5
                                }
                                else {
                                    maxFails--
                                }

                                beforeRandX = randX
                                beforeRandY = randY

                                if (nextToEachOther)
                                {
                                    switch (Math.floor(Math.random() * 4))
                                    {
                                        case 0: 
                                            randX += 1
                                        break;
                                        case 1:
                                            randX -= 1
                                        break;
                                        case 2:
                                            randY += 1
                                        break;
                                        case 3:
                                            randY -= 1
                                        break;
                                        default:

                                        break;
                                    }
                                }
                                else {
                                    randX = Math.floor(Math.random() * currMaxX);
                                    randY = Math.floor(Math.random() * currMaxY);
                                }
                            }
                            else {
                                maxFails--
                                randX = beforeRandX
                                randY = beforeRandY
                            }

                            var t1 = performance.now()

                            if ((t1 - t0) >= 1000)
                            {
                                alert("Nie udało się znaleźć miejsc w odpowiednim czasie")
                                copyArr = arr
                                dispatch(setAmountAction(0, nextToEachOther))
                                maxFails = 0
                                condition = false
                            }
                        }
                    }

                    copySeatAmount = seatAmount

                    if (condition)
                        copyArr = arr.map(a => ({...a}))
                }

                setSeats(copyArr)

                dispatch(setSeatsAction(copyArr))
                
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        dispatch(setSeatsAction(seats))
    }, [seatAmount])

    return (
        <div className="seats-container">
            <div className="seats">
                { !loading &&
                <Grid container justify="center" spacing={spacing}>
                    {seats.map(
                        (value) => (
                            <Grid key={value.id} item>
                                <SeatBlock id={value.id} height={(height - num * 15 * spacing) / num} width={(width - num * 15 * spacing + 15) / num} reserved={value.reserved} ourSeats={!!value.reservedByUs} object={value}></SeatBlock>
                            </Grid>
                        )
                    )}
                </Grid>
                }
                {
                    loading &&
                    <Skeleton variant="rect" width={(width)} height={(height - num * 8 * spacing - num * 4)} />
                }
            </div>
            <div className="information">
                <Grid 
                container 
                direction="row" 
                justify="center" 
                alignItems="center" 
                spacing={spacing}>
                    <Grid item>
                        <SeatBlock height={(height - num * 15 * spacing) / num} width={(width - num * 15 * spacing) / num} reserved={false} ourSeats={false} cannotChange={true}></SeatBlock>
                        <p>Miejsca dostępne</p>
                    </Grid>
                    <Grid item>
                        <SeatBlock height={(height - num * 15 * spacing) / num} width={(width - num * 15 * spacing) / num} reserved={true} cannotChange={true}></SeatBlock>
                        <p>Miejsca zarezerwowane</p>
                    </Grid>
                    <Grid item>
                        <SeatBlock height={(height - num * 15 * spacing) / num} width={(width - num * 15 * spacing) / num} reserved={false} ourSeats={true} cannotChange={true}></SeatBlock>
                        <p>Miejsca zarezerwowane</p>
                    </Grid>
                    <Grid item>
                        <Link to = "/checkout" style = {{ color: 'inherit', textDecoration: 'inherit', width: '350px', height: '60px'}}
                        onClick = {(event => {
                            if (seatAmount === 0)
                            {
                                event.preventDefault()
                                alert("Prosze wybrać przynajmniej jedno miejsce!")
                            }
                        })}>
                            <Button 
                                variant="outlined" 
                                style={{width: "350px", height: "60px"}}
                                labelStyle={{ fontSize: '40px'}}>
                                Rezerwuj
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}