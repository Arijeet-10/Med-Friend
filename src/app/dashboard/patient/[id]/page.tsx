"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiDiagnosis } from "@/components/patient/ai-diagnosis";
import { AppLoader } from "@/components/app-loader";

interface Prescription {
  id: string;
  date: string;
  medication: string;
  dosage: string;
  status: string;
}

interface LabReport {
  id: string;
  date: string;
  test: string;
  status: string;
  imageUrl: string;
}

interface Patient {
  id: string;
  name: string;
  avatar: string;
  avatarFallback: string;
  email: string;
  height: string;
  bmi: number;
  age: number;
  gender: string;
  abhaId: string;
  lastVisit: string;
  blood_pressure: string;
  blood_group: string;
  diseaseTags: string[];
  prescriptions: Prescription[];
  labReports: LabReport[];
  summary: string;
}

export default function PatientProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/abha/patient-details?id=${params.id}`
        );
        if (!response.ok)
          throw new Error(`Failed to fetch: ${response.statusText}`);
        const result: Patient = await response.json();
        setPatient(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params.id]);

  if (loading) return <AppLoader />;
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  if (!patient)
    return (
      <div className="flex items-center justify-center h-screen">
        No patient data found.
      </div>
    );

  const { prescriptions, labReports } = patient;

  return (
    <div className="flex min-h-screen bg-[#F8FFFE]">
      {/* Sidebar */}

      {/* Main Section */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-teal-900">
            Patient Name: {patient.name}
          </h1>
          {/* <button className="text-teal-700 font-semibold">Log Out</button> */}
        </header>

        <section className="grid grid-cols-2 gap-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Height:</strong>
              {patient.height}
            </p>
            <p>
              <strong>Weight:</strong> 70 kg
            </p>
            <p>
              <strong>BMI:</strong>
              {patient.bmi}
            </p>
            <p>
              <strong>Age:</strong>
              {patient.age}
            </p>
            <p>
              <strong>Blood Pressure:</strong>
              {patient.blood_pressure}
            </p>
            <p>
              <strong>Blood Group:</strong>
              {patient.blood_group}
            </p>
          </div>
          <div className="flex justify-end">
            <Avatar className="h-32 w-32 border">
              <AvatarImage src={patient.avatar} alt={patient.name} />
              <AvatarFallback>{patient.avatarFallback}</AvatarFallback>
            </Avatar>
          </div>
        </section>

        <div className="mb-6">
          {patient?.diseaseTags?.map((tag: string, i: number) => (
            <Badge key={i} variant="outline" className="mr-2 mb-2 inline-block">
              {tag}
            </Badge>
          ))}
        </div>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Patient Summary</h2>
          <div className="border rounded-lg p-4 bg-[#F2FFFC] text-gray-700">
            <p>{patient.summary}</p>
          </div>
        </section>

        <Tabs defaultValue="prescriptions">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
              <TabsTrigger value="lab-reports">Lab Reports</TabsTrigger>
            </TabsList>
            <div className="ml-auto">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <Upload className="h-4 w-4" />
                Push to ABHA
              </Button>
            </div>
          </div>

          <TabsContent value="prescriptions" className="mt-4">
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
                        <TableCell>{p.id}</TableCell>
                        <TableCell>{p.date}</TableCell>
                        <TableCell>{p.medication}</TableCell>
                        <TableCell>{p.dosage}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              p.status === "Active" ? "secondary" : "outline"
                            }
                          >
                            {p.status}
                          </Badge>
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
                  {labReports.map((report) => (
                    <Card key={report.id}>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">
                          {report.test}
                        </CardTitle>
                        <CardDescription>
                          {report.date} - {report.status}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <Image
                          alt="Lab Report Thumbnail"
                          className="aspect-video w-full rounded-b-lg object-cover"
                          height={338}
                          src={report.imageUrl}
                          width={600}
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
        </Tabs>
      </main>
    </div>
  );
}
