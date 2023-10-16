import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Main } from 'next/document'
import Profile from '@/components/Profile'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    // <main>
      <Profile></Profile>
    // </main>
  )
}
