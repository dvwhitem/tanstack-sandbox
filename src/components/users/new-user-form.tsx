'use client'

import * as React from 'react'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {useMutation} from '@tanstack/react-query'

type NewUser = {
    name: string
    job: string
}

type CreatedUser = {
    id: string
    name: string
    job: string
    createdAt: string
}

const createUser = async (user: NewUser) => {
    const res = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'x-api-key': 'reqres-free-v1'},
        body: JSON.stringify(user)
    })
    if (!res.ok) {
        throw new Error('Failed to create user')
    }

    return res.json()
}

export function NewUserForm() {
    const [name, setName] = React.useState('')
    const [job, setJob] = React.useState('')
    const [users, setUsers] = React.useState<CreatedUser[]>([])

    const mutation = useMutation({
        mutationFn: createUser
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutation.mutate({name, job}, {
            onSuccess: (newUser) => {
                setUsers((prev)  => [...prev, newUser])
                setJob('')
                setName('')
            }
        })
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            <div className="flex flex-col gap-4">
                <Card>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <CardHeader>
                            <CardTitle className="text-2xl">Create New User</CardTitle>
                            <CardDescription>
                                Enter your name job below
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="job">Job</Label>
                                <Input id="job" value={job} onChange={(e) => setJob(e.target.value)}/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" type="submit" disabled={mutation.isPending}>
                                {mutation.isPending ? 'Creating...' : 'Create User'}
                            </Button>
                        </CardFooter>
                    </form>

                    {mutation.isError && (
                        <p className="px-6 text-red-600 text-sm">❌ Error: {mutation.error.message}</p>
                    )}
                </Card>
            </div>
            <div className="flex flex-col gap-4">
                    {users.length > 0 && (
                        <Card>
                            <CardContent className="flex flex-col gap-4">
                                <div className="px-6 pt-4">
                                    <h2 className="font-semibold text-base mb-2">🧑 Created Users:</h2>
                                    <ul className="space-y-2">
                                        {users.map((user) => (
                                            <li key={user.id} className="border p-2 rounded-md">
                                                <p><strong>{user.name}</strong> — {user.job}</p>
                                                <p className="text-xs text-muted-foreground">Created at: {new Date(user.createdAt).toLocaleString()}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    )}
            </div>
        </div>
    )
}