"use client"

import * as React from "react"
import { FilterSidebar } from "@/components/search/filter-sidebar"
import { ResultsTable } from "@/components/search/results-table"
import { SearchHeader } from "@/components/search/search-header"
import { mockCompanies } from "@/components/search/data"

export interface FilterState {
  searchQuery: string
  industry: string[]
  size: string[]
  location: string
  revenueRange: number[]
  renewalDate: string
  carriers: string[]
  funding: string[]
  intent: string[]
  riskScore: string[]
  technologies: string[]
  topBroker: string[]
  planTypes: string[]
  selfFunded: string
  state: string[]
  county: string
}

export default function SearchPage() {
  const [filters, setFilters] = React.useState<FilterState>({
    searchQuery: "",
    industry: [],
    size: [],
    location: "",
    revenueRange: [0, 100],
    renewalDate: "",
    carriers: [],
    funding: [],
    intent: [],
    riskScore: [],
    technologies: [],
    topBroker: [],
    planTypes: [],
    selfFunded: "all",
    state: [],
    county: ""
  })

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({
      searchQuery: "",
      industry: [],
      size: [],
      location: "",
      revenueRange: [0, 100],
      renewalDate: "",
      carriers: [],
      funding: [],
      intent: [],
      riskScore: [],
      technologies: [],
      topBroker: [],
      planTypes: [],
      selfFunded: "all",
      state: [],
      county: ""
    })
  }

  const filteredCompanies = React.useMemo(() => {
    return mockCompanies.filter((company) => {
      // Search Query
      if (
        filters.searchQuery &&
        !company.companyName.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false
      }

      // Industry
      if (filters.industry.length > 0 && !filters.industry.includes(company.industrySegment)) {
        return false
      }

      // Size (Eligible Participants)
      if (filters.size.length > 0) {
        const size = company.eligibleParticipants
        const matchesSize = filters.size.some((s) => {
          if (s === "small") return size <= 50
          if (s === "medium") return size > 50 && size <= 500
          if (s === "large") return size > 500
          return false
        })
        if (!matchesSize) return false
      }

      // Location (City/State string match)
      if (
        filters.location &&
        !`${company.companyCity}, ${company.companyState}`
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      ) {
        return false
      }

      // State Filter
      if (filters.state.length > 0 && !filters.state.includes(company.companyState)) {
        return false
      }

      // County Filter
      if (filters.county && !company.companyCounty.toLowerCase().includes(filters.county.toLowerCase())) {
        return false
      }

      // Renewal Date (Mock logic for "next 3 months")
      if (filters.renewalDate === "next_3_months") {
        const today = new Date()
        const renewal = new Date(company.renewalDate)
        const diffTime = renewal.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        if (diffDays < 0 || diffDays > 90) return false
      }

      // Carriers (Top Carrier or Primary Medical)
      if (filters.carriers.length > 0) {
        const hasCarrier = filters.carriers.some(c =>
          company.topCarrier === c || company.primaryMedicalCarrier === c
        )
        if (!hasCarrier) return false
      }

      // Funding (Not in new schema explicitly as "funding" field, but maybe we can map it or remove it? 
      // The user didn't ask for "Funding" in the new list, but I left it in the interface. 
      // I'll remove the logic if it's not in the data, or map it to something else.
      // Actually, I removed `funding` from `Company` type in `data.ts`. 
      // So I should remove this filter logic or comment it out.)
      // if (filters.funding.length > 0 && !filters.funding.includes(company.funding)) {
      //   return false
      // }

      // Intent (Not in new schema explicitly? User list didn't have "Intent". 
      // Wait, the user list had "Retention Risk" but not "Intent". 
      // I'll assume "Intent" is removed or mapped to "Retention Risk"?)
      // I'll comment out Intent for now as it's not in the new `Company` type I defined.

      // Risk Score -> Retention Risk
      if (filters.riskScore.length > 0 && !filters.riskScore.includes(company.retentionRisk)) {
        return false
      }

      // Technologies (Not in new schema? User list didn't have "Technologies". 
      // I'll comment it out.)

      // Top Broker
      if (filters.topBroker.length > 0 && !filters.topBroker.includes(company.topBroker)) {
        return false
      }

      // Plan Types
      if (filters.planTypes.length > 0) {
        const hasPlan = filters.planTypes.some(p => company.planTypes.includes(p))
        if (!hasPlan) return false
      }

      // Self Funded
      if (filters.selfFunded !== "all") {
        const isSelfFunded = filters.selfFunded === "true"
        if (company.selfFunded !== isSelfFunded) return false
      }

      return true
    })
  }, [filters])

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-background">
      <SearchHeader />
      <div className="flex flex-1 overflow-hidden">
        <FilterSidebar
          filters={filters}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
        <ResultsTable companies={filteredCompanies} />
      </div>
    </div>
  )
}
