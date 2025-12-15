"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Search, Plus, Pencil, X, ChevronDown, ChevronUp, Filter, ChevronLeft, LayoutGrid, List } from "lucide-react"
import { FilterState } from "@/app/page"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

interface FilterSidebarProps {
    filters: FilterState
    onApplyFilters: (filters: FilterState) => void
    onClearFilters: () => void
}

export function FilterSidebar({ filters, onApplyFilters, onClearFilters }: FilterSidebarProps) {
    const [filterTerm, setFilterTerm] = React.useState("")
    const [isExpanded, setIsExpanded] = React.useState(false)
    const [localFilters, setLocalFilters] = React.useState<FilterState>(filters)

    // Sync local state with props when parent updates (e.g. Clear All)
    React.useEffect(() => {
        setLocalFilters(filters)
    }, [filters])

    const handleLocalChange = (key: keyof FilterState, value: any) => {
        setLocalFilters(prev => ({ ...prev, [key]: value }))
    }

    const activeCount = Object.values(filters).flat().filter(Boolean).length - 1 // -1 for default revenue range

    const shouldShow = (label: string) => {
        if (!filterTerm) return true
        return label.toLowerCase().includes(filterTerm.toLowerCase())
    }

    // Helper to check if a section has any visible items
    const hasVisibleItems = (labels: string[]) => {
        if (!filterTerm) return true
        return labels.some(label => label.toLowerCase().includes(filterTerm.toLowerCase()))
    }

    return (
        <div className={cn(
            "flex h-full flex-col border-r bg-background/50 backdrop-blur-sm overflow-hidden transition-all duration-300 ease-in-out",
            isExpanded ? "w-[600px]" : "w-[320px]"
        )}>
            <div className="p-3 space-y-2 shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="text-sm font-bold text-foreground">Filters</h2>
                        <div className="flex items-center justify-center rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium">
                            {activeCount} <ChevronDown className="ml-1 h-3 w-3" />
                        </div>
                        <span className="text-muted-foreground/30">|</span>
                        <Button variant="ghost" size="sm" className="h-auto p-0 text-[10px] text-muted-foreground hover:text-primary" onClick={onClearFilters}>
                            Clear All
                        </Button>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-muted"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full border">
                            <ChevronLeft className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                        placeholder="Search filters or values"
                        className="pl-8 h-8 text-xs bg-background border-muted-foreground/20"
                        value={filterTerm}
                        onChange={(e) => setFilterTerm(e.target.value)}
                    />
                </div>
            </div>

            <ScrollArea className="flex-1 min-h-0 px-3 pb-3">
                <div className={cn(
                    "gap-4",
                    isExpanded ? "grid grid-cols-2" : "space-y-3"
                )}>

                    {/* Company Info Section */}
                    {hasVisibleItems(["Company Name", "Industry", "Size", "City", "State", "County"]) && (
                        <div className={cn("space-y-1.5", isExpanded && "row-span-2")}>
                            <h3 className="text-xs font-bold text-foreground px-1">Company Info</h3>

                            {shouldShow("Company Name") && (
                                <FilterItem
                                    label="Company Name"
                                    isActive={!!localFilters.searchQuery && localFilters.searchQuery.length > 0}
                                    activeTags={localFilters.searchQuery ? [{
                                        label: localFilters.searchQuery,
                                        onRemove: () => handleLocalChange("searchQuery", "")
                                    }] : []}
                                >
                                    <div className="grid gap-1.5">
                                        <Input
                                            placeholder="Enter company name"
                                            className="h-7 text-xs"
                                            value={localFilters.searchQuery}
                                            onChange={(e) => handleLocalChange("searchQuery", e.target.value)}
                                        />
                                    </div>
                                </FilterItem>
                            )}

                            {shouldShow("Industry") && (
                                <FilterItem
                                    label="Industry"
                                    isActive={localFilters.industry.length > 0}
                                    activeTags={localFilters.industry.map(ind => ({
                                        label: ind,
                                        onRemove: () => handleLocalChange("industry", localFilters.industry.filter(i => i !== ind))
                                    }))}
                                >
                                    <div className="grid gap-1.5">
                                        {["Manufacturing", "Software", "Healthcare", "Retail", "Defense", "Technology", "Internet", "Pharmaceuticals"].map((ind) => (
                                            <div key={ind} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={ind}
                                                    checked={localFilters.industry.includes(ind)}
                                                    onCheckedChange={(checked) => {
                                                        const current = localFilters.industry
                                                        const updated = checked
                                                            ? [...current, ind]
                                                            : current.filter((i) => i !== ind)
                                                        handleLocalChange("industry", updated)
                                                    }}
                                                />
                                                <label htmlFor={ind} className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{ind}</label>
                                            </div>
                                        ))}
                                    </div>
                                </FilterItem>
                            )}

                            {shouldShow("Size") && (
                                <FilterItem
                                    label="Size (Eligible Parts.)"
                                    isActive={localFilters.size.length > 0}
                                    activeTags={localFilters.size.map(s => ({
                                        label: s === 'small' ? '1-50' : s === 'medium' ? '51-500' : '500+',
                                        onRemove: () => handleLocalChange("size", localFilters.size.filter(i => i !== s))
                                    }))}
                                >
                                    <div className="grid gap-2">
                                        {[
                                            { label: "1 - 50", value: "small" },
                                            { label: "51 - 500", value: "medium" },
                                            { label: "500+", value: "large" }
                                        ].map((size) => (
                                            <div key={size.value} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={size.value}
                                                    checked={localFilters.size.includes(size.value)}
                                                    onCheckedChange={(checked) => {
                                                        const current = localFilters.size
                                                        const updated = checked
                                                            ? [...current, size.value]
                                                            : current.filter((i) => i !== size.value)
                                                        handleLocalChange("size", updated)
                                                    }}
                                                />
                                                <label htmlFor={size.value} className="text-sm">{size.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                </FilterItem>
                            )}

                            {shouldShow("City") && (
                                <FilterItem
                                    label="City"
                                    isActive={!!localFilters.location}
                                    activeTags={localFilters.location ? [{
                                        label: localFilters.location,
                                        onRemove: () => handleLocalChange("location", "")
                                    }] : []}
                                >
                                    <div className="grid gap-2">
                                        <Input
                                            placeholder="e.g. Austin"
                                            className="h-8"
                                            value={localFilters.location}
                                            onChange={(e) => handleLocalChange("location", e.target.value)}
                                        />
                                    </div>
                                </FilterItem>
                            )}

                            {shouldShow("State") && (
                                <FilterItem
                                    label="State"
                                    isActive={localFilters.state.length > 0}
                                    activeTags={localFilters.state.map(st => ({
                                        label: st,
                                        onRemove: () => handleLocalChange("state", localFilters.state.filter(i => i !== st))
                                    }))}
                                >
                                    <div className="grid gap-2 grid-cols-2">
                                        {["TX", "CA", "NY", "CO", "PA", "MO"].map((st) => (
                                            <div key={st} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`state-${st}`}
                                                    checked={localFilters.state.includes(st)}
                                                    onCheckedChange={(checked) => {
                                                        const current = localFilters.state
                                                        const updated = checked
                                                            ? [...current, st]
                                                            : current.filter((i) => i !== st)
                                                        handleLocalChange("state", updated)
                                                    }}
                                                />
                                                <label htmlFor={`state-${st}`} className="text-sm">{st}</label>
                                            </div>
                                        ))}
                                    </div>
                                </FilterItem>
                            )}

                            {shouldShow("County") && (
                                <FilterItem
                                    label="County"
                                    isActive={!!localFilters.county}
                                    activeTags={localFilters.county ? [{
                                        label: localFilters.county,
                                        onRemove: () => handleLocalChange("county", "")
                                    }] : []}
                                >
                                    <div className="grid gap-2">
                                        <Input
                                            placeholder="e.g. Travis"
                                            className="h-8"
                                            value={localFilters.county}
                                            onChange={(e) => handleLocalChange("county", e.target.value)}
                                        />
                                    </div>
                                </FilterItem>
                            )}
                        </div>
                    )}

                    {/* Brokers & Carriers Section */}
                    {hasVisibleItems(["Top Broker", "Carrier", "Renewal Date"]) && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-foreground px-1">Brokers & Carriers</h3>

                            {shouldShow("Top Broker") && (
                                <FilterItem
                                    label="Top Broker"
                                    isActive={localFilters.topBroker.length > 0}
                                    activeTags={localFilters.topBroker.map(broker => ({
                                        label: broker,
                                        onRemove: () => handleLocalChange("topBroker", localFilters.topBroker.filter(i => i !== broker))
                                    }))}
                                >
                                    <div className="grid gap-2">
                                        {["Marsh & McLennan", "Aon", "Willis Towers Watson", "Gallagher", "Local Brokerage"].map((broker) => (
                                            <div key={broker} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={broker}
                                                    checked={localFilters.topBroker.includes(broker)}
                                                    onCheckedChange={(checked) => {
                                                        const current = localFilters.topBroker
                                                        const updated = checked
                                                            ? [...current, broker]
                                                            : current.filter((i) => i !== broker)
                                                        handleLocalChange("topBroker", updated)
                                                    }}
                                                />
                                                <label htmlFor={broker} className="text-sm">{broker}</label>
                                            </div>
                                        ))}
                                    </div>
                                </FilterItem>
                            )}

                            {shouldShow("Carrier") && (
                                <FilterItem
                                    label="Carrier"
                                    isActive={localFilters.carriers.length > 0}
                                    activeTags={localFilters.carriers.map(carrier => ({
                                        label: carrier,
                                        onRemove: () => handleLocalChange("carriers", localFilters.carriers.filter(i => i !== carrier))
                                    }))}
                                >
                                    <div className="grid gap-2">
                                        {["BlueCross BlueShield", "UnitedHealthcare", "Aetna", "Cigna", "Kaiser Permanente", "Anthem", "Humana"].map((carrier) => (
                                            <div key={carrier} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={carrier}
                                                    checked={localFilters.carriers.includes(carrier)}
                                                    onCheckedChange={(checked) => {
                                                        const current = localFilters.carriers
                                                        const updated = checked
                                                            ? [...current, carrier]
                                                            : current.filter((i) => i !== carrier)
                                                        handleLocalChange("carriers", updated)
                                                    }}
                                                />
                                                <label htmlFor={carrier} className="text-sm">{carrier}</label>
                                            </div>
                                        ))}
                                    </div>
                                </FilterItem>
                            )}

                            {shouldShow("Renewal Date") && (
                                <FilterItem
                                    label="Renewal Date"
                                    isActive={localFilters.renewalDate === "next_3_months"}
                                    activeTags={localFilters.renewalDate === "next_3_months" ? [{
                                        label: "Next 3 Months",
                                        onRemove: () => handleLocalChange("renewalDate", "")
                                    }] : []}
                                >
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="renewal"
                                            checked={localFilters.renewalDate === "next_3_months"}
                                            onCheckedChange={(checked) => handleLocalChange("renewalDate", checked ? "next_3_months" : "")}
                                        />
                                        <label htmlFor="renewal" className="text-sm">Next 3 Months</label>
                                    </div>
                                </FilterItem>
                            )}
                        </div>
                    )}

                    {/* Plan Details Section */}
                    {hasVisibleItems(["Plan Types", "Self-Funded"]) && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-foreground px-1">Plan Details</h3>

                            {shouldShow("Plan Types") && (
                                <FilterItem
                                    label="Plan Types"
                                    isActive={localFilters.planTypes.length > 0}
                                    activeTags={localFilters.planTypes.map(type => ({
                                        label: type,
                                        onRemove: () => handleLocalChange("planTypes", localFilters.planTypes.filter(i => i !== type))
                                    }))}
                                >
                                    <div className="grid gap-2">
                                        {["Health", "Welfare", "Pension"].map((type) => (
                                            <div key={type} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={type}
                                                    checked={localFilters.planTypes.includes(type)}
                                                    onCheckedChange={(checked) => {
                                                        const current = localFilters.planTypes
                                                        const updated = checked
                                                            ? [...current, type]
                                                            : current.filter((i) => i !== type)
                                                        handleLocalChange("planTypes", updated)
                                                    }}
                                                />
                                                <label htmlFor={type} className="text-sm">{type}</label>
                                            </div>
                                        ))}
                                    </div>
                                </FilterItem>
                            )}

                            {shouldShow("Self-Funded") && (
                                <FilterItem
                                    label="Self-Funded"
                                    isActive={localFilters.selfFunded !== "all"}
                                    activeTags={localFilters.selfFunded !== "all" ? [{
                                        label: localFilters.selfFunded === "true" ? "Yes" : "No",
                                        onRemove: () => handleLocalChange("selfFunded", "all")
                                    }] : []}
                                >
                                    <div className="grid gap-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="sf-all"
                                                checked={localFilters.selfFunded === "all"}
                                                onCheckedChange={() => handleLocalChange("selfFunded", "all")}
                                            />
                                            <label htmlFor="sf-all" className="text-sm">All</label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="sf-yes"
                                                checked={localFilters.selfFunded === "true"}
                                                onCheckedChange={() => handleLocalChange("selfFunded", "true")}
                                            />
                                            <label htmlFor="sf-yes" className="text-sm">Yes</label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="sf-no"
                                                checked={localFilters.selfFunded === "false"}
                                                onCheckedChange={() => handleLocalChange("selfFunded", "false")}
                                            />
                                            <label htmlFor="sf-no" className="text-sm">No</label>
                                        </div>
                                    </div>
                                </FilterItem>
                            )}
                        </div>
                    )}

                    {/* Signals Section */}
                    {hasVisibleItems(["Retention Risk"]) && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-foreground px-1">Signals</h3>
                            {shouldShow("Retention Risk") && (
                                <FilterItem
                                    label="Retention Risk"
                                    isActive={localFilters.riskScore.length > 0}
                                    activeTags={localFilters.riskScore.map(lvl => ({
                                        label: lvl,
                                        onRemove: () => handleLocalChange("riskScore", localFilters.riskScore.filter(i => i !== lvl))
                                    }))}
                                >
                                    <div className="grid gap-2">
                                        {["High", "Medium", "Low"].map((lvl) => (
                                            <div key={lvl} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`risk-${lvl}`}
                                                    checked={localFilters.riskScore.includes(lvl)}
                                                    onCheckedChange={(checked) => {
                                                        const current = localFilters.riskScore
                                                        const updated = checked
                                                            ? [...current, lvl]
                                                            : current.filter((i) => i !== lvl)
                                                        handleLocalChange("riskScore", updated)
                                                    }}
                                                />
                                                <label htmlFor={`risk-${lvl}`} className="text-sm">{lvl}</label>
                                            </div>
                                        ))}
                                    </div>
                                </FilterItem>
                            )}
                        </div>
                    )}

                </div>
            </ScrollArea>
            <div className="p-4 border-t bg-background shrink-0">
                <Button
                    className="w-full font-semibold"
                    onClick={() => onApplyFilters(localFilters)}
                >
                    <Filter className="mr-2 h-4 w-4" />
                    Apply Filters
                </Button>
            </div>
        </div>
    )
}

