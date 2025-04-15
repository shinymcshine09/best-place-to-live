import { NextResponse } from 'next/server';
import wiki from 'wikijs';
import * as cheerio from 'cheerio';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const avgTemp = parseFloat(searchParams.get('q1')) || 0; // Convert to number
    const countryName = searchParams.get('country'); // Get country name

    const avgTempC = (avgTemp - 32) * 5 / 9; // Convert to Celsius

    try {
        const page = await wiki().page('List of countries by average yearly temperature');
        const html = await page.html(); // Get raw HTML
        const $ = cheerio.load(html); // Load into Cheerio

        let countries = [];

        let matchedCountry = null;

        // Select the second Wikipedia table
        $("table.wikitable").eq(0).find("tbody tr").each((index, element) => {
            const columns = $(element).find("td");

            if (columns.length > 1) { // Ensure it's not an empty row
                const country = $(columns[1]).text().trim(); // Clean country name

                const countriesAverageTemp = parseFloat($(columns[2]).text()) || 0; // Extract and clean temp

                if (countryName && countryName == country) {
                    matchedCountry = countriesAverageTemp;
                }

                if (countriesAverageTemp > avgTempC - 5 && countriesAverageTemp < avgTempC + 5) {
                    countries.push(country); // Store only country name
                }
            }
        });

        if (matchedCountry) {
            return NextResponse.json(matchedCountry);
        } 

        countries.sort(); // Sort countries alphabetically
        return NextResponse.json(countries);
    } catch (error) {
        console.error("Error fetching wage data:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}