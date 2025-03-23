"use client"

import { useSearchParams } from "next/navigation"
import { Grid2X2, List, LayoutGrid, Calendar, Settings, Users } from "lucide-react"
import { SegmentedControl } from "@/components/segmented-control"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const viewOptions = [
    { label: "Grid", value: "grid", icon: <Grid2X2 className="h-4 w-4" /> },
    { label: "List", value: "list", icon: <List className="h-4 w-4" /> },
    { label: "Gallery", value: "gallery", icon: <LayoutGrid className="h-4 w-4" /> },
  ]

  const tabOptions = [
    { label: "General", value: "general" },
    { label: "Account", value: "account" },
    { label: "Appearance", value: "appearance" },
    { label: "Advanced", value: "advanced" },
  ]

  const sectionOptions = [
    { label: "Dashboard", value: "dashboard", icon: <LayoutGrid className="h-4 w-4" /> },
    { label: "Calendar", value: "calendar", icon: <Calendar className="h-4 w-4" /> },
    { label: "Settings", value: "settings", icon: <Settings className="h-4 w-4" /> },
    { label: "Team", value: "team", icon: <Users className="h-4 w-4" /> },
  ]

  return (
    <main className="container mx-auto p-6 space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">macOS-like Segmented Controls</h1>
        <p className="text-muted-foreground">
          A demonstration of segmented controls that save state in URL search parameters
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>View Options</CardTitle>
            <CardDescription>Select a view mode for your content</CardDescription>
          </CardHeader>
          <CardContent>
            <SegmentedControl name="view" options={viewOptions} defaultValue="grid" />
            <ViewContent />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings Tabs</CardTitle>
            <CardDescription>Navigate between different settings sections</CardDescription>
          </CardHeader>
          <CardContent>
            <SegmentedControl name="tab" options={tabOptions} defaultValue="general" />
            <TabContent />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Main Navigation</CardTitle>
            <CardDescription>Primary navigation with icons</CardDescription>
          </CardHeader>
          <CardContent>
            <SegmentedControl
              name="section"
              options={sectionOptions}
              defaultValue="dashboard"
              className="max-w-xl mx-auto"
            />
            <SectionContent />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

function ViewContent() {
  const searchParams = useSearchParams()
  const view = searchParams.get("view") || "grid"

  return (
    <div className="mt-6 rounded-lg border p-4">
      <div role="tabpanel" id={`panel-${view}`} className="min-h-[200px]">
        {view === "grid" && (
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-md bg-muted flex items-center justify-center">
                Item {i + 1}
              </div>
            ))}
          </div>
        )}
        {view === "list" && (
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-md bg-muted p-3 flex items-center">
                Item {i + 1}
              </div>
            ))}
          </div>
        )}
        {view === "gallery" && (
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-video rounded-md bg-muted flex items-center justify-center">
                Item {i + 1}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function TabContent() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || "general"

  return (
    <div className="mt-6 rounded-lg border p-4">
      <div role="tabpanel" id={`panel-${tab}`} className="min-h-[200px]">
        {tab === "general" && (
          <div className="space-y-4">
            <h3 className="font-medium">General Settings</h3>
            <p className="text-muted-foreground">Configure general application settings and preferences.</p>
          </div>
        )}
        {tab === "account" && (
          <div className="space-y-4">
            <h3 className="font-medium">Account Settings</h3>
            <p className="text-muted-foreground">Manage your account details, profile, and security options.</p>
          </div>
        )}
        {tab === "appearance" && (
          <div className="space-y-4">
            <h3 className="font-medium">Appearance Settings</h3>
            <p className="text-muted-foreground">Customize the look and feel of the application interface.</p>
          </div>
        )}
        {tab === "advanced" && (
          <div className="space-y-4">
            <h3 className="font-medium">Advanced Settings</h3>
            <p className="text-muted-foreground">Configure advanced options for power users.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function SectionContent() {
  const searchParams = useSearchParams()
  const section = searchParams.get("section") || "dashboard"

  return (
    <div className="mt-6 rounded-lg border p-4">
      <div role="tabpanel" id={`panel-${section}`} className="min-h-[200px]">
        {section === "dashboard" && (
          <div className="space-y-4">
            <h3 className="font-medium">Dashboard</h3>
            <p className="text-muted-foreground">View your personalized dashboard with key metrics and information.</p>
          </div>
        )}
        {section === "calendar" && (
          <div className="space-y-4">
            <h3 className="font-medium">Calendar</h3>
            <p className="text-muted-foreground">Manage your schedule, events, and appointments.</p>
          </div>
        )}
        {section === "settings" && (
          <div className="space-y-4">
            <h3 className="font-medium">Settings</h3>
            <p className="text-muted-foreground">Configure application settings and preferences.</p>
          </div>
        )}
        {section === "team" && (
          <div className="space-y-4">
            <h3 className="font-medium">Team</h3>
            <p className="text-muted-foreground">Manage your team members and collaboration settings.</p>
          </div>
        )}
      </div>
    </div>
  )
}

