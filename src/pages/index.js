import Layout from "@/components/Layout"
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
      <div className="text-center">index.js</div>
    </Layout>
  )
}
