import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Zap } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          RealWork Interview
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Two algorithmic challenges: Finding unused letters and simulating particle chamber animations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Problem 1: Unused Letters */}
        <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-300">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Unused Letters</CardTitle>
            <CardDescription className="text-base">
              Find all letters of the alphabet that are not used in a given string of English text.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Example:</p>
                <p className="font-mono text-sm">"A slow yellow fox crawls under the proactive dog"</p>
                <p className="text-sm text-gray-600 mt-2">Returns: "bjkmqz"</p>
              </div>
              <Link to="/unused-letters">
                <Button className="w-full" size="lg">
                  Try Problem 1
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Problem 2: Particle Chamber */}
        <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-purple-300">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <CardTitle className="text-2xl">Particle Chamber</CardTitle>
            <CardDescription className="text-base">
              Simulate particles moving through a chamber at constant speed until they all exit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600mb-2">Example:</p>
                <p className="font-mono text-sm">Position: "..R...." Speed: 2</p>
                <p className="text-sm text-gray-600 mt-2">Animation steps: ["..X....", "....X..", "......X", "......."]</p>
              </div>
              <Link to="/particle-chamber">
                <Button className="w-full" size="lg" variant="secondary">
                  Try Problem 2
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-16">
        <p className="text-gray-500">
          Built with React, TypeScript, Tailwind CSS, and deployed with SST v2
        </p>
      </div>
    </div>
  )
}

export default HomePage
