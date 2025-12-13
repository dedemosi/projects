"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    List,
    Settings,
    Building2,
    ShieldCheck,
    Briefcase,
    Coins,
    Umbrella,
    Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        type: "link",
    },
    {
        title: "Employer Search",
        href: "/?searchType=Employer Search",
        icon: Building2,
        type: "search",
        searchType: "Employer Search",
    },
    {
        title: "Carrier Search",
        href: "/?searchType=Carrier Search",
        icon: ShieldCheck,
        type: "search",
        searchType: "Carrier Search",
    },
    {
        title: "Broker Search",
        href: "/?searchType=Broker Search",
        icon: Briefcase,
        type: "search",
        searchType: "Broker Search",
    },
    {
        title: "Retirement Search",
        href: "/?searchType=Retirement Search",
        icon: Coins,
        type: "search",
        searchType: "Retirement Search",
    },
    {
        title: "P&C Search",
        href: "/?searchType=P&C Search",
        icon: Umbrella,
        type: "search",
        searchType: "P&C Search",
    },
    {
        title: "PEO Search",
        href: "/?searchType=PEO Search",
        icon: Users,
        type: "search",
        searchType: "PEO Search",
    },
    {
        title: "Saved Lists",
        href: "/lists",
        icon: List,
        type: "link",
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
        type: "link",
    },
]

export function SideNav() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentSearchType = searchParams.get("searchType") || "Employer Search"

    return (
        <div className="flex flex-col h-screen w-12 border-r bg-sidebar text-sidebar-foreground shrink-0 items-center py-3">
            {/* Logo Section */}
            <div className="mb-6">
                <div className="h-8 w-8 flex items-center justify-center">
                    <img src="/logo.png" alt="Logo" className="h-full w-full object-contain" />
                </div>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 flex flex-col gap-2 w-full px-1.5">
                {navItems.map((item) => {
                    const isActive = item.type === "search"
                        ? pathname === "/" && currentSearchType === item.searchType
                        : pathname === item.href

                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            title={item.title}
                            className={cn(
                                "flex items-center justify-center h-9 w-9 rounded-md transition-colors",
                                isActive
                                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
