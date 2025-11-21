"use client"

import React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconList,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavMain } from "../components/nav-main"
import { NavUser } from "../components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"



export function AppSidebar({
  ...props
}) {
  const { data: session } = useSession()
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconDashboard,
      },

      {
        title: "Inventory",
        url: "/dashboard/inventory",
        icon: IconListDetails,
      },
      {
        title: "Category",
        url: "/dashboard/category",
        icon: IconList,
      },
    // {
    //   title: "Analytics",
    //   url: "#",
    //   icon: IconChartBar,
    // },
    
      ...(session?.user?.role === 'admin' ? [
        {
          title: "Users",
          url: "/dashboard/users",
          icon: IconUsers,
        }
      ]
        : [])
        ,
      {
        title: "Settings",
        url: "#",
        icon: IconSettings,
      },
    ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: IconSettings,
      },
      {
        title: "Get Help",
        url: "#",
        icon: IconHelp,
      },
      {
        title: "Search",
        url: "#",
        icon: IconSearch,
      },
    ],
      documents: [
        {
          name: "Data Library",
          url: "#",
          icon: IconDatabase,
        },
        {
          name: "Reports",
          url: "#",
          icon: IconReport,
        },
        {
          name: "Word Assistant",
          url: "#",
          icon: IconFileWord,
        },
      ],
  }
return (
  <Sidebar collapsible="offcanvas" {...props}>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
            <a href="/dashboard">
              <IconInnerShadowTop className="!size-5" />
              <span className="text-base font-semibold">Inventory App</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavMain items={data.navMain} />
      {/* <NavDocuments items={data.documents} /> */}
      {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
    </SidebarContent>
    <SidebarFooter>
      <NavUser user={data.user} />
    </SidebarFooter>
  </Sidebar>
);
}
