import { Box } from "@mui/material";
import React, { ReactNode } from "react";

export const PageMain: React.FunctionComponent<{ children: ReactNode }> = ({ children }) => (
    <Box
        component={'main'}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        alignItems='stretch'
        flexBasis='100%'
        flexShrink={1}
        paddingX={2}
    >
        {children}
    </Box>
)