"use client"

import * as React from "react"
import { HelpCircle, Bell, LayoutGrid, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"

const products = {
    GROW: [
        { name: "Accelerate", color: "bg-purple-500" },
        { name: "Catalyst", color: "bg-orange-500" },
        { name: "Align", color: "bg-red-500" },
    ],
    ANALYZE: [
        { name: "Insights", color: "bg-yellow-500" },
        { name: "Vista", color: "bg-green-400" },
        { name: "Mod Advisor", color: "bg-blue-500" },
    ],
    ENABLE: [
        { name: "Pulse", color: "bg-cyan-500" },
        { name: "Producer Training", color: "bg-orange-400" },
    ],
}

import { BetaFeaturesModal } from "@/components/modals/beta-features-modal"

export interface GlobalHeaderRef {
    openBeta: () => void
    openProducts: () => void
}

export function GlobalHeader() {
    const { setTheme } = useTheme()
    const [isBetaModalOpen, setIsBetaModalOpen] = React.useState(false)
    const [isProductsOpen, setIsProductsOpen] = React.useState(false)

    // Expose functions globally for keyboard shortcuts
    React.useEffect(() => {
        (window as any).openBetaModal = () => setIsBetaModalOpen(true);
        (window as any).openProductsDropdown = () => setIsProductsOpen(true)
    }, [])

    return (
        <header className="flex items-center justify-between px-6 py-2 border-b bg-background shrink-0 h-12">
            {/* Left: Branding */}
            <div className="flex items-center gap-2">
                <span className="font-semibold text-lg tracking-tight">Catalyst</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground pb-0.5">
                    <span>by</span>
                    <img src="/mployer-logo.png" alt="Mployer" className="h-3 object-contain opacity-80" />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                    onClick={() => setIsBetaModalOpen(true)}
                >
                    <Sparkles className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <HelpCircle className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <Bell className="h-4 w-4" />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        {Object.entries(products).map(([category, items], index) => (
                            <React.Fragment key={category}>
                                {index > 0 && <DropdownMenuSeparator />}
                                <DropdownMenuLabel className="text-xs text-muted-foreground font-normal uppercase tracking-wider">
                                    {category}
                                </DropdownMenuLabel>
                                {items.map((item) => (
                                    <DropdownMenuItem key={item.name} className="cursor-pointer">
                                        <div className={`h-2 w-2 rounded-full mr-2 ${item.color}`} />
                                        <span>{item.name}</span>
                                    </DropdownMenuItem>
                                ))}
                            </React.Fragment>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full ml-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">User Name</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    user@example.com
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Preferences
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                        Dark
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("navy")}>
                                        Navy
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <BetaFeaturesModal open={isBetaModalOpen} onOpenChange={setIsBetaModalOpen} />
        </header>
    )
}
