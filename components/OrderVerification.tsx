"use client";

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { validateAuthKey } from "@/lib/authKeys"

export default function OrderVerification() {
  const router = useRouter()
  const [authKey, setAuthKey] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (!authKey.trim()) {
      setErrorMessage("请输入身份ID")
      return
    }

    setIsVerifying(true)
    try {
      const formattedKey = authKey.trim().toUpperCase()
      console.log('Checking key:', formattedKey)
      
      const { isValid, isUsed } = await validateAuthKey(formattedKey)
      console.log('Validation result:', { isValid, isUsed })

      if (isUsed) {
        console.log('Key is used')
        setErrorMessage("此身份ID已被使用，请使用新的身份ID")
        return
      }

      if (isValid) {
        localStorage.setItem("verifiedAuthKey", formattedKey)
        router.push("/create")
      } else {
        console.log('Key is invalid')
        setErrorMessage("无效的身份ID")
      }
    } catch (error) {
      console.error('Verification error:', error)
      setErrorMessage("验证失败，请稍后重试")
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-playfair text-center mb-6">身份验证</h2>
      <form onSubmit={handleVerification} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="请输入身份ID"
            value={authKey}
            onChange={(e) => setAuthKey(e.target.value)}
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-2">
            身份ID格式：ZHUJIAN-XXXXX-2025X-XXXX（X为字母或数字）
          </p>
          {errorMessage && (
            <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
          )}
        </div>
        <Button 
          type="submit" 
          className="w-full"
          disabled={isVerifying}
        >
          {isVerifying ? "验证中..." : "验证身份"}
        </Button>
      </form>
    </div>
  )
} 