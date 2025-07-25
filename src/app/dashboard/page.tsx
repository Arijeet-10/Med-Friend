import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
  Stethoscope,
  HeartPulse,
  FileText,
  UserCheck
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Dashboard() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div
        className="flex flex-1 rounded-lg"
      >
        <div className="flex flex-col gap-4 w-full">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Patients Today
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">
                    +5 from yesterday
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Upcoming Appointments
                  </CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    +3 scheduled today
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Records Uploaded</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">57</div>
                  <p className="text-xs text-muted-foreground">
                    +10 in the last hour
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Consultations</CardTitle>
                  <HeartPulse className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    Live video calls
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              <Card className="xl:col-span-2">
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Recent Patients</CardTitle>
                    <CardDescription>
                      Patients seen in the last 24 hours.
                    </CardDescription>
                  </div>
                  <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="#">
                      View All
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead className="hidden xl:table-column">
                          Type
                        </TableHead>
                        <TableHead className="hidden xl:table-column">
                          Status
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Last Visit
                        </TableHead>
                        <TableHead className="text-right">Diagnosis</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                              <AvatarImage src="https://placehold.co/100x100.png" alt="Avatar" data-ai-hint="person" />
                              <AvatarFallback>AR</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                              <Link href="/dashboard/patient/1" className="font-medium hover:underline">
                                Anjali Sharma
                              </Link>
                              <div className="text-sm text-muted-foreground">
                                anjali.sharma@example.com
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          Follow-up
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="outline">
                            Stable
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2024-07-29
                        </TableCell>
                        <TableCell className="text-right">Common Cold</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                              <AvatarImage src="https://placehold.co/100x100.png" alt="Avatar" data-ai-hint="person" />
                              <AvatarFallback>VK</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                              <Link href="/dashboard/patient/2" className="font-medium hover:underline">
                                Vikram Kumar
                              </Link>
                              <div className="text-sm text-muted-foreground">
                                vikram.k@example.com
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          New Patient
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="secondary">
                            Under Observation
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                         2024-07-29
                        </TableCell>
                        <TableCell className="text-right">Hypertension</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                              <AvatarImage src="https://placehold.co/100x100.png" alt="Avatar" data-ai-hint="person" />
                              <AvatarFallback>RS</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                              <Link href="/dashboard/patient/3" className="font-medium hover:underline">
                                Rohan Singh
                              </Link>
                              <div className="text-sm text-muted-foreground">
                                rohan.s@example.com
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          Follow-up
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="outline">
                            Recovered
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2024-07-28
                        </TableCell>
                        <TableCell className="text-right">Viral Fever</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Consent Requests</CardTitle>
                  <CardDescription>
                    Manage pending patient consent requests for data access.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-8">
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="https://placehold.co/100x100.png" alt="Avatar" data-ai-hint="person" />
                      <AvatarFallback>PV</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">Priya Verma</p>
                      <p className="text-sm text-muted-foreground">ABHA: 12-3456-7890-1234</p>
                    </div>
                    <div className="ml-auto flex gap-2">
                       <Button size="sm" variant="outline">Decline</Button>
                       <Button size="sm">Approve</Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="https://placehold.co/100x100.png" alt="Avatar" data-ai-hint="person" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">Sameer Mehta</p>
                      <p className="text-sm text-muted-foreground">ABHA: 98-7654-3210-9876</p>
                    </div>
                    <div className="ml-auto flex gap-2">
                       <Button size="sm" variant="outline">Decline</Button>
                       <Button size="sm">Approve</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
      </div>
    </>
  )
}
