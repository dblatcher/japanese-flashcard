import { CollapseProps, Fade, FadeProps, SlideProps, Zoom, ZoomProps } from "@mui/material";
import React, { useEffect, useState } from "react";

type Props = FadeProps & SlideProps & ZoomProps & CollapseProps & {
    Transition?: typeof Fade
}

export const TransitionIn: React.FunctionComponent<Props> = (props) => {
    const [fadedIn, setFadedIn] = useState(false);
    const [timerstarted, setTimerStarted] = useState(false);

    const { Transition = Fade, children, ...rest } = props

    useEffect(() => {
        if (timerstarted) {
            return
        }
        setTimerStarted(true)
        setTimeout(() => {
            setFadedIn(true)
        }, 1)
    }, [setTimerStarted])


    return (<Transition  {...rest} in={fadedIn}>
        <div>{children}</div>
    </Transition>)
} 