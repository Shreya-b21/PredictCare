import type { User } from "firebase/auth"
import Navigation from "@/components/navigation"

interface DashboardProps {
  navigateTo: (page: string) => void
  user: User | null
}

export default function Dashboard({ navigateTo, user }: DashboardProps) {
  return (
    <div>
      <Navigation navigateTo={navigateTo} currentPage="dashboard-page" user={user} />
      <div className="p-8">
        <h1 className="text-white text-3xl mb-4">Welcome to PredictCare Dashboard</h1>
        <p className="text-white">Explore the options in the navigation bar above to get started.</p>
        <br />
        <h1 className="text-white text-3xl mb-4">
          Don't let breast cancer
          <br /> take away the motivation
          <img
            src="https://i.pinimg.com/736x/a2/e8/43/a2e8435d3b098c6913ff322a2fe013d2.jpg"
            aria-hidden="true"
            className="inline-block ml-2 h-12 w-12 rounded-full"
          />
          <br />
          to achieve your dreams
        </h1>
        <br />
        <h1 className="text-white text-3xl mb-4">
          Accept what is, <br />
          let go of what was,
          <br /> and have faith in what will be
        </h1>
      </div>
    </div>
  )
}
