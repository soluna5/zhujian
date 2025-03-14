"use client"

import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LanguageSwitcher() {
  const router = useRouter()

  const handleLanguageChange = (value: string) => {
    router.push(`/${value}`)
  }

  return (
    <Select onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="语言" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="zh">中文</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  )
}

