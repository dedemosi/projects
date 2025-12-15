"use client"

import { useEffect } from "react"

export interface KeyboardShortcut {
    key: string
    ctrlKey?: boolean
    metaKey?: boolean
    shiftKey?: boolean
    description: string
    action: () => void
    category?: string
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[], enabled = true) {
    useEffect(() => {
        if (!enabled) return

        const handleKeyDown = (event: KeyboardEvent) => {
            // Don't trigger shortcuts when typing in inputs, textareas, or contenteditable elements
            const target = event.target as HTMLElement
            if (
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable
            ) {
                return
            }

            for (const shortcut of shortcuts) {
                const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase()
                const ctrlMatch = shortcut.ctrlKey === undefined || event.ctrlKey === shortcut.ctrlKey
                const metaMatch = shortcut.metaKey === undefined || event.metaKey === shortcut.metaKey
                const shiftMatch = shortcut.shiftKey === undefined || event.shiftKey === shortcut.shiftKey

                if (keyMatch && ctrlMatch && metaMatch && shiftMatch) {
                    event.preventDefault()
                    shortcut.action()
                    break
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [shortcuts, enabled])
}
