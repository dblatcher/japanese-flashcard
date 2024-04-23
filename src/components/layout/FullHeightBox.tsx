import { Box, BoxProps } from "@mui/material";
import React, { ReactNode } from "react";

export const FullHeightBox: React.FunctionComponent<{ children: ReactNode } & BoxProps> = ({ children, ...rest }) => (
    <Box
        display='flex'
        flexDirection='column'
        alignItems='flex-start'
        flexBasis='100%'
        flexShrink={1}
        {...rest}
    >
        {children}
    </Box>
)