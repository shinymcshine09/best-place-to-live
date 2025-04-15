import Link from "next/link";

export default function Home() {

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] background-home">
            <main className="flex flex-col gap-8 row-start-2 items-center border-2 border-solid border-[#9f9f9f] dark:border-[#4a4a4a] rounded-lg p-8 bg-[#ffffff] dark:bg-[#1e1e1e] shadow-md">
              <h1>
                Find out the best place to live in the World for you!
              </h1>
              <p>Improve your quality of life.</p>
              <Link href="/quiz" className="mx-auto button btn">
                Start Quiz
              </Link>
            </main>
        </div>
    );
}