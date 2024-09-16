'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, Check } from "lucide-react"

const steps = [
  { title: "Personal Information", description: "Let's start with your basic details" },
  { title: "Competitive Programming Profiles", description: "Connect your CP platform accounts" },
  { title: "Preferences", description: "Customize your GECA-CPStars experience" },
  { title: "Review & Confirm", description: "Almost there! Review your information" }
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    codeforces: '',
    leetcode: '',
    codechef: '',
    preferredLanguage: '',
    notifications: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, preferredLanguage: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, notifications: checked }))
  }

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here typically send the formData to backend
    console.log('Form submitted:', formData)
    // For demo purposes, we'll just move to a "success" step
    setCurrentStep(steps.length)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input id="studentId" name="studentId" value={formData.studentId} onChange={handleInputChange} placeholder="e.g., 2023CS001" required />
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="codeforces">Codeforces Username</Label>
              <Input id="codeforces" name="codeforces" value={formData.codeforces} onChange={handleInputChange} placeholder="codeforces_username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="leetcode">LeetCode Username</Label>
              <Input id="leetcode" name="leetcode" value={formData.leetcode} onChange={handleInputChange} placeholder="leetcode_username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codechef">CodeChef Username</Label>
              <Input id="codechef" name="codechef" value={formData.codechef} onChange={handleInputChange} placeholder="codechef_username" />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Preferred Programming Language</Label>
              <RadioGroup value={formData.preferredLanguage} onValueChange={handleRadioChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cpp" id="cpp" />
                  <Label htmlFor="cpp">C++</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="java" id="java" />
                  <Label htmlFor="java">Java</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="python" id="python" />
                  <Label htmlFor="python">Python</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="notifications" checked={formData.notifications} onCheckedChange={handleCheckboxChange} />
              <Label htmlFor="notifications">Receive email notifications about contests and updates</Label>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Your Information</h3>
            <div className="space-y-2">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Student ID:</strong> {formData.studentId}</p>
              <p><strong>Codeforces:</strong> {formData.codeforces || 'Not provided'}</p>
              <p><strong>LeetCode:</strong> {formData.leetcode || 'Not provided'}</p>
              <p><strong>CodeChef:</strong> {formData.codechef || 'Not provided'}</p>
              <p><strong>Preferred Language:</strong> {formData.preferredLanguage || 'Not selected'}</p>
              <p><strong>Notifications:</strong> {formData.notifications ? 'Enabled' : 'Disabled'}</p>
            </div>
          </div>
        )
      default:
        return (
          <div className="text-center space-y-4">
            <Check className="w-16 h-16 text-green-500 mx-auto" />
            <h3 className="text-2xl font-bold">Welcome to GECA-CPStars!</h3>
            <p>Your account has been created successfully. You can now start exploring the leaderboard and tracking your progress.</p>
            <Button>Go to Dashboard</Button>
          </div>
        )
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Join GECA-CPStars Leaderboard</h1>
      {currentStep < steps.length && (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{steps[currentStep].title}</h2>
            <p className="text-muted-foreground">{steps[currentStep].description}</p>
          </div>
          <Progress value={(currentStep + 1) / steps.length * 100} className="mb-8" />
        </>
      )}
      <form onSubmit={handleSubmit}>
        {renderStep()}
        <div className="mt-8 flex justify-between">
          {currentStep > 0 && currentStep < steps.length && (
            <Button type="button" variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button type="button" onClick={handleNext} className="ml-auto">
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="submit" className="ml-auto">
              Submit <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
