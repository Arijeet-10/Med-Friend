import Image from "next/image"
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Upload,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AiDiagnosis } from "@/components/patient/ai-diagnosis"

// Mock data
const patient = {
  id: "1",
  name: "Anjali Sharma",
  avatar: "https://placehold.co/100x100.png",
  avatarFallback: "AS",
  email: "anjali.sharma@example.com",
  age: 34,
  gender: "Female",
  abhaId: "12-3456-7890-1234",
  lastVisit: "2024-07-29",
}

const prescriptions = [
  { id: "RX728", date: "2024-07-29", medication: "Azithromycin 500mg", dosage: "1 tablet daily for 5 days", status: "Active" },
  { id: "RX721", date: "2024-06-15", medication: "Metformin 500mg", dosage: "1 tablet twice daily", status: "Active" },
  { id: "RX698", date: "2024-02-10", medication: "Amlodipine 5mg", dosage: "1 tablet daily", status: "Inactive" },
]

const labReports = [
    { id: "LAB301", date: "2024-07-20", test: "Complete Blood Count (CBC)", status: "Completed", imageUrl: "https://placehold.co/600x400.png" },
    { id: "LAB295", date: "2024-06-15", test: "Lipid Profile", status: "Completed", imageUrl: "https://placehold.co/600x400.png" },
]

export default function PatientProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border">
              <AvatarImage src={patient.avatar} alt={patient.name} data-ai-hint="person" />
              <AvatarFallback>{patient.avatarFallback}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{patient.name}</CardTitle>
              <CardDescription>ABHA ID: {patient.abhaId}</CardDescription>
              <div className="text-sm text-muted-foreground">
                <span>{patient.age} / {patient.gender}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <Button variant="outline">Request Consent</Button>
            <Button>Start Consultation</Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="add-entry">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="add-entry">Add New Entry</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="lab-reports">Lab Reports</TabsTrigger>
            <TabsTrigger value="visit-history">Visit History</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <Upload className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Push to ABHA
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="add-entry" className="mt-4">
          <AiDiagnosis />
        </TabsContent>
        <TabsContent value="prescriptions">
          <Card>
            <CardHeader>
              <CardTitle>Prescriptions</CardTitle>
              <CardDescription>
                Manage and view patient prescriptions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptions.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.id}</TableCell>
                      <TableCell>{p.date}</TableCell>
                      <TableCell>{p.medication}</TableCell>
                      <TableCell>{p.dosage}</TableCell>
                      <TableCell>
                        <Badge variant={p.status === "Active" ? "secondary" : "outline"}>{p.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="lab-reports">
          <Card>
          <CardHeader>
              <CardTitle>Lab Reports</CardTitle>
              <CardDescription>
                View and manage patient lab reports.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {labReports.map(report => (
                        <Card key={report.id}>
                            <CardHeader className="p-4">
                               <CardTitle className="text-base">{report.test}</CardTitle>
                               <CardDescription>{report.date} - {report.status}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Image
                                    alt="Lab Report Thumbnail"
                                    className="aspect-video w-full rounded-b-lg object-cover"
                                    height="338"
                                    src={report.imageUrl}
                                    width="600"
                                    data-ai-hint="medical document"
                                />
                            </CardContent>
                            <CardFooter className="p-4 flex justify-end">
                                <Button size="sm">View Report</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="visit-history">
            <Card>
                <CardHeader>
                    <CardTitle>Visit History</CardTitle>
                     <CardDescription>
                        A log of all past patient visits.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Visit history will be displayed here.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
