"use client"

import { useTheme } from "next-themes"
import { IconButton, type IconButtonProps } from "@radix-ui/themes"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"

export default function ThemeButton(
    props: IconButtonProps
) {
    const { theme, setTheme } = useTheme()
    const toggleMode = () => setTheme(theme == 'light' ? 'dark' : 'light')

    return (
        <IconButton {...props} onClick={toggleMode}>
            {theme == 'light' ? <MoonIcon /> : <SunIcon />}
        </IconButton>
    )
}