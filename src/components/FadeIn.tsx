import { Fade, FadeProps } from "@mui/material";
import React, { useEffect, useState } from "react";


export const FadeIn: React.FunctionComponent<FadeProps> = (props) => {
    const [fadedIn, setFadedIn] = useState(false);
    const [timerstarted, setTimerStarted] = useState(false);

    const { children, ...rest } = props

    useEffect(() => {
        if (timerstarted) {
            return
        }
        setTimerStarted(true)
        setTimeout(() => {
            setFadedIn(true)
        }, 1)
    }, [setTimerStarted])


    return (<Fade  {...rest} in={fadedIn}>
        <div>{children}</div>
    </Fade>)
} 