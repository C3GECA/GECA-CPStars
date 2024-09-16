'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Code, Trophy, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Mock data for the student profile
const studentData = {
  name: "Alice Johnson",
  email: "alice.johnson@geca.ac.in",
  studentId: "2023CS001",
  avatar: "/placeholder.svg?height=100&width=100",
  overallRank: 3,
  totalScore: 5850,
  platforms: {
    codeforces: { username: "alice_cf", rating: 1800, solved: 450 },
    leetcode: { username: "alice_lc", rating: 2100, solved: 520 },
    codechef: { username: "alice_cc", rating: 1950, solved: 380 },
  },
  recentSubmissions: [
    { platform: "Codeforces", problem: "Watermelon", result: "Accepted", date: "2023-06-15" },
    { platform: "LeetCode", problem: "Two Sum", result: "Accepted", date: "2023-06-14" },
    { platform: "CodeChef", problem: "Chef and Digits", result: "Wrong Answer", date: "2023-06-13" },
    { platform: "Codeforces", problem: "Theatre Square", result: "Accepted", date: "2023-06-12" },
    { platform: "LeetCode", problem: "Add Two Numbers", result: "Accepted", date: "2023-06-11" },
  ],
  achievements: [
    { title: "100 Days Streak", icon: Calendar },
    { title: "Problem Solver", icon: Code },
    { title: "Contest Winner", icon: Trophy },
  ],
  performanceData: [
    { month: 'Jan', Codeforces: 1600, LeetCode: 1800, CodeChef: 1700 },
    { month: 'Feb', Codeforces: 1650, LeetCode: 1850, CodeChef: 1750 },
    { month: 'Mar', Codeforces: 1700, LeetCode: 1900, CodeChef: 1800 },
    { month: 'Apr', Codeforces: 1750, LeetCode: 2000, CodeChef: 1850 },
    { month: 'May', Codeforces: 1780, LeetCode: 2050, CodeChef: 1900 },
    { month: 'Jun', Codeforces: 1800, LeetCode: 2100, CodeChef: 1950 },
  ],
}

const MotionCard = motion(Card)

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview")

  const renderPlatformCard = (platform: string, data: typeof studentData.platforms.codeforces) => (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{platform}</CardTitle>
        <Badge variant="outline">{data.username}</Badge>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data.rating}</div>
        <p className="text-xs text-muted-foreground">Rating</p>
        <Progress value={data.solved / 10} className="mt-2" />
        <p className="text-xs text-muted-foreground mt-1">{data.solved} problems solved</p>
      </CardContent>
    </MotionCard>
  )

  return (
    <div className="container mx-auto py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8"
      >
        <div className="flex items-center mb-4 md:mb-0">
          <Avatar className="h-20 w-20 mr-4">
            <AvatarImage src={studentData.avatar} alt={studentData.name} />
            <AvatarFallback>{studentData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{studentData.name}</h1>
            <p className="text-muted-foreground">{studentData.email}</p>
            <p className="text-sm">Student ID: {studentData.studentId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{studentData.overallRank}</div>
            <p className="text-xs text-muted-foreground">Overall Rank</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{studentData.totalScore}</div>
            <p className="text-xs text-muted-foreground">Total Score</p>
          </div>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="submissions">Recent Submissions</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {renderPlatformCard("Codeforces", studentData.platforms.codeforces)}
            {renderPlatformCard("LeetCode", studentData.platforms.leetcode)}
            {renderPlatformCard("CodeChef", studentData.platforms.codechef)}
          </div>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Your coding activity across all platforms</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={studentData.performanceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Codeforces" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="LeetCode" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="CodeChef" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </MotionCard>
        </TabsContent>
        <TabsContent value="submissions" className="space-y-4">
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
              <CardDescription>Your latest problem-solving attempts</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {studentData.recentSubmissions.map((submission, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between border-b pb-2 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium">{submission.problem}</p>
                      <p className="text-sm text-muted-foreground">{submission.platform} • {submission.date}</p>
                    </div>
                    <Badge variant={submission.result === "Accepted" ? "default" : "destructive"}>
                      {submission.result}
                    </Badge>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </MotionCard>
        </TabsContent>
        <TabsContent value="achievements" className="space-y-4">
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Milestones and recognitions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {studentData.achievements.map((achievement, index) => (
                  <MotionCard
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{achievement.title}</CardTitle>
                      <achievement.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">Keep up the great work!</p>
                    </CardContent>
                  </MotionCard>
                ))}
              </div>
            </CardContent>
          </MotionCard>
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 flex justify-center"
      >
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" /> View Full Statistics
        </Button>
      </motion.div>
    </div>
  )
}
