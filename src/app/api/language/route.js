import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const language = searchParams.get('q5'); // Get language

    try {
        const res = await fetch("https://restcountries.com/v3.1/all")
        const data = await res.json();

        const matchingCountries = data.filter(country =>
            country.languages && Object.values(country.languages).includes(language)
        );

        const countryNames = matchingCountries.map(country => country.name.common);

        countryNames.sort();
        return NextResponse.json(countryNames);
    } catch (error) {
        console.error("Error fetching language data:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}