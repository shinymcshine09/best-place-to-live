'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Quiz() {
    const [ index, setIndex ] = useState(0);
    const [ answers, setAnswers ] = useState([0, 0, 0, 0, 0]);
    const router = useRouter();

    const questions = [
        "How much money (US Dollars) will you earn or want to earn in your new country?",
        "What is your favourite average temperature (°F)?",
        "Do you need snow to be happy?",
        "How many hours of sunshine do you want a year?",
        "How many mm of rain can you handle per year?",
        "What do you want the main language to be? (English, Spanish, French, etc.)",
    ];

    // Log answers whenever they change
    useEffect(() => {
        console.log(answers);
    }, [answers]);

    const updateAnswer = (e) => {
        const prev = [...answers];
        prev[index] = e.target.value;
        setAnswers(prev);
    }

    const handleSubmit = () => {
        const queryString = answers.map((a, i) => `q${i}=${encodeURIComponent(a)}`).join("&");
        router.push(`/results?${queryString}`); // Navigate to results page with answers
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] background-quiz">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start border-2 border-solid border-[#9f9f9f] rounded-lg p-8 shadow-md bg-[#ffffff] dark:bg-[#1e1e1e] dark:border-[#4a4a4a] max-w-3xl min-w-3xl">
                <h1 className="text-2xl font-bold mx-auto">Quiz</h1>
                <p className="font-bold">Question {index + 1}:</p>
                <p>{questions[index]}</p>
                {index === 0 &&
                    <select
                        value={answers[0]}
                        onChange={(e) => {
                            updateAnswer(e);
                        }}
                    >
                        <option value="10000">$10,000</option>
                        <option value="20000">$20,000</option>
                        <option value="30000">$30,000</option>
                        <option value="40000">$40,000</option>
                        <option value="50000">$50,000</option>
                        <option value="60000">$60,000</option>
                        <option value="70000">$70,000</option>
                        <option value="80000">$80,000</option>
                        <option value="90000">$90,000</option>
                        <option value="100000">$100,000</option>
                        <option value="100000+">$100,000+</option>
                    </select>
                }
                {index === 1 &&
                    <select
                    value={answers[1]}
                        onChange={(e) => {
                            updateAnswer(e);
                        }}
                    >
                        <option value="0">0 °F (-17.8 °C)</option>
                        <option value="10">10 °F (-12.2 °C) </option>
                        <option value="20">20 °F (-6.7 °C)</option>
                        <option value="30">30 °F (-1.1 °C)</option>
                        <option value="40">40 °F (4.4 °C)</option>
                        <option value="50">50 °F (10 °C)</option>
                        <option value="60">60 °F (15.6 °C)</option>
                        <option value="70">70 °F (21.1 °C)</option>
                        <option value="80">80 °F (26.7 °C)</option>
                        <option value="90">90 °F (32.2 °C)</option>
                        <option value="100">100 °F (37.8 °C)</option>
                    </select>
                }
                {index === 2 &&
                    <select
                        value={answers[2]}
                        onChange={(e) => {
                            updateAnswer(e);
                        }}
                    >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                }
                {index === 3 && 
                    <div>
                        <label className="me-2 flex items-start">
                            <input 
                                type="radio" 
                                name="sunshine" 
                                value="2000"
                                className="mt-1 mr-2"
                                checked={answers[3] === "2000"}
                                onChange={(e) => {
                                    updateAnswer(e);
                                }}
                            />
                            I don’t mind cloudy weather (Less than 2000 hours, less than 100 days)
                        </label><br/>

                        <label className="me-2 flex items-start">
                            <input 
                                type="radio" 
                                name="sunshine" 
                                value="3000"
                                className="mt-1 mr-2"
                                checked={answers[3] === "3000"}
                                onChange={(e) => {
                                    updateAnswer(e);
                                }}
                            />
                            I like a mix of sun and clouds (between 2000-3000 hours, 100-200 days)
                        </label><br/>

                        <label className="me-2 flex items-start">
                            <input 
                                type="radio" 
                                name="sunshine" 
                                value="4000"
                                className="mt-1 mr-2"
                                checked={answers[3] === "4000"}
                                onChange={(e) => {
                                    updateAnswer(e);
                                }}
                            />
                            I prefer mostly sunny weather (Between 3000-4000 hours, 200-275 days)
                        </label><br/>

                        <label className="me-2 flex items-start">
                            <input 
                                type="radio" 
                                name="sunshine" 
                                value="5000"
                                className="mt-1 mr-2"
                                checked={answers[3] === "5000"}
                                onChange={(e) => {
                                    updateAnswer(e);
                                }}
                            />
                            I want sunshine almost all year round (More than 4000 hours, more than 275 days)
                        </label>
                    </div>
                }
                {index === 4 &&
                    <div>
                        <label className="me-2 flex items-start">
                            <input 
                                type="radio" 
                                name="rain" 
                                value="0"
                                className="mt-1 mr-2"
                                checked={answers[4] === "0"}
                                onChange={(e) => {
                                    updateAnswer(e);
                                }}
                            />
                            I don’t mind a little rain (0-1000mm, less than 50 days)
                        </label><br/>

                        <label className="me-2 flex items-start">
                            <input 
                                type="radio" 
                                name="rain" 
                                value="1000"
                                className="mt-1 mr-2"
                                checked={answers[4] === "1000"}
                                onChange={(e) => {
                                    updateAnswer(e);
                                }}
                            />
                            I like a mix of rainy and dry days (1000-2000mm, 50-100 days)
                        </label><br/>

                        <label className="me-2 flex items-start">
                            <input 
                                type="radio" 
                                name="rain" 
                                value="2000"
                                className="mt-1 mr-2"
                                checked={answers[4] === "2000"}
                                onChange={(e) => {
                                    updateAnswer(e);
                                }}
                            />
                            I prefer mostly rainy weather (2000-3000mm, 100-150 days)
                        </label><br/>

                        <label className="me-2 flex items-start">
                            <input 
                                type="radio" 
                                name="rain" 
                                value="3000"
                                className="mt-1 mr-2"
                                checked={answers[4] === "3000"}
                                onChange={(e) => {
                                    updateAnswer(e);
                                }}
                            />
                            I want rain as much as possible (3000mm+, more than 150 days)
                        </label>
                    </div>
                }
                {index === 5 &&
                    <div>
                        <label>
                            Language: 
                            <input
                                type="text"
                                name="language"
                                value={answers[5] !== 0 ? answers[5] : ""}
                                className="border-2 border-gray-300 rounded-md p-2 ms-2"
                                onChange={(e) => {
                                    updateAnswer(e);
                                }}
                            />
                        </label><br/>
                    </div>
                }
                <div className="flex justify-between w-full">
                    {index > 0 ? <button className="btn" onClick={() => setIndex(index - 1)}>Previous</button> : <div/>}
                    {index < questions.length - 1 ? <button className="btn" onClick={() => {
                        if (answers[index] === 0 && index === 0) {
                            updateAnswer({ target: { value: 10000 } });
                            setIndex(index + 1);
                        }
                        else if (answers[index] === 0 && index === 1) {
                            updateAnswer({ target: { value: 0 } });
                            setIndex(index + 1);
                        }
                        else if (answers[index] === 0 && index === 2) {
                            updateAnswer({ target: { value: 0 } });
                            setIndex(index + 1);
                        }
                        else if (answers[index] === 0) {
                            alert("Please select an answer");
                            return;
                        }
                        else {
                            setIndex(index + 1)
                        }
                    }}>
                        Next
                    </button> :
                    <button
                        className="btn" 
                        onClick={() => {
                            if (answers[index] === 0) {
                                alert("Please select an answer");
                                return;
                            }
                            else {
                                // alert("Quiz complete! Answers: " + answers);
                                handleSubmit();
                            }
                        }}
                    >
                        Get the results.
                    </button>
                }
                </div>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
        </div>
    )
}