import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import { findUnusedLetters } from '@/lib/unused-letters'

const UnusedLettersPage = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const unused = findUnusedLetters(input)
    setResult(unused)
  }

  const examples = [
    {
      text: "A slow yellow fox crawls under the proactive dog",
      expected: "bjkmqz"
    },
    {
      text: "A quick brown fox jumps over the lazy dog",
      expected: ""
    },
    {
      text: "Hello World",
      expected: "abcfgijkmnpqstuvxyz"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-90 mb-4">
            Problem 1: Unused Letters
          </h1>
          <p className="text-lg text-gray-600">
            Find all letters of the alphabet that are not used in a given string of English text.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Input Text</CardTitle>
              <CardDescription>
                Enter any string of English letters to find unused alphabet letters.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter your text here..."
                  className="min-h-[100px]"
                />
                <Button type="submit" className="w-full">
                  Find Unused Letters
                </Button>
              </form>

              {result !== '' && (
                <div className="mt-6 p-4 bg-green-50 border border-green-20 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Result:</h3>
                  <p className="font-mono text-lg text-green-700">
                    {result || '(All letters are used!)'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Examples Section */}
          <Card>
            <CardHeader>
              <CardTitle>Examples</CardTitle>
              <CardDescription>
                Try these examples to see how the algorithm works.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {examples.map((example, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="mb-2">
                    <p className="text-sm text-gray-60">Input:</p>
                    <p className="font-mono text-sm break-all">{example.text}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">Expected Output:</p>
                    <p className="font-mono text-sm font-semibold">
                      {example.expected || '(All letters used)'}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInput(example.text)}
                  >
                    Try This Example
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Algorithm Explanation */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Algorithm Explanation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prosemax-w-none">
              <ol className="space-y-2">
                <li>Create a set of all 26 letters in the English alphabet (a-z)</li>
                <li>Convert the input string to lowercase and remove non-alphabetic characters</li>
                <li>Create a set of all unique letters found in the input string</li>
                <li>Find the difference between the alphabet set and the used letters set</li>
                <li>Return the unused letters in alphabetical order</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UnusedLettersPage
