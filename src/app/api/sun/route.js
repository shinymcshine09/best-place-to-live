import { NextResponse } from 'next/server';
import wiki from 'wikijs';
import * as cheerio from 'cheerio';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const hoursOfSun = parseFloat(searchParams.get('q3')) || 0; // Convert to number
    const countryName = searchParams.get('country').replace('%20', ' '); // Get country name

    // console.log("Country name:", countryName);

    let countrysSunHours = [];;

    try {
        const page = await wiki().page('List of cities by sunshine duration');
        const html = await page.html(); // Get raw HTML

        const $ = cheerio.load(html); // Load into Cheerio

        let countries = [];

        // Select the Wikipedia tables
        for (let i = 0 ; i  < 6 ; i++) { // Loop through the first 6 tables
            parseAllTables($, i, countries, hoursOfSun, countryName, countrysSunHours);
        }

        if (countrysSunHours) {
            // console.log("Country's sun hours:", countrysSunHours);

            const average = countrysSunHours.reduce((sum, num) => sum + num, 0) / countrysSunHours.length;
            // console.log("Average sun hours:", average);
            return NextResponse.json(average);
        }

        countries.sort(); // Sort countries alphabetically
        const countriesSet = new Set(countries); // Remove duplicates


        return NextResponse.json([...countriesSet]);
    } catch (error) {
        console.error("Error fetching sun data:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Function to parse a table in the Wikipedia page
function parseAllTables($, i, countries, hoursOfSun, countryName, countrysSunHours) {
    $("table.wikitable").eq(i).find("tbody tr").each((index, element) => {
        const columns = $(element).find("td");

        if (columns.length > 1) { // Ensure it's not an empty row
            const country = $(columns[0]).text().trim(); // Clean country name

            const countriesSunHours = parseFloat($(columns[14]).text().replace(',', '')) || 0; // Extract and clean hours

            if (countryName && countryName == country) {
                countrysSunHours.push(countriesSunHours);
            }
            
            if (countriesSunHours > hoursOfSun - 1100 && countriesSunHours < hoursOfSun + 100) {
                countries.push(country); // Store only country name
            }
        }
    });
}