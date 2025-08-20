import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react'
import { animate } from '@/lib/particle-chamber'

const ParticleChamberPage = () => {
  const [initialPosition, setInitialPosition] = useState('')
  const [speed, setSpeed] = useState(1)
  const [animation, setAnimation] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!initialPosition.trim()) return

    const steps = animate(initialPosition, speed)
    setAnimation(steps)
    setCurrentStep(0)
    setIsPlaying(false)
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
  }

  const togglePlayback = () => {
    if (isPlaying) {
      if (intervalId) {
        clearInterval(intervalId)
        setIntervalId(null)
      }
      setIsPlaying(false)
    } else {
      if (animation.length > 0 && currentStep < animation.length - 1) {
        const id = setInterval(() => {
          setCurrentStep(prev => {
            if (prev >= animation.length - 1) {
              clearInterval(id)
              setIsPlaying(false)
              setIntervalId(null)
              return prev
            }
            return prev + 1
          })
        }, 800)
        setIntervalId(id)
        setIsPlaying(true)
      }
    }
  }

  const resetAnimation = () => {
    setCurrentStep(0)
    setIsPlaying(false)
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
  }

  const examples = [
    {
      position: "..R....",
      speed: 2,
      description: "Single particle moving right"
    },
    {
      position: "RR..LRL",
      speed: 3,
      description: "Multiple particles with different directions"
    },
    {
      position: "LRLR.LRLR",
      speed: 2,
      description: "Complex particle interactions"
    },
    {
      position: "RLRLRLRLRL",
      speed: 10,
      description: "High-speed particles (all exit quickly)"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">
            Problem 2: Particle Chamber
          </h1>
          <p className="text-lg text-gray-600">
            Simulate particles moving through a chamber at constant speed until they all exit.
          </p>
        </div>

        <div className="space-y-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Simulation Parameters</CardTitle>
              <CardDescription>
                Set up your particle chamber configuration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Initial Position (R=right, L=left, .=empty)
                  </label>
                  <Input
                    value={initialPosition}
                    onChange={(e) => setInitialPosition(e.target.value)}
                    placeholder="e.g., ..R..LL."
                    pattern="[RLrL.]*"
                    title="Only R, L, and . characters allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Speed (positions per step)
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="20"
                    value={speed}
                    onChange={(e) => setSpeed(parseInt(e.target.value) || 1)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Generate Animation
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Animation Viewer */}
          <Card>
            <CardHeader>
              <CardTitle>Animation Viewer</CardTitle>
              <CardDescription>
                Watch particles move through the chamber step by step.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {animation.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={togglePlayback}
                      disabled={currentStep >= animation.length - 1}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                    <Button variant="outline" size="sm" onClick={resetAnimation}>
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </Button>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">
                        Step {currentStep + 1} of {animation.length}
                      </span>
                    </div>
                    <div className="font-mono text-2xl text-center tracking-widest py-4 bg-white rounded border">
                      {animation[currentStep]}
                    </div>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    <h4 className="font-medium text-sm">All Steps:</h4>
                    {animation.map((step, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-2 p-2 rounded text-sm ${
                          index === currentStep
                            ? 'bg-blue-100 border-blue-300'
                            : 'bg-gray-50'
                        }`}
                        onClick={() => setCurrentStep(index)}
                        style={{ cursor: 'pointer' }}
                      >
                        <span className="w-8 text-gray-500">#{index + 1}</span>
                        <span className="font-mono tracking-wider">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>Enter initial position and speed to generate animation</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Examples Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Examples</CardTitle>
            <CardDescription>
              Try these pre-configured examples to see different particle behaviors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {examples.map((example, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="mb-3">
                    <p className="text-sm text-gray-60 mb-1">
                      {example.description}
                    </p>
                    <p className="font-mono text-sm">Position: {example.position}</p>
                    <p className="font-mono text-sm">Speed: {example.speed}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInitialPosition(example.position)
                      setSpeed(example.speed)
                    }}
                    className="w-full"
                  >
                    Load Example
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Algorithm Explanation */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Algorithm Explanation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <ol className="space-y-2">
                <li>Parse the initial position string to identify particle positions and directions</li>
                <li>For each animation step:
                  <ul className="ml-4 mt-1">
                    <li>Create a new chamber representation filled with dots</li>
                    <li>Count particles at each position (multiple particles can occupy same position)</li>
                    <li>Mark occupied positions with 'X'</li>
                    <li>Move all particles by the specified speed in their respective directions</li>
                    <li>Remove particles that have exited the chamber boundaries</li>
                  </ul>
                </li>
                <li>Continue until no particles remain in the chamber</li>
                <li>Add a final step showing the empty chamber</li>
              </ol>
              <p className="mt-4 text-sm text-gray-600">
                Time Complexity: O(n × s) where n is chamber length and s is the number of steps<br/>
                Space Complexity: O(p + s) where p is the number of particles and s is the number of steps
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ParticleChamberPage
