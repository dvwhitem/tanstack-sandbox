'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type User = {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive'
  createdAt: string
}

export function OptimisticUserDemo() {
  const [users, setUsers] = React.useState<User[]>([])
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Add optimistic update logic
    console.log('Creating user:', { name, email })
  }

  const handleEditUser = (userId: string, updates: Partial<User>) => {
    // TODO: Add optimistic update logic for editing
    console.log('Editing user:', userId, updates)
  }

  const handleDeleteUser = (userId: string) => {
    // TODO: Add optimistic update logic for deletion
    console.log('Deleting user:', userId)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="delete">Delete</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Create New User</CardTitle>
                <CardDescription>
                  Form for creating a user with optimistic updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter user name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Create User
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Users List</CardTitle>
                <CardDescription>
                  Users will appear here instantly thanks to optimistic updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                {users.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No users found. Create your first user!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="edit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Edit Users</CardTitle>
              <CardDescription>
                Demonstration of optimistic updates when editing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Here will be a demonstration of editing users with instant UI updates
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delete" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delete Users</CardTitle>
              <CardDescription>
                Demonstration of optimistic updates when deleting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Here will be a demonstration of deleting users with instant removal from the list
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">How Optimistic Updates Work</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✨ <strong>Instant Feedback:</strong> UI updates immediately when user takes action</p>
          <p>🔄 <strong>Background Sync:</strong> API request happens in the background</p>
          <p>✅ <strong>Success:</strong> Temporary data is replaced with real data</p>
          <p>❌ <strong>Error:</strong> Changes are rolled back if the request fails</p>
          <p>🎯 <strong>Better UX:</strong> User doesn't wait for loading</p>
        </CardContent>
      </Card>
    </div>
  )
}
