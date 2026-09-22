export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col items-center py-20 px-8 bg-gray-50 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white p-12 shadow-sm border border-gray-200">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-8 tracking-tight">Project Architecture</h1>
        
        <div className="space-y-8 text-gray-700 leading-relaxed text-lg font-medium">
          <p>
            TruthLens is a high performance machine learning application designed to classify textual patterns. It demonstrates the immense power of deploying Small Language Models in a fully local environment.
          </p>
          
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-wide">The Engineering</h2>
            <p>
              This application is powered by a locally hosted RoBERTa model. By serving the artificial intelligence entirely on a Python backend, the system guarantees complete data privacy, eliminates cloud API costs, and delivers lightning fast inference speeds directly to the frontend.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-wide">Model Capability</h2>
            <p>
              This specific model was trained meticulously on the ISOT dataset. Rather than querying the internet to verify real world facts, the model acts as a highly advanced stylistic analyzer. It has mathematically learned to distinguish between the sensationalist, highly emotional writing patterns commonly found in fake internet blogs, and the dry, neutral grammar utilized in professional journalism. 
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-wide">The Vision</h2>
            <p>
              This project serves as a foundational blueprint for edge computing and natural language processing. It proves that incredibly sophisticated linguistic analysis can be performed securely and rapidly without relying on massive external data centers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
