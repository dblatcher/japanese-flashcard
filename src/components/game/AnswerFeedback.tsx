import { Box, Collapse, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { TransitionIn } from "../TransitionIn";

interface Props {
    transitionKey: number | string;
    success?: boolean
    content?: ReactNode
}


export const AnswerFeedback: React.FunctionComponent<Props> = ({ transitionKey, success = false, content = "" }) => {

    const backgroundColor = success ? 'success.light' : 'error.light'

    return (
        <Box minHeight={'1.5em'} maxHeight={'1.5em'}>
            <TransitionIn key={transitionKey} timeout={500} Transition={Collapse} orientation='horizontal'>
                <Typography sx={{ maxHeight: '1.5em', backgroundColor, paddingX: 1, borderRadius: 2, }}>
                    {content}
                </Typography>
            </TransitionIn>
        </Box>
    )
}