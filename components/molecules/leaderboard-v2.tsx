"use client"
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Medal, ArrowUpDown, Search, Trophy, Code2, FileCode2, Terminal, TrendingUp, TrendingDown, Star, Award, Users, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type User = {
  id: number
  name: string
  avatar: string
  codeforces: number | null
  leetcode: number | null
  hackerrank: number | null
  trend: 'up' | 'down' | 'neutral'
  achievements: string[]
  bio: string
}

const users: User[] = [
  { id: 1, name: "Alice Chen", avatar: "/placeholder.svg?height=32&width=32", codeforces: 2100, leetcode: 2800, hackerrank: 1950, trend: 'up', achievements: ['fast-solver', 'consistent'], bio: "Competitive programmer with a passion for algorithms" },
  { id: 2, name: "Bob Smith", avatar: "/placeholder.svg?height=32&width=32", codeforces: 2300, leetcode: 2600, hackerrank: null, trend: 'down', achievements: ['top-contributor'], bio: "Software engineer focusing on scalable systems" },
  { id: 3, name: "Charlie Davis", avatar: "/placeholder.svg?height=32&width=32", codeforces: 2500, leetcode: 2900, hackerrank: 2200, trend: 'up', achievements: ['contest-winner', 'mentor'], bio: "PhD student researching advanced algorithms" },
  { id: 4, name: "Diana Evans", avatar: "/placeholder.svg?height=32&width=32", codeforces: null, leetcode: 2500, hackerrank: 1900, trend: 'neutral', achievements: ['bug-crusher'], bio: "Frontend developer with a knack for problem-solving" },
  { id: 5, name: "Ethan Brown", avatar: "/placeholder.svg?height=32&width=32", codeforces: 2200, leetcode: null, hackerrank: 2000, trend: 'up', achievements: ['fast-solver'], bio: "Machine learning engineer applying algorithms to AI" },
  { id: 6, name: "Fiona Green", avatar: "/placeholder.svg?height=32&width=32", codeforces: 2400, leetcode: 2800, hackerrank: 2100, trend: 'down', achievements: ['consistent', 'mentor'], bio: "Full-stack developer and competitive programming enthusiast" },
  { id: 7, name: "George White", avatar: "/placeholder.svg?height=32&width=32", codeforces: 2150, leetcode: 2550, hackerrank: 1980, trend: 'neutral', achievements: ['top-contributor'], bio: "Cybersecurity expert with a strong algorithmic background" },
  { id: 8, name: "Hannah Black", avatar: "/placeholder.svg?height=32&width=32", codeforces: 2350, leetcode: 2750, hackerrank: 2050, trend: 'up', achievements: ['contest-winner'], bio: "Data scientist leveraging competitive programming skills" },
]

const calculateScore = (user: User) => {
  const scores = [user.codeforces, user.leetcode, user.hackerrank].filter(score => score !== null) as number[]
  return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
}

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'neutral' }) => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="w-4 h-4 text-green-500" />
    case 'down':
      return <TrendingDown className="w-4 h-4 text-red-500" />
    default:
      return <span className="w-4 h-4">-</span>
  }
}

const AchievementIcon = ({ achievement }: { achievement: string }) => {
  switch (achievement) {
    case 'fast-solver':
      return <Trophy className="w-4 h-4 text-yellow-500"/> // title="Fast Solver"
    case 'consistent':
      return <Award className="w-4 h-4 text-blue-500" /> // title="Consistent Performer"
    case 'top-contributor':
      return <Star className="w-4 h-4 text-purple-500" /> // title="Top Contributor"
    case 'contest-winner':
      return <Medal className="w-4 h-4 text-green-500" /> // title="Contest Winner"
    case 'mentor':
      return <Users className="w-4 h-4 text-orange-500" /> // title="Mentor"
    case 'bug-crusher':
      return <Zap className="w-4 h-4 text-indigo-500" /> // title="Bug Crusher"
    default:
      return null
  }
}

