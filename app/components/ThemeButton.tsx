"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button, IconButton } from "@radix-ui/themes"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"

export default function ThemeButton() {
    const { theme, setTheme } = useTheme()
    const toggleMode = () => setTheme(theme == 'light' ? 'dark' : 'light')

    return (
        <IconButton onClick={toggleMode} variant="ghost">
            {theme == 'light' ? <MoonIcon /> : <SunIcon />}
        </IconButton>
    )
}