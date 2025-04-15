'use client'

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Results() {
    const [wageData, setWageData] = useState([]);
    const [tempData, setTempData] = useState([]);
    const [sunData, setSunData] = useState([]);
    const [rainData, setRainData] = useState([]);
    const [langData, setLangData] = useState([]);
    const [snowData, setSnowData] = useState([]);

    const [wageLoading, setWageLoading] = useState(true);
    const [tempLoading, setTempLoading] = useState(true);
    const [sunLoading, setSunLoading] = useState(true);
    const [rainLoading, setRainLoading] = useState(true);
    const [langLoading, setLangLoading] = useState(true);
    const [snowLoading, setSnowLoading] = useState(true);

    const [showLessExactMatch, setShowLessExactMatch] = useState(false);

    const searchParams = useSearchParams();

    const q0 = searchParams.get("q0");
    const q1 = searchParams.get("q1");
    const q2 = searchParams.get("q2");
    const q3 = searchParams.get("q3");
    const q4 = searchParams.get("q4");
    const q5 = searchParams.get("q5");

    useEffect(() => {
        const fetchWages = async () => {

            try {
                const response = await fetch(`/api/wage?q0=${q0}`);
                if (!response.ok) throw new Error("Failed to fetch wage data");
                const result = await response.json();
                setWageData(result);
            } catch (err) {
                console.error("Error fetching wage data:", err);
            }
            setWageLoading(false);
        };
        setWageLoading(true);
        fetchWages();
    }, [q0]);

    useEffect(() => {
        const fetchTemps = async () => {

            try {
                const response = await fetch(`/api/temp?q1=${q1}`);
                if (!response.ok) throw new Error("Failed to fetch temp data");
                const result = await response.json();
                setTempData(result);
            } catch (err) {
                console.error("Error fetching temp data:", err);
            }
            setTempLoading(false);
        };
        setTempLoading(true);
        fetchTemps();
        
    }, [q1]);

    useEffect(() => {
        const fetchSnow = async () => {

            try {
                const response = await fetch(`/api/snow?q2=${q2}`);
                if (!response.ok) throw new Error("Failed to fetch snow data");
                const result = await response.json();
                setSnowData(result);
            } catch (err) {
                console.error("Error fetching snow data:", err);
            }
            setSnowLoading(false);
        };
        setSnowLoading(true);
        fetchSnow();
        
    }, [q2]);

    useEffect(() => {
        const fetchSun = async () => {

            try {
                const response = await fetch(`/api/sun?q3=${q3}`);
                if (!response.ok) throw new Error("Failed to fetch sun data");
                const result = await response.json();
                setSunData(result);
            } catch (err) {
                console.error("Error fetching sun data:", err);
            }
            setSunLoading(false);
        };
        setSunLoading(true);
        fetchSun();
        
    }, [q3]);

    useEffect(() => {
        const fetchRain = async () => {

            try {
                const response = await fetch(`/api/rain?q4=${q4}`);
                if (!response.ok) throw new Error("Failed to fetch rain data");
                const result = await response.json();
                setRainData(result);
            } catch (err) {
                console.error("Error fetching rain data:", err);
            }
            setRainLoading(false);
        };
        setRainLoading(true);
        fetchRain();
        
    }, [q4]);

    useEffect(() => {
        const fetchLang = async () => {

            try {
                const response = await fetch(`/api/language?q5=${q5}`);
                if (!response.ok) throw new Error("Failed to fetch language data");
                const result = await response.json();
                setLangData(result);
            } catch (err) {
                console.error("Error fetching language data:", err);
            }
            setLangLoading(false);
        };
        setLangLoading(true);
        fetchLang();
        
    }, [q5]);

    function setLessExactMatch() {
        setShowLessExactMatch(!showLessExactMatch);
    }

    if (wageLoading || tempLoading || sunLoading || rainLoading || langLoading || snowLoading) {
        return (
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <main className="flex flex-col gap-8 row-start-2 items-center border-2 border-solid border-[#9f9f9f] dark:border-[#4a4a4a] rounded-lg p-8 bg-[#ffffff] dark:bg-[#1e1e1e] shadow-md">
                    <p>Loading...</p>
                </main>
            </div>
        );
    }

    let exactMatches = [];

    wageData.filter(country => tempData.includes(country) && sunData.includes(country) && rainData.includes(country) && langData.includes(country) && snowData.includes(country)).map((country => {
        exactMatches.push(country);
    }));

    
    const allCountries = [...wageData, ...tempData, ...sunData, ...rainData, ...langData, ...snowData];

    // Count occurrences of each country
    const countryCounts = allCountries.reduce((acc, country) => {
        acc[country] = (acc[country] || 0) + 1;
        return acc;
    }, {});

    // Convert object to an array and sort by count (descending)
    const sortedCountries = Object.entries(countryCounts)
        .sort((a, b) => b[1] - a[1]) // Sort by highest occurrence


    // Get the highest match count
    let highestMatch = sortedCountries.length > 0 ? sortedCountries[0][1] : 0;

    if (exactMatches.length > 0) {
        highestMatch = highestMatch - 1; // Decrease the highest match count by 1 if exact matches exist
    }

    // Filter to only include countries with the highest match count
    const topCountries = sortedCountries.filter(([_, count]) => count === highestMatch);


    let missingCriteria = [];

    for (let i = 0; i < topCountries.length ; i++) {
        let missingData = [];
        if (!wageData.includes(topCountries[i][0])) {
            missingData.push('Wage');
        }
        if (!tempData.includes(topCountries[i][0])) {
            missingData.push('Temperature');
        }
        if (!sunData.includes(topCountries[i][0])) {
            missingData.push('Sun');
        }
        if (!rainData.includes(topCountries[i][0])) {
            missingData.push('Rain');
        }
        if (!langData.includes(topCountries[i][0])) {
            missingData.push('Language');
        }
        if (!snowData.includes(topCountries[i][0])) {
            missingData.push('Snow');
        }
        missingCriteria.push([topCountries[i][0], missingData]);
    }

    missingCriteria.sort();

    // console.log("Missing Criteria: ", missingCriteria);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center border-2 border-solid border-[#9f9f9f] dark:border-[#4a4a4a] rounded-lg p-8 bg-[#ffffff] dark:bg-[#1e1e1e] shadow-md">
                <h1 className="text-2xl font-bold text-center">Results</h1>
                {exactMatches.length > 0 &&
                    <div>
                        <p>Countries that exactly match your criteria:</p><br/>
                        <ul>
                            {exactMatches.map((country, index) => (
                                <a href={`/country/${country}`} target="_blank" rel="noopener noreferrer" key={index} >
                                    <li 
                                        key={index}
                                        className="border-2 border-solid border-[#9f9f9f] dark:border-[#4a4a4a] rounded-lg p-4 mt-2 bg-[#ffffff] dark:bg-[#1e1e1e] shadow-md"
                                    >
                                        {country} {/* Adds commas for better formatting */}
                                    </li>
                                </a>
                            ))}
                        </ul><br/>
                        <div className="flex justify-center">
                            {!showLessExactMatch &&
                                <button className="btn" onClick={setLessExactMatch}>Show other less exact matches</button>
                            }
                            {showLessExactMatch &&
                                <button className="btn" onClick={setLessExactMatch}>Hide other matches</button>
                            }
                        </div>
                    </div>
                }
                {(exactMatches.length === 0) && 
                    <p>No countries match your exact criteria.</p>
                }
                {(exactMatches.length === 0 || showLessExactMatch) &&
                    <div>
                        <p className="text-center">Here are the countries that most match your criteria:</p><br/>
                        <hr className="border-t border-gray-300 my-4" />
                        <ul>
                            {missingCriteria.map(([country, missingData], index) => (
                                <a href={`/country/${country}`} target="_blank" rel="noopener noreferrer" key={index} >
                                    <li key={index}
                                        className="border-2 border-solid border-[#9f9f9f] dark:border-[#4a4a4a] rounded-lg p-4 mt-2 bg-[#ffffff] dark:bg-[#1e1e1e] shadow-md"
                                    >
                                        {country} (Not matching {missingData.length > 1 
                                            ? missingData.slice(0, -1).join(", ") + " and " + missingData[missingData.length - 1] 
                                            : missingData } criteria)
                                    </li>
                                </a>
                            ))}
                        </ul>
                    </div>
                }
            </main>
        </div>
    );
}