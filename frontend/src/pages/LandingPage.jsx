import { useState } from 'react'

const fakeNewsExamples = [
  "WAKE UP AMERICA! The government is secretly putting mind control chemicals in our tap water and nobody is doing anything about it!",
  "SHOCKING TRUTH: The recent earthquake was entirely caused by a secret underground weapon tested by radical politicians.",
  "You will not believe this! A major Hollywood celebrity just confessed to eating alien DNA to stay young.",
  "BREAKING: The president just signed a secret law that makes it illegal to own a garden in your own backyard!",
  "EXPOSED! Big pharmaceutical companies are hiding the cure for every major disease inside a secret vault.",
  "The moon landing was completely faked in a movie studio and we have the leaked photos to prove it!",
  "Warning! A massive asteroid is heading straight for Earth next week and the government is hiding in secret bunkers.",
  "Disgusting! Radical teachers are forcing innocent children to pledge allegiance to a foreign flag.",
  "Secret documents just revealed that the billionaire elites are building a robot army to replace every human worker.",
  "ABSOLUTE TREASON! The former director of intelligence was just caught selling our codes to foreign dictators!"
]

const realNewsExamples = [
  "The city council voted unanimously on Thursday to approve a new budget that increases funding for public schools.",
  "A recent study published by the national health institute indicates that regular exercise reduces the risk of heart disease.",
  "Officials reported that the massive wildfire in the northern valley is now eighty percent contained.",
  "The technology company announced a complete restructuring of its executive board following a decline in revenue.",
  "International leaders gathered in the capital today to discuss new trade agreements aimed at stabilizing the supply chain.",
  "Police have launched a formal investigation into the bank robbery that occurred downtown yesterday afternoon.",
  "The national weather service issued a severe storm warning for the coastal regions, advising residents to prepare.",
  "Construction on the new public transit line is scheduled to begin next month to reduce traffic congestion.",
  "Following weeks of careful negotiation, the two rival corporations have officially signed a merger agreement.",
  "Health authorities confirmed that the new vaccination program has successfully reached over two million citizens."
]

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
    <div className="flex-1 flex flex-col md:flex-row w-full overflow-hidden">
      
      {/* Left Section - Flat Green Background */}
      <div className="w-full md:w-1/2 bg-emerald-700 flex flex-col overflow-hidden h-[calc(100vh-70px)]">
        
        {/* Banner explaining the scope */}
        <div className="bg-emerald-900 text-white p-8 shrink-0">
          <h2 className="text-2xl font-extrabold mb-2 uppercase tracking-widest text-emerald-300">Model Capability</h2>
          <p className="text-base leading-relaxed opacity-90 font-medium">
            This analytical tool is specifically trained to detect highly emotional, sensationalist fake news and distinguish it from neutral, professional journalism. It strictly evaluates linguistic patterns rather than performing live web searches.
          </p>
        </div>

        {/* Scrolling Lists Container */}
        <div className="flex-1 flex flex-col sm:flex-row p-8 overflow-hidden gap-8">
          
          {/* Fake News List */}
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Emotional Style</h3>
            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
              {fakeNewsExamples.map((item, idx) => (
                <div key={idx} className="bg-emerald-800 p-4 text-emerald-50 text-sm font-medium leading-relaxed">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Real News List */}
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Professional Style</h3>
            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
              {realNewsExamples.map((item, idx) => (
                <div key={idx} className="bg-emerald-800 p-4 text-emerald-50 text-sm font-medium leading-relaxed">
                  {item}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Right Section - Input Field */}
      <div className="w-full md:w-1/2 bg-gray-50 flex flex-col items-center justify-center p-8 overflow-y-auto h-[calc(100vh-70px)]">
        <div className="w-full max-w-lg">
          <div className="mb-10 text-left">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Analyze News.
            </h1>
            <p className="text-gray-600 text-lg font-medium">
              Paste an article below to evaluate its stylistic pattern.
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
              placeholder="Enter article text here..."
              rows={8}
              className="w-full bg-white border-2 border-gray-200 text-gray-800 text-base font-medium px-5 py-4 resize-none outline-none focus:border-emerald-600 transition-colors"
            />

            <button
              onClick={handleSubmit}
              disabled={loading || !text.trim()}
              className="mt-4 w-full bg-emerald-600 text-white text-base font-bold py-4 transition-colors hover:bg-emerald-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed uppercase tracking-widest"
            >
              {loading ? 'Processing...' : 'Run Analysis'}
            </button>
          </div>

          {result && (
            <div className={`mt-8 px-6 py-6 border-l-4 ${isFake ? 'border-red-600 bg-white' : 'border-emerald-600 bg-white'} shadow-sm`}>
              <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Prediction Result</p>
              <p className={`text-4xl font-extrabold mb-1 ${isFake ? 'text-red-600' : 'text-emerald-600'}`}>
                {result.prediction}
              </p>
              <p className="text-base font-medium text-gray-500 mt-2">
                Confidence Level: {result.confidence}%
              </p>
            </div>
          )}

          {error && (
            <div className="mt-8 px-6 py-6 border-l-4 border-red-600 bg-white shadow-sm">
              <p className="text-base font-bold text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
