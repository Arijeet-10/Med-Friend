import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarPlus } from "lucide-react";

const upcomingAppointments = [
  {
    patient: "Anjali Sharma",
    abhaId: "12-3456-7890-1234",
    date: "2024-08-05",
    time: "10:00 AM",
    reason: "Follow-up Checkup",
  },
  {
    patient: "Vikram Kumar",
    abhaId: "98-7654-3210-9876",
    date: "2024-08-05",
    time: "11:30 AM",
    reason: "New Consultation",
  },
  {
    patient: "Sunita Reddy",
    abhaId: "56-7890-1234-5678",
    date: "2024-08-06",
    time: "02:00 PM",
    reason: "Lab Report Review",
  },
];

const pastAppointments = [
    {
      patient: "Rohan Singh",
      abhaId: "34-5678-9012-3456",
      date: "2024-07-28",
      time: "09:00 AM",
      reason: "Viral Fever",
    },
    {
        patient: "Priya Verma",
        abhaId: "87-6543-2109-8765",
        date: "2024-07-25",
        time: "03:30 PM",
        reason: "Annual Physical",
    },
]

export default function AppointmentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Appointments</h1>
        <Button>
          <CalendarPlus className="mr-2 h-4 w-4" />
          Schedule New
        </Button>
      </div>
      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">History</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>
                A list of your scheduled appointments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>ABHA ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingAppointments.map((appt) => (
                    <TableRow key={appt.abhaId}>
                      <TableCell className="font-medium">{appt.patient}</TableCell>
                      <TableCell>{appt.abhaId}</TableCell>
                      <TableCell>{appt.date}</TableCell>
                      <TableCell>{appt.time}</TableCell>
                      <TableCell>{appt.reason}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="past">
        <Card>
            <CardHeader>
              <CardTitle>Appointment History</CardTitle>
              <CardDescription>
                A list of your past appointments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>ABHA ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastAppointments.map((appt) => (
                    <TableRow key={appt.abhaId}>
                      <TableCell className="font-medium">{appt.patient}</TableCell>
                      <TableCell>{appt.abhaId}</TableCell>
                      <TableCell>{appt.date}</TableCell>
                      <TableCell>{appt.time}</TableCell>
                      <TableCell>{appt.reason}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View Notes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
