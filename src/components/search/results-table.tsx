"use client"

import * as React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Star, Building2, Settings2, Linkedin, ChevronDown, Bookmark } from "lucide-react"
import { Company } from "./data"
import { cn } from "@/lib/utils"

interface ResultsTableProps {
    companies: Company[]
}

type ColumnDef = {
    id: string
    label: string
    width: number
    render: (company: Company) => React.ReactNode
    className?: string
}

export function ResultsTable({ companies }: ResultsTableProps) {
    // Define all toggleable columns
    const allColumns: ColumnDef[] = [
        // Identity
        { id: "ein", label: "EIN", width: 120, render: (c) => c.ein },
        { id: "phone", label: "Phone", width: 150, render: (c) => c.companyPhone },
        { id: "website", label: "Website", width: 180, render: (c) => <span className="text-blue-600 hover:underline cursor-pointer">{c.website}</span> },
        { id: "linkedin", label: "LI", width: 40, render: (c) => <a href={`https://${c.companyLinkedin}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800"><Linkedin className="h-3.5 w-3.5" /></a> },

        // Location
        { id: "hqLocation", label: "HQ Location", width: 150, render: (c) => c.hqLocation },
        { id: "address", label: "Address 1", width: 200, render: (c) => <span className="truncate max-w-[200px] block">{c.companyAddress1}</span> },
        { id: "city", label: "City", width: 150, render: (c) => c.companyCity },
        { id: "state", label: "State", width: 100, render: (c) => c.companyState },
        { id: "zip", label: "Zip", width: 100, render: (c) => c.companyZip },
        { id: "county", label: "County", width: 150, render: (c) => c.companyCounty },

        // Participants
        { id: "eligibleParticipants", label: "Eligible Parts.", width: 150, render: (c) => c.eligibleParticipants.toLocaleString() },
        { id: "totalParticipants", label: "Total Parts.", width: 150, render: (c) => c.participantsSummed.toLocaleString() },

        // Financials
        { id: "modeledRevenue", label: "Modeled Rev.", width: 150, render: (c) => c.modeledRevenue },
        { id: "reportedPremiums", label: "Reported Prem.", width: 150, render: (c) => c.reportedPremiums },
        { id: "modeledPremium", label: "Modeled Prem.", width: 150, render: (c) => c.modeledPremium },
        { id: "totalCommission", label: "Total Comm.", width: 150, render: (c) => c.totalCommission },
        { id: "totalFees", label: "Total Fees", width: 150, render: (c) => c.totalFees },
        { id: "reportedBrokerComp", label: "Rep. Broker Comp", width: 150, render: (c) => c.reportedBrokerComp },
        { id: "modeledBrokerComp", label: "Mod. Broker Comp", width: 150, render: (c) => c.modeledBrokerComp },

        // Carriers
        { id: "topCarrier", label: "Top Carrier", width: 180, render: (c) => c.topCarrier },
        { id: "topCarrierPercent", label: "Top Carrier %", width: 100, render: (c) => c.topCarrierPercent },
        { id: "timeWithTopCarrier", label: "Time w/ Carrier", width: 120, render: (c) => c.timeWithTopCarrier },
        { id: "primaryMedicalCarrier", label: "Primary Med. Carrier", width: 180, render: (c) => c.primaryMedicalCarrier },

        // Brokers
        { id: "topBroker", label: "Top Broker", width: 180, render: (c) => c.topBroker },
        { id: "topBrokerPercent", label: "Top Broker %", width: 100, render: (c) => c.topBrokerPercent },
        { id: "timeWithTopBroker", label: "Time w/ Broker", width: 120, render: (c) => c.timeWithTopBroker },
        { id: "secondBroker", label: "Second Broker", width: 180, render: (c) => c.secondBroker },
        { id: "thirdBroker", label: "Third Broker", width: 180, render: (c) => c.thirdBroker },

        // Ratings
        { id: "benefitRating", label: "Benefit Rating", width: 100, render: (c) => c.benefitRating },
        { id: "overallRating", label: "Overall Rating", width: 100, render: (c) => c.overallRating },
        {
            id: "retentionRisk", label: "Retention Risk", width: 120, render: (c) => (
                <Badge variant="outline" className={cn(
                    "font-normal text-[10px] px-1.5 py-0 h-5 border",
                    c.retentionRisk === "Low" ? "bg-green-50 text-green-700 border-green-200" :
                        c.retentionRisk === "Medium" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                            "bg-red-50 text-red-700 border-red-200"
                )}>
                    {c.retentionRisk}
                </Badge>
            )
        },

        // Other
        { id: "renewalDate", label: "Renewal Date", width: 120, render: (c) => new Date(c.renewalDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) },
        { id: "jobChange", label: "Job Change", width: 120, render: (c) => c.recentJobChange ? <Badge variant="secondary" className="text-[10px] h-5">Yes</Badge> : <span className="text-muted-foreground">-</span> },

        // Plan Details
        {
            id: "planAttributes", label: "Plan Attributes", width: 200, render: (c) => (
                <div className="flex gap-1 overflow-hidden">
                    {c.planAttributes.slice(0, 2).map(attr => (
                        <Badge key={attr} variant="secondary" className="font-normal text-[10px] px-1 py-0 h-4 whitespace-nowrap">
                            {attr}
                        </Badge>
                    ))}
                    {c.planAttributes.length > 2 && (
                        <span className="text-[10px] text-muted-foreground">+{c.planAttributes.length - 2}</span>
                    )}
                </div>
            )
        },
        { id: "fidelityBond", label: "Fidelity Bond", width: 120, render: (c) => c.fidelityBond },
        { id: "signer5500", label: "5500 Signer", width: 150, render: (c) => c.signer5500 },
        { id: "filingStatus", label: "Filing Status", width: 120, render: (c) => c.filingStatus },
        {
            id: "planTypes", label: "Plan Types", width: 150, render: (c) => (
                <div className="flex gap-1 overflow-hidden">
                    {c.planTypes.slice(0, 2).map(type => (
                        <Badge key={type} variant="secondary" className="font-normal text-[10px] px-1 py-0 h-4 whitespace-nowrap">
                            {type}
                        </Badge>
                    ))}
                </div>
            )
        },
        { id: "selfFunded", label: "Self-Funded", width: 100, render: (c) => c.selfFunded ? <Badge variant="outline" className="text-[10px] h-5 border-blue-200 bg-blue-50 text-blue-700">Self-Funded</Badge> : <span className="text-muted-foreground">Fully Insured</span> },
        { id: "accountingFirm", label: "Accounting Firm", width: 150, render: (c) => c.accountingFirm },
        { id: "keyContacts", label: "Key Contacts", width: 200, render: (c) => <span className="truncate max-w-[200px] block">{c.keyContacts.join(", ")}</span> },
        { id: "filingIssue", label: "Filing Issue", width: 150, render: (c) => c.filingIssue },
        { id: "filingType", label: "Filing Type", width: 150, render: (c) => c.filingType },

        // Industry
        { id: "industryCode", label: "Ind. Code", width: 100, render: (c) => c.industryCode },
        { id: "industryName", label: "Industry Name", width: 200, render: (c) => <span className="truncate max-w-[200px] block">{c.industryName}</span> },
        { id: "industrySegment", label: "Ind. Segment", width: 150, render: (c) => c.industrySegment },
    ]

    // Initial visible columns (all except a few maybe? No, let's default to all)
    const [visibleColumns, setVisibleColumns] = React.useState<Set<string>>(new Set(allColumns.map(c => c.id)))

    const toggleColumn = (id: string) => {
        const newVisible = new Set(visibleColumns)
        if (newVisible.has(id)) {
            newVisible.delete(id)
        } else {
            newVisible.add(id)
        }
        setVisibleColumns(newVisible)
    }

    return (
        <div className="flex-1 h-full flex flex-col overflow-hidden bg-background">
            {/* Fixed Header Section */}
            {/* Fixed Header Section */}
            <div className="border-b px-6 py-3 flex items-center justify-between bg-background shrink-0 h-16">
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="h-9 gap-2 text-muted-foreground font-normal">
                        Saved Searches
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                    <div className="bg-muted/50 text-muted-foreground text-sm px-3 py-1.5 rounded-md font-medium">
                        {companies.length.toLocaleString()} results found
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-9 gap-2">
                        <Bookmark className="h-4 w-4" />
                        Save View
                    </Button>
                    <Button variant="outline" className="h-9 gap-2">
                        Actions
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>

                    <div className="h-6 w-px bg-border mx-2" /> {/* Separator Line */}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                                <Settings2 className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px] max-h-[400px] overflow-y-auto">
                            <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {allColumns.map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={visibleColumns.has(column.id)}
                                    onCheckedChange={() => toggleColumn(column.id)}
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    {column.label}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Scrollable Table Section */}
            <div className="flex-1 overflow-auto">
                <div className="min-w-max"> {/* Changed from fixed 4000px to min-w-max to adapt to content */}
                    <Table>
                        <TableHeader className="bg-muted/30 sticky top-0 z-10 shadow-sm">
                            <TableRow className="hover:bg-transparent border-b border-border/40">
                                <TableHead className="w-[40px] pl-4 h-9 bg-muted/30 sticky left-0 z-20">
                                    <Checkbox />
                                </TableHead>
                                <TableHead className="w-[280px] text-xs font-medium text-muted-foreground h-9 bg-muted/30 border-r border-border/40 sticky left-[40px] z-20">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="h-3.5 w-3.5" />
                                        Company Name
                                    </div>
                                </TableHead>

                                {allColumns.map((column) => (
                                    visibleColumns.has(column.id) && (
                                        <TableHead
                                            key={column.id}
                                            className="text-xs font-medium text-muted-foreground h-9 bg-muted/30 border-r border-border/40"
                                            style={{ width: column.width }}
                                        >
                                            {column.label}
                                        </TableHead>
                                    )
                                ))}

                                <TableHead className="w-[100px] text-right pr-4 text-xs font-medium text-muted-foreground h-9 bg-muted/30 sticky right-0 z-20 bg-background/95 backdrop-blur-sm border-l border-border/40">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {companies.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={visibleColumns.size + 3} className="h-24 text-center text-muted-foreground">
                                        No results found. Try adjusting your filters.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                companies.map((company) => (
                                    <TableRow key={company.id} className="group hover:bg-muted/50 border-b border-border/40 h-10">
                                        <TableCell className="pl-4 py-1 sticky left-0 bg-background group-hover:bg-muted/50 z-10">
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell className="py-1 border-r border-border/40 sticky left-[40px] bg-background group-hover:bg-muted/50 z-10">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-5 w-5 rounded-sm border">
                                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${company.companyName}`} alt={company.companyName} />
                                                    <AvatarFallback className="rounded-sm text-[10px]">{company.companyName.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm font-medium truncate max-w-[200px]">{company.companyName}</span>
                                            </div>
                                        </TableCell>

                                        {allColumns.map((column) => (
                                            visibleColumns.has(column.id) && (
                                                <TableCell key={column.id} className="py-1 border-r border-border/40 text-xs">
                                                    {column.render(company)}
                                                </TableCell>
                                            )
                                        ))}

                                        <TableCell className="text-right pr-4 py-1 sticky right-0 bg-background group-hover:bg-muted/50 z-10 border-l border-border/40">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary">
                                                    <Star className="h-3 w-3" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary">
                                                    <MoreHorizontal className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
