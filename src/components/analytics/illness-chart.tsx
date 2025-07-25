"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { illness: "Common Cold", cases: 186 },
  { illness: "Hypertension", cases: 124 },
  { illness: "Diabetes", cases: 98 },
  { illness: "Viral Fever", cases: 87 },
  { illness: "Migraine", cases: 75 },
  { illness: "Allergies", cases: 60 },
]

const chartConfig = {
  cases: {
    label: "Cases",
    color: "hsl(var(--chart-1))",
  },
}

export function IllnessChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Common Illnesses</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{left: 10,}}>
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="illness"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              width={100}
              className="text-sm"
            />
            <XAxis dataKey="cases" type="number" hide />
            <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Bar dataKey="cases" fill="var(--color-cases)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
