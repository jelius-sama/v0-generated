"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "user" | "other"
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hey there! How's it going?",
      sender: "other",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
    },
    {
      id: "2",
      content: "Pretty good! Just working on some new projects. How about you?",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "3",
      content: "Same here. Have you seen the new movie that just came out?",
      sender: "other",
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isNearBottom, setIsNearBottom] = useState(true)

  // Function to check if user is near bottom of chat
  const checkIfNearBottom = () => {
    const container = containerRef.current
    if (container) {
      const threshold = 100 // pixels from bottom
      const position = container.scrollHeight - container.scrollTop - container.clientHeight
      setIsNearBottom(position < threshold)
    }
  }

  // Auto-scroll to bottom when messages change, but only if user was already near bottom
  useEffect(() => {
    if (isNearBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isNearBottom])

  // Add scroll event listener
  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", checkIfNearBottom)
      return () => container.removeEventListener("scroll", checkIfNearBottom)
    }
  }, [])

  // Function to send a message
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simulate receiving a response after a short delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getRandomResponse(),
        sender: "other",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, responseMessage])
    }, 1000)
  }

  // Helper function to get random responses
  const getRandomResponse = () => {
    const responses = [
      "That's interesting!",
      "Tell me more about that.",
      "I see what you mean.",
      "How does that make you feel?",
      "What are your thoughts on this?",
      "That's a great point!",
      "I hadn't thought of it that way before.",
      "Thanks for sharing that with me.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-[600px] max-w-md mx-auto border rounded-lg overflow-hidden bg-gray-50">
      <div className="bg-gray-100 p-3 border-b">
        <h1 className="text-lg font-medium text-center">Messages</h1>
      </div>

      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4" onScroll={checkIfNearBottom}>
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={cn("flex flex-col", message.sender === "user" ? "items-end" : "items-start")}
          >
            <div className="flex items-end gap-2">
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                  message.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none",
                )}
              >
                {message.content}
              </div>
            </div>
            <span className="text-xs text-gray-500 mt-1">{formatTime(message.timestamp)}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="border-t p-2 bg-white flex items-center gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit" size="icon" className="rounded-full">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}

