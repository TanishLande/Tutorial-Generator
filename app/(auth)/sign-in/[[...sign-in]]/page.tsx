import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Office workspace"
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />

          <div className="relative z-10 lg:p-12">
            <a className="block text-white" href="/">
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG Path */}
              </svg>
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Forge AI 🦑
            </h2>

            <p className="mt-4 leading-relaxed text-white">
              Effortlessly organize your learning journey with AI, as it sorts through videos and creates customized courses tailored to your topics of interest.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl flex items-center justify-center">
            {/* Centering the form */}
            <div className="flex items-center justify-center w-full">
              <SignIn />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
