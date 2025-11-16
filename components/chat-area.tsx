'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Code2, Loader2, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import type { Conversation } from '@/components/chat-interface'
import ReactMarkdown from 'react-markdown'

interface ChatAreaProps {
  conversation: Conversation | undefined
  onUpdateMessages: (conversationId: string, messages: any[]) => void
  sidebarCollapsed: boolean
}

export function ChatArea({
  conversation,
  onUpdateMessages,
  sidebarCollapsed,
}: ChatAreaProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    initialMessages: conversation?.messages || [],
    id: conversation?.id,
  })

  useEffect(() => {
    if (conversation && messages.length > 0) {
      onUpdateMessages(conversation.id, messages)
    }
  }, [messages])

  useEffect(() => {
    if (conversation) {
      // The useChat hook will automatically reinitialize with new initialMessages
    }
  }, [conversation?.id])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && conversation && status !== 'in_progress') {
      sendMessage({ text: input.trim() })
      setInput('')
    }
  }

  if (!conversation) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-background">
        <Code2 className="h-16 w-16 text-primary" />
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground">
            Bem-vindo ao DevChat
          </h2>
          <p className="mt-2 text-muted-foreground">
            Selecione uma conversa ou crie uma nova para começar
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col bg-background">
      {/* Header */}
      <div className="flex items-center border-b border-border bg-card px-6 py-3">
        <h2 className="font-semibold text-card-foreground">
          {conversation.title}
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <Code2 className="mx-auto h-12 w-12 text-primary" />
              <p className="mt-4 text-muted-foreground">
                Envie uma mensagem para começar a conversa
              </p>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {status === 'in_progress' && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Pensando...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card p-4">
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
              placeholder="Faça uma pergunta sobre programação..."
              className="min-h-[60px] resize-none bg-background"
              disabled={status === 'in_progress'}
            />
            <Button
              type="submit"
              size="icon"
              className="h-[60px] w-[60px]"
              disabled={!input.trim() || status === 'in_progress'}
            >
              {status === 'in_progress' ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Pressione Enter para enviar, Shift + Enter para nova linha
          </p>
        </form>
      </div>
    </div>
  )
}

function CodeBlock({ language, children }: { language?: string; children: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative my-4">
      <div className="flex items-center justify-between rounded-t-md bg-muted px-4 py-2">
        <span className="text-xs font-mono text-muted-foreground">
          {language || 'code'}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
      <pre className="overflow-x-auto rounded-b-md bg-[#1e1e1e] p-4">
        <code className="font-mono text-sm text-[#d4d4d4]">{children}</code>
      </pre>
    </div>
  )
}

function MessageBubble({ message }: { message: any }) {
  const isUser = message.role === 'user'

  // Extract text from UIMessage parts
  const messageText = message.parts
    ?.filter((part: any) => part.type === 'text')
    .map((part: any) => part.text)
    .join('') || ''

  return (
    <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
          <Code2 className="h-5 w-5 text-primary-foreground" />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-lg px-4 py-3 ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'border border-border bg-card text-card-foreground'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words leading-relaxed">
            {messageText}
          </p>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '')
                  const codeContent = String(children).replace(/\n$/, '')
                  
                  return !inline && match ? (
                    <CodeBlock language={match[1]}>
                      {codeContent}
                    </CodeBlock>
                  ) : (
                    <code
                      className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
                      {...props}
                    >
                      {children}
                    </code>
                  )
                },
                p({ children }) {
                  return <p className="leading-relaxed text-card-foreground">{children}</p>
                },
                ul({ children }) {
                  return <ul className="my-2 ml-4 list-disc space-y-1 text-card-foreground">{children}</ul>
                },
                ol({ children }) {
                  return <ol className="my-2 ml-4 list-decimal space-y-1 text-card-foreground">{children}</ol>
                },
                li({ children }) {
                  return <li className="text-card-foreground">{children}</li>
                },
                h1({ children }) {
                  return <h1 className="mb-2 mt-4 text-xl font-bold text-card-foreground">{children}</h1>
                },
                h2({ children }) {
                  return <h2 className="mb-2 mt-3 text-lg font-semibold text-card-foreground">{children}</h2>
                },
                h3({ children }) {
                  return <h3 className="mb-2 mt-2 text-base font-semibold text-card-foreground">{children}</h3>
                },
                blockquote({ children }) {
                  return (
                    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                      {children}
                    </blockquote>
                  )
                },
              }}
            >
              {messageText}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
          <span className="text-sm font-semibold text-muted-foreground">U</span>
        </div>
      )}
    </div>
  )
}
