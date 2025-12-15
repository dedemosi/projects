"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { KeyboardShortcutsModal } from "@/components/modals/keyboard-shortcuts-modal"

export function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [isHelpOpen, setIsHelpOpen] = useState(false)

    const shortcuts = [
        // Navigation - Search Types
        {
            key: "1",
            description: "Go to Employer Search",
            action: () => router.push("/?searchType=Employer Search"),
            category: "Navigation",
        },
        {
            key: "2",
            description: "Go to Carrier Search",
            action: () => router.push("/?searchType=Carrier Search"),
            category: "Navigation",
        },
        {
            key: "3",
            description: "Go to Broker Search",
            action: () => router.push("/?searchType=Broker Search"),
            category: "Navigation",
        },
        {
            key: "4",
            description: "Go to Retirement Search",
            action: () => router.push("/?searchType=Retirement Search"),
            category: "Navigation",
        },
        {
            key: "5",
            description: "Go to P&C Search",
            action: () => router.push("/?searchType=P&C Search"),
            category: "Navigation",
        },
        {
            key: "6",
            description: "Go to PEO Search",
            action: () => router.push("/?searchType=PEO Search"),
            category: "Navigation",
        },
        // Actions
        {
            key: "b",
            description: "Open Beta Features",
            action: () => {
                if ((window as any).openBetaModal) {
                    (window as any).openBetaModal()
                }
            },
            category: "Actions",
        },
        {
            key: "p",
            description: "Open Product Switcher",
            action: () => {
                // Trigger click on the product switcher button
                const productButton = document.querySelector('[title="Product Switcher"]') as HTMLButtonElement
                if (productButton) {
                    productButton.click()
                }
            },
            category: "Actions",
        },
        {
            key: "?",
            shiftKey: true,
            description: "Show Keyboard Shortcuts",
            action: () => setIsHelpOpen(true),
            category: "Actions",
        },
    ]

    useKeyboardShortcuts(shortcuts, true)

    return (
        <>
            {children}
            <KeyboardShortcutsModal open={isHelpOpen} onOpenChange={setIsHelpOpen} />
        </>
    )
}
