import { Suspense } from 'react'
import { UsersList } from '../../components/users/users-list'
import {Button} from '@/components/ui/button'
import Link from 'next/link'

export default function UsersPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <Button asChild>
                <Link href="/users/create">+ Create User</Link>
            </Button>
            <Suspense fallback={<p>Loading users...</p>}>
                <UsersList />
            </Suspense>
        </div>
    )
}