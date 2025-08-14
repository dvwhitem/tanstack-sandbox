import { OptimisticUserDemo } from '@/components/optimistic-user-demo'

export default function HomePage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">React Query Optimistic Updates Demo</h1>
        <p className="text-xl text-muted-foreground">
          Demonstration of optimistic updates with TanStack Query
        </p>
      </div>
      
      <OptimisticUserDemo />
    </div>
  )
}
