import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { useScrollTop } from '@/hooks/useScrollTop'

export default function RootLayout() {
  useScrollTop()
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
    </>
  )
}
