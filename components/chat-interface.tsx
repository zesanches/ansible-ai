'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/sidebar'
import { ChatArea } from '@/components/chat-area'
import type { UIMessage } from 'ai'

export interface Folder {
  id: string
  name: string
  conversations: Conversation[]
  isExpanded?: boolean
}

export interface Conversation {
  id: string
  title: string
  folderId: string
  messages: UIMessage[]
  createdAt: Date
  updatedAt: Date
}


export function ChatInterface() {
  const [folders, setFolders] = useState<Folder[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem('devchat-data')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        // Convert date strings back to Date objects
        const foldersWithDates = parsed.folders.map((f: any) => ({
          ...f,
          conversations: f.conversations.map((c: any) => ({
            ...c,
            createdAt: new Date(c.createdAt),
            updatedAt: new Date(c.updatedAt),
          })),
        }))
        setFolders(foldersWithDates)
        setActiveConversationId(parsed.activeConversationId)
      } catch (error) {
        console.error('[v0] Failed to load saved data:', error)
        initializeDefaultFolders()
      }
    } else {
      initializeDefaultFolders()
    }
  }, [])

  useEffect(() => {
    if (folders.length > 0) {
      localStorage.setItem(
        'devchat-data',
        JSON.stringify({ folders, activeConversationId })
      )
    }
  }, [folders, activeConversationId])

  const initializeDefaultFolders = () => {
    const defaultFolders: Folder[] = [
      {
        id: '1',
        name: 'React',
        isExpanded: true,
        conversations: [
          {
            id: '1-1',
            title: 'Nova Conversa',
            folderId: '1',
            messages: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    ]
    setFolders(defaultFolders)
    setActiveConversationId('1-1')
  }

  const activeConversation = folders
    .flatMap((f) => f.conversations)
    .find((c) => c.id === activeConversationId)

  const handleAddFolder = (name: string) => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      conversations: [],
      isExpanded: true,
    }
    setFolders([...folders, newFolder])
  }

  const handleDeleteFolder = (folderId: string) => {
    setFolders(folders.filter((f) => f.id !== folderId))
  }

  const handleRenameFolder = (folderId: string, newName: string) => {
    setFolders(
      folders.map((f) => (f.id === folderId ? { ...f, name: newName } : f))
    )
  }

  const handleToggleFolder = (folderId: string) => {
    setFolders(
      folders.map((f) =>
        f.id === folderId ? { ...f, isExpanded: !f.isExpanded } : f
      )
    )
  }

  const handleAddConversation = (folderId: string, title: string) => {
    const newConversation: Conversation = {
      id: `${folderId}-${Date.now()}`,
      title,
      folderId,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setFolders(
      folders.map((f) =>
        f.id === folderId
          ? { ...f, conversations: [...f.conversations, newConversation] }
          : f
      )
    )
    setActiveConversationId(newConversation.id)
  }

  const handleDeleteConversation = (conversationId: string) => {
    setFolders(
      folders.map((f) => ({
        ...f,
        conversations: f.conversations.filter((c) => c.id !== conversationId),
      }))
    )
    if (activeConversationId === conversationId) {
      setActiveConversationId(null)
    }
  }

  const handleRenameConversation = (conversationId: string, newTitle: string) => {
    setFolders(
      folders.map((f) => ({
        ...f,
        conversations: f.conversations.map((c) =>
          c.id === conversationId ? { ...c, title: newTitle } : c
        ),
      }))
    )
  }

  const handleUpdateMessages = (conversationId: string, messages: UIMessage[]) => {
    setFolders(
      folders.map((f) => ({
        ...f,
        conversations: f.conversations.map((c) =>
          c.id === conversationId
            ? { ...c, messages, updatedAt: new Date() }
            : c
        ),
      }))
    )
  }

  return (
    <>
      <Sidebar
        folders={folders}
        activeConversationId={activeConversationId}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onSelectConversation={setActiveConversationId}
        onAddFolder={handleAddFolder}
        onDeleteFolder={handleDeleteFolder}
        onRenameFolder={handleRenameFolder}
        onToggleFolder={handleToggleFolder}
        onAddConversation={handleAddConversation}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
      />
      <ChatArea
        conversation={activeConversation}
        onUpdateMessages={handleUpdateMessages}
        sidebarCollapsed={sidebarCollapsed}
      />
    </>
  )
}
