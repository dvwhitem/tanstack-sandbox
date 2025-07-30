import { Suspense } from 'react'
import { UsersList } from './users-list'

export default function UsersPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <Suspense fallback={<p>Loading users...</p>}>
                <UsersList />
            </Suspense>
        </div>
    )
}