'use client'
import { ButtonGroup } from "@mui/material";
import { usePathname } from "next/navigation";
import React from "react";
import { LinkButton } from "../LinkButton";


const NavButton: React.FunctionComponent<{
    label: string
    href: string,
    currentPath: string
}> = ({ label, href, currentPath }) => (
    <LinkButton href={href} variant={currentPath === href ? 'contained' : 'outlined'}>{label}</LinkButton>
)


export const Navbar: React.FunctionComponent = () => {

    const path = usePathname()

    return (
        <ButtonGroup>
            <NavButton href="/" label="home" currentPath={path} />
            <NavButton href="/learn-characters" label="learn characters" currentPath={path} />
            <NavButton href="/vocab-test" label="learn words" currentPath={path} />
            <NavButton href="/about" label="about" currentPath={path} />
        </ButtonGroup>
    )
}