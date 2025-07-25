import { IllnessChart } from "@/components/analytics/illness-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, Users, CalendarCheck, TestTube2 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
        <h1 className="text-lg font-semibold md:text-2xl">Analytics</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,254</div>
                    <p className="text-xs text-muted-foreground">+82 this month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Appointments Completed</CardTitle>
                    <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">832</div>
                    <p className="text-xs text-muted-foreground">+120 this month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Lab Reports Uploaded</CardTitle>
                    <TestTube2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">971</div>
                    <p className="text-xs text-muted-foreground">+201 this month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">ABHA Records Pushed</CardTitle>
                    <FileUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">2,435</div>
                    <p className="text-xs text-muted-foreground">+530 this month</p>
                </CardContent>
            </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
            <div className="lg:col-span-4">
                <IllnessChart />
            </div>
            <div className="lg:col-span-3">
                 <Card>
                    <CardHeader>
                        <CardTitle>Demographics</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-sm text-muted-foreground">Patient demographics will be displayed here.</p>
                       {/* Placeholder for demographics chart */}
                       <div className="h-[300px] w-full flex items-center justify-center bg-muted rounded-md mt-4">
                         <p>Demographics Chart Coming Soon</p>
                       </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  )
}
