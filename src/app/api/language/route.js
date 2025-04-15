import { NextResponse } from 'next/server';
import wiki from 'wikijs';
import * as cheerio from 'cheerio';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const language = searchParams.get('q5'); // Get language

    try {
        const page = await wiki().page('List of official languages by country and territory');
        const html = await page.html(); // Get raw HTML
        const $ = cheerio.load(html); // Load into Cheerio

        let countries = [];

        // Select the first Wikipedia table
        $("table.wikitable").eq(0).find("tbody tr").each((index, element) => {
            const columns = $(element).find("td");

            if (columns.length > 1) {
                let country = $(columns[0]).text().trim().replace(/\[[^\]]+\]/g, ''); // Clean country name
                
                // Special case for "United Kingdom and Crown dependencies"
                if (country.startsWith("United Kingdom")) {
                    country = "United Kingdom";
                }

                const countriesLanguagesRaw = ($(columns[2]).text()) || '';
                const countriesLanguages = countriesLanguagesRaw.split(',').map(lang => lang.trim());

                if (countriesLanguages.some(lang => lang.toLowerCase() === language.toLowerCase())) {
                    countries.push(country); // Store only country name
                }
            }
        });

        return NextResponse.json(countries);
    } catch (error) {
        console.error("Error fetching language data:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}