'use client'

import { useState } from 'react'
import { ChevronRight, ChevronDown, File, FolderPlus, MessageSquarePlus, MoreVertical, Trash2, Edit2, PanelLeftClose, PanelLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type { Folder, Conversation } from '@/components/chat-interface'

interface SidebarProps {
  folders: Folder[]
  activeConversationId: string | null
  collapsed: boolean
  onToggleCollapse: () => void
  onSelectConversation: (id: string) => void
  onAddFolder: (name: string) => void
  onDeleteFolder: (id: string) => void
  onRenameFolder: (id: string, newName: string) => void
  onToggleFolder: (id: string) => void
  onAddConversation: (folderId: string, title: string) => void
  onDeleteConversation: (id: string) => void
  onRenameConversation: (id: string, newTitle: string) => void
}

export function Sidebar({
  folders,
  activeConversationId,
  collapsed,
  onToggleCollapse,
  onSelectConversation,
  onAddFolder,
  onDeleteFolder,
  onRenameFolder,
  onToggleFolder,
  onAddConversation,
  onDeleteConversation,
  onRenameConversation,
}: SidebarProps) {
  const [isAddingFolder, setIsAddingFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null)
  const [editingConversationId, setEditingConversationId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      onAddFolder(newFolderName.trim())
      setNewFolderName('')
      setIsAddingFolder(false)
    }
  }

  const handleRenameFolder = (folderId: string) => {
    if (editValue.trim()) {
      onRenameFolder(folderId, editValue.trim())
      setEditingFolderId(null)
      setEditValue('')
    }
  }

  const handleRenameConversation = (conversationId: string) => {
    if (editValue.trim()) {
      onRenameConversation(conversationId, editValue.trim())
      setEditingConversationId(null)
      setEditValue('')
    }
  }

  if (collapsed) {
    return (
      <div className="flex h-full w-12 flex-col items-center border-r border-border bg-sidebar py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-sidebar">
      <div className="flex items-center justify-between border-b border-sidebar-border px-4 py-3">
        <h2 className="font-semibold text-sidebar-foreground">DevChat</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <PanelLeftClose className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {folders.map((folder) => (
          <div key={folder.id} className="mb-1">
            <div className="group flex items-center gap-1 rounded px-2 py-1 hover:bg-sidebar-accent">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggleFolder(folder.id)}
                className="h-5 w-5 p-0 text-sidebar-foreground"
              >
                {folder.isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>

              {editingFolderId === folder.id ? (
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => handleRenameFolder(folder.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRenameFolder(folder.id)
                    if (e.key === 'Escape') {
                      setEditingFolderId(null)
                      setEditValue('')
                    }
                  }}
                  autoFocus
                  className="h-6 flex-1 bg-sidebar-accent text-xs"
                />
              ) : (
                <span className="flex-1 text-sm text-sidebar-foreground">
                  {folder.name}
                </span>
              )}

              <div className="opacity-0 group-hover:opacity-100">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onAddConversation(folder.id, 'Nova Conversa')}
                  className="h-6 w-6 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <MessageSquarePlus className="h-3.5 w-3.5" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
                    >
                      <MoreVertical className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setEditingFolderId(folder.id)
                        setEditValue(folder.name)
                      }}
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      Renomear
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDeleteFolder(folder.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Deletar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {folder.isExpanded && (
              <div className="ml-4 mt-1 space-y-0.5">
                {folder.conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="group flex items-center gap-1 rounded px-2 py-1 hover:bg-sidebar-accent"
                  >
                    <File className="h-3.5 w-3.5 shrink-0 text-sidebar-foreground" />

                    {editingConversationId === conversation.id ? (
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={() => handleRenameConversation(conversation.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter')
                            handleRenameConversation(conversation.id)
                          if (e.key === 'Escape') {
                            setEditingConversationId(null)
                            setEditValue('')
                          }
                        }}
                        autoFocus
                        className="h-6 flex-1 bg-sidebar-accent text-xs"
                      />
                    ) : (
                      <button
                        onClick={() => onSelectConversation(conversation.id)}
                        className={cn(
                          'flex-1 truncate text-left text-xs text-sidebar-foreground',
                          activeConversationId === conversation.id &&
                            'font-semibold text-sidebar-primary'
                        )}
                      >
                        {conversation.title}
                      </button>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 shrink-0 p-0 text-sidebar-foreground opacity-0 hover:bg-sidebar-accent group-hover:opacity-100"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingConversationId(conversation.id)
                            setEditValue(conversation.title)
                          }}
                        >
                          <Edit2 className="mr-2 h-4 w-4" />
                          Renomear
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDeleteConversation(conversation.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Deletar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {isAddingFolder ? (
          <div className="flex items-center gap-2 px-2 py-1">
            <Input
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onBlur={handleAddFolder}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddFolder()
                if (e.key === 'Escape') {
                  setIsAddingFolder(false)
                  setNewFolderName('')
                }
              }}
              placeholder="Nome da pasta..."
              autoFocus
              className="h-7 text-xs"
            />
          </div>
        ) : (
          <Button
            variant="ghost"
            onClick={() => setIsAddingFolder(true)}
            className="mt-2 w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <FolderPlus className="h-4 w-4" />
            <span className="text-sm">Nova Pasta</span>
          </Button>
        )}
      </div>
    </div>
  )
}
