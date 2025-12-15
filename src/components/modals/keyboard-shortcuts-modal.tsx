"use client"

import { useState } from "react"
import { Command, X } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface KeyboardShortcut {
    keys: string[]
    description: string
    category: string
}

const shortcuts: KeyboardShortcut[] = [
    // Navigation
    { keys: ["1"], description: "Go to Employer Search", category: "Navigation" },
    { keys: ["2"], description: "Go to Carrier Search", category: "Navigation" },
    { keys: ["3"], description: "Go to Broker Search", category: "Navigation" },
    { keys: ["4"], description: "Go to Retirement Search", category: "Navigation" },
    { keys: ["5"], description: "Go to P&C Search", category: "Navigation" },
    { keys: ["6"], description: "Go to PEO Search", category: "Navigation" },

    // Actions
    { keys: ["B"], description: "Open Beta Features", category: "Actions" },
    { keys: ["P"], description: "Open Product Switcher", category: "Actions" },
    { keys: ["?"], description: "Show Keyboard Shortcuts", category: "Actions" },
]

const categories = Array.from(new Set(shortcuts.map(s => s.category)))

interface KeyboardShortcutsModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function KeyboardShortcutsModal({ open, onOpenChange }: KeyboardShortcutsModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Command className="h-5 w-5" />
                        Keyboard Shortcuts
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 pt-4">
                    {categories.map((category) => (
                        <div key={category}>
                            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                                {category}
                            </h3>
                            <div className="space-y-2">
                                {shortcuts
                                    .filter((s) => s.category === category)
                                    .map((shortcut, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between py-2 border-b last:border-0"
                                        >
                                            <span className="text-sm">{shortcut.description}</span>
                                            <div className="flex gap-1">
                                                {shortcut.keys.map((key, i) => (
                                                    <Badge
                                                        key={i}
                                                        variant="outline"
                                                        className="font-mono text-xs px-2 py-0.5"
                                                    >
                                                        {key}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                        Press <Badge variant="outline" className="font-mono text-xs mx-1">?</Badge> to toggle this help
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
