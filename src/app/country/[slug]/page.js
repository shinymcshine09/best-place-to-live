import { notFound } from 'next/navigation';
import Image from 'next/image';
import wiki from 'wikijs';

export async function generateMetadata({ params }) {
    const param = await params;

    const country = decodeURIComponent(param.slug);

    return {
        title: country,
        description: `Information about ${country}.`,
    };
}

export default async function CountryPage({ params }) {
    const param = await params;

    const slug = param.slug;

    // console.log("Slug:", slug);

    let countryData;

    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${slug}?fullText=true`);
        if (!res.ok) throw new Error('Country not found');
    
        const data = await res.json();
        
        countryData = data[0]; // first match
    } 
    catch (err) {
        console.error("Error fetching country data:", err);
        notFound(); // triggers 404 page
    }


    let avWage;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wage?country=${slug}`);
        if (!res.ok) throw new Error('Wage not found');

        const data = await res.json();

        avWage = data[0]; // first match
    }
    catch (err) {
        console.error("Error fetching wage data:", err);
    }


    let avTemp;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/temp?country=${slug}`);
        if (!res.ok) throw new Error('Temperature not found');

        const data = await res.json();

        avTemp = data;
    }
    catch (err) {
        console.error("Error fetching temp data:", err);
    }

    let sunHours;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sun?country=${slug}`);
        if (!res.ok) throw new Error('Sun hours not found');

        const data = await res.json();

        sunHours = data;
    }
    catch (err) {
        console.error("Error fetching sun hour data:", err);
    }

    let rainFall;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rain?country=${slug}`);
        if (!res.ok) throw new Error('Annual rainfall not found');

        const data = await res.json();

        rainFall = data;
    }
    catch (err) {
        console.error("Error fetching annual rainfall data:", err);
    }

    let intro;

    try {
        const page = await wiki().page(`${decodeURIComponent(slug)}`);
        const summary = await page.summary(); // Get raw content

        const firstParagraph = summary.split('\n').find(p => p.trim() !== '') || '';

        intro = firstParagraph;
    } catch (error) {
        console.error("Error fetching wiki summary:", error);
    }

    let imageUrls;

    try {
        let parsedSlug = slug.replace("%20", "_");

        if (parsedSlug === "United_States") {
            imageUrls = ['https://images.unsplash.com/photo-1586116177830-d58010188987?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'];
        }
        else if (parsedSlug === "Japan") {
            imageUrls = ['https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'];
        }
        else if (parsedSlug === "France") {
            imageUrls = ['https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'];
        }
        else if (parsedSlug === "United_Kingdom") {
            imageUrls = ['https://plus.unsplash.com/premium_photo-1733248830850-c2d1e7af9263?q=80&w=1943&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'];
        }
        else {
            const res = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:Views_of_${parsedSlug}&cmlimit=50&origin=*`);
            if (!res.ok) throw new Error('Category not found');

            const data = await res.json();
            const members = data.query?.categorymembers || [];

            const imageTitles = members
                .filter(item => item.title.startsWith("File:"))
                .map(item => item.title);

            const titlesParam = imageTitles.map(encodeURIComponent).join('|');
            const imageInfoRes = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url&titles=${titlesParam}&origin=*`);
            const imageInfoData = await imageInfoRes.json();

            const pages = imageInfoData.query?.pages || {};

            imageUrls = Object.values(pages)
                .map(page => page.imageinfo?.[0]?.url)
                .filter(Boolean); // Remove any undefined values
        }

    } catch (err) {
        console.error("Error fetching wiki images:", err);
    }

    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
            style={{
                backgroundImage: `url(${imageUrls.length > 0 ? imageUrls[Math.floor(Math.random() * imageUrls.length)] : 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                }}
        >
            <main className="my-auto flex flex-col gap-8 row-start-2 border-2 border-solid border-[#9f9f9f] dark:border-[#4a4a4a] rounded-lg p-8 bg-[#ffffff] dark:bg-[#1e1e1e] shadow-md max-w-3xl mx-auto">
                <Image
                    className='mx-auto border-2 border-solid border-[#9f9f9f] dark:border-[#4a4a4a] rounded-lg'
                    src={countryData.flags.png}
                    alt={countryData.flags.alt || `${countryData.name.common} flag`}
                    width={200}
                    height={100}
                />
                <h1 className='text-center text-2xl font-bold'>{countryData.name.official}</h1>
                <div className='grid grid-cols-2 gap-4'>
                    <p>Capital: {countryData.capital}</p>
                    <p>Population: {countryData.population.toLocaleString()}</p>
                    <p>Region: {countryData.region}</p>
                    <p>
                        Currency: {countryData.currencies
                            ? Object.values(countryData.currencies).map((currency) => currency.name).join(', ')
                            : 'N/A'}
                    </p>
                    <p>
                        Language: {countryData.languages
                            ? Object.values(countryData.languages).join(', ')
                            : 'N/A'}
                    </p>
                    <p>
                        Average annual Wage: {avWage ? "$" + avWage.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }) : 'N/A'}
                    </p>
                    <p>
                        Average temperature: {avTemp ? `${avTemp.fahrenheit} F° (${avTemp.celsius} C°)`: 'N/A'}
                    </p>
                    <p>
                        Sun hours annually: {sunHours.length > 0 ? sunHours.toLocaleString(undefined, { maximumFractionDigits: 0 }) : 'N/A'}
                    </p>
                    <p>
                        Annual rainfall: {rainFall ? rainFall.toLocaleString(undefined, { maximumFractionDigits: 0 }) + " mm" : 'N/A'}
                    </p>
                </div>
                <p className=''>About: {intro}</p>
            </main>
        </div>
    );
}