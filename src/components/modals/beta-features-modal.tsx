"use client"

import { useState } from "react"
import { Sparkles, Info, Calendar, PlayCircle, ChevronDown, ChevronUp } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BetaFeature {
    id: string
    title: string
    description: string
    lastChanged: string
    isNew: boolean
    isEnabled: boolean
}

const initialFeatures: BetaFeature[] = [
    {
        id: "ai-search",
        title: "AI-Powered Search",
        description: "Search through your content using natural language queries powered by advanced AI. Get more relevant results faster.",
        lastChanged: "Nov 14, 2025",
        isNew: true,
        isEnabled: false,
    },
    {
        id: "smart-filters",
        title: "Smart Filters",
        description: "Automatically suggest relevant filters based on your search history and current context.",
        lastChanged: "Nov 20, 2025",
        isNew: true,
        isEnabled: false,
    },
]

interface BetaFeaturesModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function BetaFeaturesModal({ open, onOpenChange }: BetaFeaturesModalProps) {
    const [features, setFeatures] = useState<BetaFeature[]>(initialFeatures)
    const [isInfoExpanded, setIsInfoExpanded] = useState(true)

    const toggleFeature = (id: string) => {
        setFeatures(features.map(f =>
            f.id === id ? { ...f, isEnabled: !f.isEnabled } : f
        ))
    }

    const enabledCount = features.filter(f => f.isEnabled).length

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 border-b h-14">
                    <div className="h-full flex items-center border-b-2 border-primary px-1">
                        <span className="text-sm font-medium text-primary">Beta Features</span>
                    </div>
                    {/* Close button is handled by DialogContent default close */}
                </div>

                <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                    {/* Summary Card */}
                    <div className="flex items-start justify-between border rounded-lg p-4 bg-card">
                        <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                                <Sparkles className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-base">Beta Features</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Try out new features before they're released to everyone. You can enable or disable individual features at any time.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-muted/50 rounded-md px-4 py-2 min-w-[80px]">
                            <span className="text-lg font-bold">{enabledCount}</span>
                            <span className="text-xs text-muted-foreground">Enabled</span>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-900/50 overflow-hidden">
                        <button
                            onClick={() => setIsInfoExpanded(!isInfoExpanded)}
                            className="w-full flex items-center justify-between p-4 text-left"
                        >
                            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                                <Info className="h-5 w-5" />
                                <span className="font-semibold text-sm">About Beta Features</span>
                            </div>
                            {isInfoExpanded ? (
                                <ChevronUp className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                            ) : (
                                <ChevronDown className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                            )}
                        </button>

                        {isInfoExpanded && (
                            <div className="px-4 pb-4 pl-11">
                                <ul className="list-disc space-y-2 text-sm text-muted-foreground">
                                    <li>These features are still in development and may change based on feedback.</li>
                                    <li>Changes take effect immediately when you toggle a feature.</li>
                                    <li>You can enable or disable features at any time.</li>
                                    <li>Some features may require a page refresh to fully activate.</li>
                                    <li>Your feedback helps us improve these features before general release.</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Feature Cards */}
                    <div className="space-y-4">
                        {features.map((feature) => (
                            <div key={feature.id} className="border rounded-lg p-6 space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-base">{feature.title}</h3>
                                        {feature.isNew && (
                                            <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none">
                                                New
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground">
                                            {feature.isEnabled ? "Enabled" : "Disabled"}
                                        </span>
                                        <Switch
                                            checked={feature.isEnabled}
                                            onCheckedChange={() => toggleFeature(feature.id)}
                                        />
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    {feature.description}
                                </p>

                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>Last changed {feature.lastChanged}</span>
                                </div>

                                <div className="pt-4 border-t">
                                    <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-foreground gap-2 text-sm font-normal">
                                        <PlayCircle className="h-4 w-4" />
                                        How to use this feature
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
