"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SearchHeader() {
    const [activeTab, setActiveTab] = useState<"company" | "contacts">("company")
    const searchParams = useSearchParams()
    const searchType = searchParams.get("searchType") || "Employer Search"

    return (
        <div className="flex items-center justify-between px-6 py-3 border-b bg-background shrink-0 h-14">
            {/* Left: Search Type Selector */}
            <Button variant="ghost" className="gap-2 text-sm font-medium hover:bg-transparent p-0 h-auto">
                {searchType}
            </Button>

            {/* Right: Toggle */}
            <div className="flex items-center bg-muted/50 p-1 rounded-full border">
                <button
                    onClick={() => setActiveTab("company")}
                    className={cn(
                        "px-4 py-1 text-xs font-medium rounded-full transition-all",
                        activeTab === "company"
                            ? "bg-orange-100 text-orange-600 shadow-sm border border-orange-200"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    Company
                </button>
                <button
                    onClick={() => setActiveTab("contacts")}
                    className={cn(
                        "px-4 py-1 text-xs font-medium rounded-full transition-all",
                        activeTab === "contacts"
                            ? "bg-orange-100 text-orange-600 shadow-sm border border-orange-200"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    Contacts
                </button>
            </div>
        </div>
    )
}
