'use client'

import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/ui/card'
import {useQueryState} from 'nuqs'
import {Button} from '@/components/ui/button'
import {z} from 'zod'

const sortSchema = z.enum(['asc', 'desc']).optional()
const pageSchema = z.coerce.number().int().min(1).default(1)

const PAGE_SIZE = 3

export function UsersList() {
    const [sort, setSort] = useQueryState('sort', sortSchema)
    const [page, setPage] = useQueryState('page', pageSchema)

    const currentPage = page ?? 1

    const { data, isLoading, isError } = useQuery({
        queryKey: ['users', page ?? 1, sort],
        queryFn: async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/users')
            const users = await res.json()

            if (sort === 'asc') {
                users.sort((a: any, b: any) => a.name.localeCompare(b.name))
            } else if (sort === 'desc') {
                users.sort((a: any, b: any) => b.name.localeCompare(a.name))
            }

            const start = (currentPage - 1) * PAGE_SIZE
            const end = start + PAGE_SIZE
            return users.slice(start, end)
        },
    })

    const toggleSort = () => {
        setSort((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    }

    const nextPage = () => setPage((p) => (p ?? 1) + 1)
    const prevPage = () => setPage((p) => Math.max(1, (p ?? 1) - 1))

    const hasPrevPage = currentPage > 1
    const hasNextPage = (data?.length ?? 0) === PAGE_SIZE

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Something went wrong</p>

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          Sort: {sort || 'none'}, Page: {page ?? 1}
        </span>
                <Button onClick={toggleSort}>
                    Toggle sort ({sort === 'asc' ? 'desc' : 'asc'})
                </Button>
            </div>

            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading users</p>}

            <div className="grid gap-2">
                {data?.map((user: any) => (
                    <Card key={user.id} className="p-4">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-muted-foreground text-sm">{user.email}</p>
                    </Card>
                ))}
            </div>

            <div className="flex justify-between pt-4">
                <Button onClick={prevPage} disabled={!hasPrevPage}>
                    ← Previous
                </Button>
                <Button onClick={nextPage} disabled={!hasNextPage}>
                    Next →
                </Button>
            </div>
        </div>
    )
}