export default function Leaderboard2() {
  const [sortConfig, setSortConfig] = useState<{ key: keyof User | 'score'; direction: 'asc' | 'desc' }>({ key: 'score', direction: 'desc' })
  const [filter, setFilter] = useState('')
  const [platformFilter, setPlatformFilter] = useState<'all' | 'codeforces' | 'leetcode' | 'hackerrank'>('all')
  const [animateTable, setAnimateTable] = useState(false)

  const sortedAndFilteredUsers = useMemo(() => {
    let result = [...users]

    if (filter) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(filter.toLowerCase())
      )
    }

    if (platformFilter !== 'all') {
      result = result.filter(user => user[platformFilter] !== null)
    }

    result.sort((a, b) => {
      if (sortConfig.key === 'score') {
        return sortConfig.direction === 'asc' ? calculateScore(a) - calculateScore(b) : calculateScore(b) - calculateScore(a)
      }
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]
      if (aValue === null) return 1
      if (bValue === null) return -1
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })

    return result
  }, [sortConfig, filter, platformFilter])

  const requestSort = (key: keyof User | 'score') => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }))
    setAnimateTable(true)
  }

  useEffect(() => {
    if (animateTable) {
      const timer = setTimeout(() => setAnimateTable(false), 500)
      return () => clearTimeout(timer)
    }
  }, [animateTable])

  const getMedalColor = (index: number) => {
    switch(index) {
      case 0: return "text-yellow-400"
      case 1: return "text-gray-400"
      case 2: return "text-amber-600"
      default: return "text-transparent"
    }
  }

  return (
    <div className="p-4 w-full">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-6"
      >
        <h1 className="text-2xl sm:text-3xl font-bold">CP Leaderboard</h1>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
      >
        {sortedAndFilteredUsers.slice(0, 3).map((user, index) => {
          const order = [1, 0, 2] // Reorder for 2nd, 1st, 3rd place
          const heights = ["h-24 sm:h-32", "h-32 sm:h-40", "h-20 sm:h-24"]
          const delays = [0.4, 0.2, 0.6]
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: delays[index] }}
              className={`flex flex-col items-center ${heights[order[index]]}`}
            >
              <div className="relative">
                <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-primary">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2 bg-background rounded-full p-1 shadow-md">
                  {order[index] === 0 ? (
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                  ) : (
                    <Medal className={`w-5 h-5 sm:w-6 sm:h-6 ${index === 1 ? "text-gray-400" : "text-amber-600"}`} />
                  )}
                </div>
              </div>
              <div className="text-center mt-2">
                <p className="font-semibold text-sm sm:text-base">{user.name}</p>
                <Badge variant="secondary" className="mt-1">
                  {calculateScore(user).toFixed(2)}
                </Badge>
              </div>
              <div className={`w-full bg-primary mt-2 ${heights[order[index]]}`} />
            </motion.div>
          )
        })}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4"
      >
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={platformFilter} onValueChange={(value: string) => setPlatformFilter(value as 'all' | 'codeforces' | 'leetcode' | 'hackerrank')}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="codeforces">Codeforces</SelectItem>
            <SelectItem value="leetcode">LeetCode</SelectItem>
            <SelectItem value="hackerrank">HackerRank</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="rounded-md border overflow-x-auto"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" size="sm" onClick={() => requestSort('codeforces')}>
                  <Code2 className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Codeforces</span>
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" size="sm" onClick={() => requestSort('leetcode')}>
                  <FileCode2 className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">LeetCode</span>
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" size="sm" onClick={() => requestSort('hackerrank')}>
                  <Terminal className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">HackerRank</span>
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" size="sm" onClick={() => requestSort('score')}>
                  Score
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-center">Trend</TableHead>
              <TableHead className="text-center">Achievements</TableHead>
              <TableHead className="text-center">Profile</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {sortedAndFilteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`${index % 2 === 0 ? 'bg-m uted/50' : 'bg-background'}`}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Medal className={`w-5 h-5 ${getMedalColor(index)}`} />
                      {index + 1}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:inline">{user.name}</span>
                      <span className="sm:hidden">{user.name.split(' ')[0]}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{user.codeforces ?? '-'}</TableCell>
                  <TableCell className="text-right">{user.leetcode ?? '-'}</TableCell>
                  <TableCell className="text-right">{user.hackerrank ?? '-'}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={index < 3 ? "default" : "secondary"} className="ml-auto">
                      {calculateScore(user).toFixed(2)}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex justify-center text-center">
                    <TrendIcon trend={user.trend} />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-1">
                      {user.achievements.map((achievement, i) => (
                        <AchievementIcon key={i} achievement={achievement} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">View</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>{user.name}&apos;s Profile</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col items-center gap-4">
                          <Avatar className="w-20 h-20">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <p className="text-center">{user.bio}</p>
                          <div className="grid grid-cols-2 gap-4 w-full">
                            <div>
                              <h3 className="font-semibold">Codeforces</h3>
                              <p>{user.codeforces ?? 'N/A'}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold">LeetCode</h3>
                              <p>{user.leetcode ?? 'N/A'}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold">HackerRank</h3>
                              <p>{user.hackerrank ?? 'N/A'}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold">Overall Score</h3>
                              <p>{calculateScore(user).toFixed(2)}</p>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">Achievements</h3>
                            <div className="flex gap-2 justify-center">
                              {user.achievements.map((achievement, i) => (
                                <AchievementIcon key={i} achievement={achievement} />
                              ))}
                            </div>
                          </div>
                          <div><Button><Link href="/demo-profile">Full Profile</Link></Button></div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>
    </div>
  )
}