import { NextResponse } from 'next/server';
import wiki from 'wikijs';
import * as cheerio from 'cheerio';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const avgRainfall = parseFloat(searchParams.get('q4')) || 0; // Get average rainfall
    const countryName = searchParams.get('country'); // Get country name

    console.log("Country name:", countryName);

    let countryNameRainfall = [];

    try {
        const page = await wiki().page('List of countries by average annual precipitation');
        const html = await page.html(); // Get raw HTML
        const $ = cheerio.load(html); // Load into Cheerio

        let countries = [];

        // Select the first Wikipedia table
        $("table.wikitable").eq(0).find("tbody tr").each((index, element) => {
            const columns = $(element).find("td");

            if (columns.length > 1) { // Ensure it's not an empty row
                const country = $(columns[1]).text().trim(); // Clean country name

                const countriesRainfall = parseFloat($(columns[2]).text().replace(',', '')) || 0; // Extract and clean rainfall


                if (countryName && countryName == country) {
                    countryNameRainfall.push(countriesRainfall);
                }

                if (countriesRainfall > avgRainfall - 100 && countriesRainfall < avgRainfall + 1100) {
                    countries.push(country); // Store only country name
                }
            }
        });

        if (countryNameRainfall) {
            return NextResponse.json(countryNameRainfall);
        }

        countries.sort(); // Sort countries alphabetically

        return NextResponse.json(countries);
    } catch (error) {
        console.error("Error fetching rain data:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}