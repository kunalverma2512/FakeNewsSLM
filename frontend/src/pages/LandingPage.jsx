import { useState } from 'react'

export default function LandingPage() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    if (!text.trim()) return

    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error('Server returned an error. Please try again.')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const isFake = result && result.prediction === 'Fake'

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Is this news real?
          </h1>
          <p className="text-gray-500 text-base">
            Paste any news article below. Our AI model will analyse it and tell you whether it is real or fabricated.
          </p>
        </div>

        <div className="w-full">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              setResult(null)
              setError(null)
            }}
            placeholder="Paste the news article text here..."
            rows={8}
            className="w-full bg-white border border-gray-200 text-gray-800 text-sm px-4 py-3 resize-none outline-none focus:border-green-500 transition-colors placeholder-gray-300"
          />

          <button
            onClick={handleSubmit}
            disabled={loading || !text.trim()}
            className="mt-3 w-full bg-green-600 text-white text-sm font-medium py-3 transition-colors hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Analysing...' : 'Analyse Article'}
          </button>
        </div>

        {result && (
          <div className={`mt-6 px-5 py-4 border ${isFake ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
            <p className="text-sm font-semibold text-gray-700 mb-1">Result</p>
            <p className={`text-2xl font-bold ${isFake ? 'text-red-600' : 'text-green-600'}`}>
              {result.prediction} News
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Model confidence: {result.confidence}%
            </p>
          </div>
        )}

        {error && (
          <div className="mt-6 px-5 py-4 border border-red-200 bg-red-50">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}
