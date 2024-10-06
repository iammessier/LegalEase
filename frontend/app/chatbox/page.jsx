'use client';

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SendIcon, PaperclipIcon, SmileIcon, PhoneIcon, VideoIcon, MoreVerticalIcon } from "lucide-react"

const ChatInterface = () => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [expertName, setExpertName] = useState('Legal Expert')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef(null)
  const ws = useRef(null)

  useEffect(() => {
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
    }
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
    <Card className="w-full h-[600px] flex flex-col bg-gradient-to-br from-purple-50 to-blue-50 shadow-xl rounded-xl overflow-hidden">
      <CardHeader className="border-b bg-white/70 backdrop-blur-sm p-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-3 ring-2 ring-purple-500 ring-offset-2">
              <AvatarImage src="/placeholder.svg?height=48&width=48" alt={expertName} />
              <AvatarFallback>{expertName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <span className="font-bold text-lg">{expertName}</span>
              <p className="text-sm text-gray-500">Legal Professional</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <PhoneIcon className="h-5 w-5 text-purple-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Start voice call</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <VideoIcon className="h-5 w-5 text-purple-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Start video call</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVerticalIcon className="h-5 w-5 text-purple-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>More options</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-4 bg-gradient-to-br from-purple-100/50 to-blue-100/50">
        <ScrollArea className="flex-grow pr-4 mb-4" ref={scrollAreaRef}>
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-800'
                  } shadow-md`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString()}
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
              className="flex items-center text-gray-500 text-sm"
            >
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              {expertName} is typing...
            </motion.div>
          )}
        </ScrollArea>
        <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-inner">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-100">
                  <PaperclipIcon className="h-5 w-5 text-purple-600" />
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
            className="flex-grow bg-transparent border-none focus:ring-0 placeholder-gray-400 text-gray-800"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-100">
                  <SmileIcon className="h-5 w-5 text-purple-600" />
                  <span className="sr-only">Add emoji</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add emoji</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button 
            onClick={sendMessage} 
            disabled={!isConnected} 
            className="rounded-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            <SendIcon className="h-5 w-5" />
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
    </Card>
  )
}

export default ChatInterface;