interface FilterItemProps {
    label: string
    isActive: boolean
    activeTags: { label: string, onRemove: () => void }[]
    children: React.ReactNode
}

function FilterItem({ label, isActive, activeTags, children }: FilterItemProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className={cn(
                "rounded-md border bg-card transition-all hover:border-primary/50",
                isOpen ? "ring-1 ring-primary/20 border-primary/50" : "border-border/50"
            )}
        >
            <div className="flex flex-col">
                <div className="flex items-center justify-between p-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <span className="text-xs font-medium text-foreground/80">{label}</span>

                    {!isActive && !isOpen && (
                        <Plus className="h-3.5 w-3.5 text-muted-foreground/50" />
                    )}

                    {isOpen && (
                        <ChevronUp className="h-3.5 w-3.5 text-muted-foreground/50" />
                    )}
                </div>

                {isActive && !isOpen && (
                    <div className="px-2 pb-2 -mt-1 flex flex-wrap gap-1.5">
                        {activeTags.map((tag, index) => (
                            <div key={index} className="flex items-center gap-1 rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 border border-blue-100">
                                <span className="max-w-[150px] truncate">{tag.label}</span>
                                <button onClick={(e) => { e.stopPropagation(); tag.onRemove(); }} className="ml-0.5 hover:text-blue-900">
                                    <X className="h-2.5 w-2.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <CollapsibleContent className="px-2 pb-2">
                <div className="px-3 pb-3">
                    {children}
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}
