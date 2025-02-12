import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Backend Api
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL || "http://localhost:5001",
  }), // base url
  reducerPath: "celverDashApi",
  // tags
  tagTypes: [
    "Dashboard",
    "Team",
    "Contacts",
    "Invoices",
    "Products",
    "Calendar",
    "BarChart",
    "PieChart",
    "LineChart",
    "GeographyChart",
  ],
  // endpoints
  endpoints: (build) => ({
    getDashboard: build.query({
      query: () => "dashboard",
      providesTags: ["Dashboard"],
    }),
    getTeamMembers: build.query({
      query: () => "team/members",
      providesTags: ["Team"],
    }),
    getContacts: build.query({
      query: () => "contacts",
      providesTags: ["Contacts"],
    }),
    getInvoices: build.query({
      query: () => "invoices",
      providesTags: ["Invoices"],
    }),
    getProducts: build.query({
      query: () => "products",
      providesTags: ["Products"],
    }),
    getCalendarEvents: build.query({
      query: () => "calendar/events",
      providesTags: ["Calendar"],
    }),
    getBarChartData: build.query({
      query: () => "charts/bar",
      providesTags: ["BarChart"],
    }),
    getPieChartData: build.query({
      query: () => "charts/pie",
      providesTags: ["PieChart"],
    }),
    getLineChartData: build.query({
      query: () => "charts/line",
      providesTags: ["LineChart"],
    }),
    getGeographyData: build.query({
      query: () => "charts/geography",
      providesTags: ["GeographyChart"],
    }),
  }),
});

// export api endpoints
export const {
  useGetDashboardQuery,
  useGetTeamMembersQuery,
  useGetContactsQuery,
  useGetInvoicesQuery,
  useGetProductsQuery,
  useGetCalendarEventsQuery,
  useGetBarChartDataQuery,
  useGetPieChartDataQuery,
  useGetLineChartDataQuery,
  useGetGeographyDataQuery,
} = api;
