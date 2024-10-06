'use client';
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SendIcon, PaperclipIcon, SmileIcon } from "lucide-react";

export function ChatInterface() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [expertName, setExpertName] = useState('Legal Expert')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef(null)
  const ws = useRef(null)

  useEffect(() => {
    // Initialize WebSocket connection
    ws.current = new WebSocket('wss://your-websocket-server-url')

    ws.current.onopen = () => {
      console.log('WebSocket Connected')
      setIsConnected(true)
    }

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.type === 'typing') {
        setIsTyping(message.isTyping)
      } else {
        setMessages((prevMessages) => [...prevMessages, message])
        setIsTyping(false)
      }
    }

    ws.current.onclose = () => {
      console.log('WebSocket Disconnected')
      setIsConnected(false)
    }

    return () => {
      if (ws.current) {
        ws.current.close()
      }
    };
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    if (inputMessage.trim() && ws.current && isConnected) {
      const newMessage = {
        id: Date.now().toString(),
        sender: 'user',
        content: inputMessage.trim(),
        timestamp: new Date(),
      }
      ws.current.send(JSON.stringify(newMessage))
      setMessages((prevMessages) => [...prevMessages, newMessage])
      setInputMessage('')
    }
  }

  return (
    (<Card
      className="w-full h-[600px] flex flex-col bg-gradient-to-br from-purple-50 to-blue-50">
      <CardHeader className="border-b bg-white/50 backdrop-blur-sm">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-2">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt={expertName} />
              <AvatarFallback>{expertName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <span className="font-bold">{expertName}</span>
              <p className="text-sm text-gray-500">Legal Professional</p>
            </div>
          </div>
          <span
            className={`text-sm px-2 py-1 rounded-full ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {isConnected ? 'Online' : 'Offline'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-4">
        <ScrollArea className="flex-grow pr-4" ref={scrollAreaRef}>
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-800'
                  } shadow-md`}>
                  <p>{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center text-gray-500 text-sm">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              {expertName} is typing...
            </motion.div>
          )}
        </ScrollArea>
        <div className="flex items-center space-x-2 mt-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <PaperclipIcon className="h-4 w-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Attach file</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-grow" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <SmileIcon className="h-4 w-4" />
                  <span className="sr-only">Add emoji</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add emoji</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button onClick={sendMessage} disabled={!isConnected} className="rounded-full">
            <SendIcon className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </CardContent>
      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
          margin-right: 8px;
        }
        .typing-indicator span {
          height: 8px;
          width: 8px;
          background-color: #6b7280;
          border-radius: 50%;
          display: inline-block;
          margin-right: 4px;
          animation: typing 1s infinite ease-in-out;
        }
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes typing {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </Card>)
  );
}