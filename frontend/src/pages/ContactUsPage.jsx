export default function ContactUsPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-8 bg-gray-50 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white p-12 shadow-sm border border-gray-200 text-center">
        
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Let Us Connect</h1>
        <p className="text-lg text-gray-600 font-medium mb-12">
          I built this project to explore the intersection of machine learning and modern web architecture. To discuss the engineering, ask questions, or collaborate, reach out via the channels below.
        </p>

        <div className="space-y-8">
          <div className="p-8 bg-gray-900 text-white">
            <h2 className="text-2xl font-extrabold mb-3">Direct Communication</h2>
            <p className="text-gray-300 font-medium mb-6">Reach out directly via email to discuss technical details.</p>
            <a 
              href="mailto:contact@example.com" 
              className="inline-block bg-white text-gray-900 font-extrabold py-3 px-8 hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm"
            >
              Send Mail
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <a 
              href="https://www.linkedin.com/in/kunal-verma-596a76287/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 px-6 py-4 border-2 border-gray-900 text-gray-900 font-extrabold hover:bg-gray-900 hover:text-white transition-colors uppercase tracking-widest text-sm"
            >
              LinkedIn Profile
            </a>
            <a 
              href="https://diariesofkunal.hashnode.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 px-6 py-4 border-2 border-emerald-600 text-emerald-600 font-extrabold hover:bg-emerald-600 hover:text-white transition-colors uppercase tracking-widest text-sm"
            >
              Hashnode Blog
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
