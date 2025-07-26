import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const sidebarNavItems = [
  "Patient Profile",
  "Lab Reports",
  "Prescriptions",
  "Medical History",
  "Insurance Details",
  "Emergency",
  "Priority Score",
  "Credit Point History",
  "Institution Records",
]

export default function Dashboard() {
  return (
    <div className="grid w-full grid-cols-[280px_1fr]">
      <aside className="flex flex-col gap-6 border-r bg-accent p-4">
        <Button variant="outline" className="w-full bg-card hover:bg-card/90">Change Patient</Button>
        <div className="text-sm text-center text-muted-foreground">
          Current Patient ID : XXXXXX
        </div>
        <nav className="flex flex-col gap-2">
          {sidebarNavItems.map((item, index) => (
            <Button key={index} variant={index === 0 ? "secondary" : "ghost"} className="justify-start">
              {index + 1}. {item}
            </Button>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col gap-4 p-6 lg:gap-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-8">
            <div className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-primary">Patient Name : Jhon Doe</h1>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <p><span className="font-semibold">Height :</span> 5' 10".</p>
                    <p><span className="font-semibold">Weight :</span> 70 kg.</p>
                    <p><span className="font-semibold">Blood Group :</span> B+.</p>
                    <p><span className="font-semibold">Blood Pressure :</span> 70/120.</p>
                    <p><span className="font-semibold">BMI :</span> 00.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Diabetic</Badge>
                    <Badge variant="outline">Tag 2</Badge>
                    <Badge variant="outline">Tag 3</Badge>
                    <Badge variant="outline">Tag 4</Badge>
                    <Badge variant="outline">Tag 5</Badge>
                    <Badge variant="outline">Tag 6</Badge>
                    <Badge variant="outline">Tag 7</Badge>
                    <Badge variant="outline">Tag 8</Badge>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Patient Summary</h2>
                    <div className="mt-2 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center gap-6">
                <div className="flex h-40 w-40 items-center justify-center rounded-full bg-accent">
                    <span className="text-muted-foreground -rotate-12">Photo of User</span>
                </div>
                <Badge className="h-auto px-4 py-2 text-base font-semibold" variant="secondary">Honour Points : 95</Badge>
                <div className="flex flex-col items-center gap-4">
                     <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-primary bg-accent">
                        <span className="text-4xl font-bold text-primary">34</span>
                    </div>
                    <Button variant="outline" className="w-full">Check Priority Score</Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
