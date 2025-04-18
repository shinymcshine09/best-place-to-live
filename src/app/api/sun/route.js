import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const hoursOfSun = parseFloat(searchParams.get('q3')) || 0; // Convert to number
    let countryName = searchParams.get('country'); // Get country name

    if (countryName) {
        countryName = countryName.replace('/%20', ' '); // Decode URL-encoded spaces
    }

    let countrysSunHours = [];

    // Sample data for sunshine hours (muiltiple values for different cities)
    const sunshineData = [
        { country: "Algeria", sunshineHours: [2847.0, 3686.0] },
        { country: "Angola", sunshineHours: [2341.0] },
        { country: "Benin", sunshineHours: [2345.2, 2501.0, 3045.2] },
        { country: "Botswana", sunshineHours: [3330.0, 3371.0, 3579.0] },
        { country: "Burkina Faso", sunshineHours: [3136.0, 3282.0] },
        { country: "Burundi", sunshineHours: [2373.4] },
        { country: "Cameroon", sunshineHours: [2927.1, 2471.4, 1618.0, 1644.0] },
        { country: "Central African Republic", sunshineHours: [2095.0, 2998.0] },
        { country: "Chad", sunshineHours: [3205.5, 3500.9] },
        { country: "Congo", sunshineHours: [1915.0, 1574.0, 1607.0] },
        { country: "Democratic Republic of the Congo", sunshineHours: [1672.0, 2778.0] },
        { country: "Djibouti", sunshineHours: [3279.0] },
        { country: "Egypt", sunshineHours: [3579.5, 3541.8, 3943.4, 3530.7, 3958.0] },
        { country: "Equatorial Guinea", sunshineHours: [1921.2, 1176.7] },
        { country: "Eritrea", sunshineHours: [3361.0] },
        { country: "Ethiopia", sunshineHours: [3129.4, 2440.3] },
        { country: "Gabon", sunshineHours: [1716.6, 1723.8] },
        { country: "Gambia", sunshineHours: [3070.0] },
        { country: "Ghana", sunshineHours: [2432.0, 2718.7, 1951.8] },
        { country: "Guinea", sunshineHours: [2222.0, 2658.0] },
        { country: "Guinea-Bissau", sunshineHours: [2707.0] },
        { country: "Ivory Coast", sunshineHours: [1823.0, 2092.0, 2296.0, 2638.6, 2757.0] },
        { country: "Kenya", sunshineHours: [2932.0, 2492.3, 3114.2, 3582.0] },
        { country: "Libya", sunshineHours: [3187.0, 3169.2] },
        { country: "Madagascar", sunshineHours: [2277.8, 2410.4, 2626.2, 3039.0, 3223.2, 3610.0] },
        { country: "Malawi", sunshineHours: [2999.7, 2797.0, 2590.9] },
        { country: "Mali", sunshineHours: [3239.0, 3106.5, 2954.1] },
        { country: "Mauritania", sunshineHours: [3332.0, 3333.0] },
        { country: "Morocco", sunshineHours: [2918.8, 3131.2, 3416.4] },
        { country: "Mozambique", sunshineHours: [2838.0] },
        { country: "Namibia", sunshineHours: [3870.0, 3605.0] },
        { country: "Niger", sunshineHours: [3203.2] },
        { country: "Nigeria", sunshineHours: [1845.4, 2380.0, 2768.0, 3114.0, 3238.0] },
        { country: "Senegal", sunshineHours: [3078.0, 3214.0] },
        { country: "Somalia", sunshineHours: [3082.0, 3124.0] },
        { country: "South Africa", sunshineHours: [3220.0, 3094.0, 3124.4, 3312.3, 3731.8, 2365.4] },
        { country: "South Sudan", sunshineHours: [2753.5, 2929.1] },
        { country: "Sudan", sunshineHours: [3382.0, 3737.1] },
        { country: "Tanzania", sunshineHours: [2815.0, 2838.0, 3143.0, 3335.4] },
        { country: "Togo", sunshineHours: [2333.9, 2826.0] },
        { country: "Tunisia", sunshineHours: [2808.4, 3291.5] },
        { country: "Uganda", sunshineHours: [2210.0, 2398.0] },
        { country: "Zambia", sunshineHours: [2793.9, 2935.7, 3166.8] },
        { country: "Zimbabwe", sunshineHours: [3010.9, 3119.9] },
        { country: "Afghanistan", sunshineHours: [3175.1, 2576.6, 3375.8, 2652.3] },
        { country: "Lebanon", sunshineHours: [2940.0] },
        { country: "Bangladesh", sunshineHours: [2435.1] },
        { country: "China", sunshineHours: [2670.8, 1073.3, 983.2, 1607.1, 1628.0, 1835.6, 2990.2, 1773.9, 1926.9, 1910.0, 2489.9, 1775.8, 2375.2, 2523.3, 1775.8, 1853.2] },
        { country: "India", sunshineHours: [2684.6, 2107.5, 2583.5, 2361.0, 2848.5] },
        { country: "Indonesia", sunshineHours: [2666.6, 2983.3, 2849.0, 1587.7] },
        { country: "Iran", sunshineHours: [3242.3, 2287.0, 3279.8, 2904.3, 1636.9, 2794.3, 2826.1] },
        { country: "Iraq", sunshineHours: [3240.8] },
        { country: "Israel", sunshineHours: [3311.0] },
        { country: "Japan", sunshineHours: [1740.4, 1836.9, 1876.7, 1714.1, 2141.0] },
        { country: "Jordan", sunshineHours: [3289.7] },
        { country: "Kazakhstan", sunshineHours: [2356.0, 2507.0] },
        { country: "Mongolia", sunshineHours: [2791.5] },
        { country: "North Korea", sunshineHours: [2492.0] },
        { country: "Oman", sunshineHours: [3493.3] },
        { country: "Pakistan", sunshineHours: [2952.9, 2950.3, 3034.0, 3341.25] },
        { country: "Philippines", sunshineHours: [2103.1] },
        { country: "Russia", sunshineHours: [1164.3, 2142.0, 2201.0, 1872.4, 2096.0, 2227.6] },
        { country: "Saudi Arabia", sunshineHours: [3248.2, 3224.8] },
        { country: "Singapore", sunshineHours: [2022.4] },
        { country: "South Korea", sunshineHours: [2327.3, 2066.0] },
        { country: "Sri Lanka", sunshineHours: [2621.3] },
        { country: "Taiwan", sunshineHours: [2212.2, 2043.2, 1373.8] },
        { country: "Thailand", sunshineHours: [2623.8, 2512.2, 1567.8, 1996.3] },
        { country: "Turkey", sunshineHours: [2449.6, 2603.2, 2622.1, 1525.6] },
        { country: "United Arab Emirates", sunshineHours: [3508.7] },
        { country: "Uzbekistan", sunshineHours: [2520.9, 2823.9] },
        { country: "Vietnam", sunshineHours: [2238.0, 2182.0, 1488.5, 2489.0] },
        { country: "Albania", sunshineHours: [2544] },
        { country: "Armenia", sunshineHours: [2474] },
        { country: "Austria", sunshineHours: [2048] },
        { country: "Belarus", sunshineHours: [1807] },
        { country: "Azerbaijan", sunshineHours: [2207.4, 2012.2] },
        { country: "Belgium", sunshineHours: [1546] },
        { country: "Bosnia and Herzegovina", sunshineHours: [1769] },
        { country: "Bulgaria", sunshineHours: [2177] },
        { country: "Croatia", sunshineHours: [1913, 2631] },
        { country: "Czech Republic", sunshineHours: [1668] },
        { country: "Cyprus", sunshineHours: [3314.1] },
        { country: "Denmark", sunshineHours: [1821, 1912, 2063] },
        { country: "Estonia", sunshineHours: [1923, 2066] },
        { country: "Faroe Islands", sunshineHours: [1002.1] },
        { country: "Finland", sunshineHours: [1838] },
        { country: "France", sunshineHours: [2002, 2836, 2760.5, 1717, 2075] },
        { country: "Georgia", sunshineHours: [2046] },
        { country: "Germany", sunshineHours: [1626, 1662] },
        { country: "Greece", sunshineHours: [2773] },
        { country: "Hungary", sunshineHours: [1988] },
        { country: "Iceland", sunshineHours: [1326] },
        { country: "Ireland", sunshineHours: [1453] },
        { country: "Italy", sunshineHours: [2726, 1915, 2375, 2473] },
        { country: "Latvia", sunshineHours: [1754] },
        { country: "Lithuania", sunshineHours: [1691] },
        { country: "Luxembourg", sunshineHours: [1634] },
        { country: "Malta", sunshineHours: [3054] },
        { country: "Moldova", sunshineHours: [2126] },
        { country: "Monaco", sunshineHours: [2575] },
        { country: "Montenegro", sunshineHours: [2481, 2481] },
        { country: "Netherlands", sunshineHours: [1662, 1662] },
        { country: "North Macedonia", sunshineHours: [2339] },
        { country: "Norway", sunshineHours: [1187, 1668, 1265] },
        { country: "Poland", sunshineHours: [1997] },
        { country: "Portugal", sunshineHours: [3036, 2806, 2468] },
        { country: "Romania", sunshineHours: [2115] },
        { country: "Russia", sunshineHours: [1901, 2178] },
        { country: "Serbia", sunshineHours: [2112, 1998] },
        { country: "Slovakia", sunshineHours: [2038] },
        { country: "Slovenia", sunshineHours: [1974] },
        { country: "Spain", sunshineHours: [2010, 2994, 2591, 3024, 2769, 3279.3, 2696] },
        { country: "Sweden", sunshineHours: [1762, 1803] },
        { country: "Switzerland", sunshineHours: [1566, 1887, 2158, 2120] },
        { country: "Turkey", sunshineHours: [2218] },
        { country: "Ukraine", sunshineHours: [1955] },
        { country: "United Kingdom", sunshineHours: [1427, 1265, 1633] },
        { country: "Canada", sunshineHours: [2396.3, 1799.5, 2344.8, 1476.8, 2051.0, 1242.1, 2066.4, 1937.6, 1827.1, 2352.9] },
        { country: "Honduras", sunshineHours: [2259.8] },
        { country: "Mexico", sunshineHours: [3148, 2555, 2239, 2443] },
        { country: "Nicaragua", sunshineHours: [2759.9] },
        { country: "Panama", sunshineHours: [1743.5] },
        { country: "Puerto Rico", sunshineHours: [2963.8] },
        { country: "El Salvador", sunshineHours: [2957] },
        { country: "Saint Pierre and Miquelon", sunshineHours: [1427.3] },
        { country: "United States", sunshineHours: [
            3415.4, 2061.2, 2738.3, 2643.7, 2581.7, 2993.4, 2633.6, 2821.0,
            2508.4, 2280.0, 2182.6, 2849.7, 3106.6, 2435.9, 3762.5, 3564.2,
            3035.9, 2577.9, 2440.4, 2879.7, 2809.9, 3825.3, 3254.2, 2514.4,
            2888.3, 3154.0, 2483.6, 2710.7, 2510.1, 2648.9, 2534.7, 2036.3,
            3089.4, 2726.9, 2498.4, 3871.6, 2021.3, 2340.9, 2606.3, 2829.0,
            3607.8, 3029.4, 2629.2, 3054.6, 3061.7, 2169.7, 2593.7, 2926.5,
            3806.0, 2786.0, 2695.1, 2527.7, 2922.4, 4015.3
        ]},
        { country: "Argentina", sunshineHours: [2525.2, 2533.9, 2283.2, 2871.7, 1826.6, 1281.2] },
        { country: "Bolivia", sunshineHours: [2288.9] },
        { country: "Brazil", sunshineHours: [
            2234.9, 2424.7, 2368.3, 1844.8, 2804.2, 1774.8, 2101.4, 2187.3, 2536.5, 2443.0, 1893.5
        ]},
        { country: "Chile", sunshineHours: [3077.1, 3926.2, 2681.0, 2807.9, 1716.7] },
        { country: "Colombia", sunshineHours: [2561.0, 1328.0, 1941.9, 1892.2] },
        { country: "Ecuador", sunshineHours: [1581.1, 2238.0] },
        { country: "Falkland Islands", sunshineHours: [1651.0] },
        { country: "French Guiana", sunshineHours: [1976.0] },
        { country: "Guyana", sunshineHours: [2460.6] },
        { country: "Paraguay", sunshineHours: [2803.0] },
        { country: "Peru", sunshineHours: [3333.3, 2180.3, 1230.0] },
        { country: "Uruguay", sunshineHours: [2481.4] },
        { country: "Venezuela", sunshineHours: [2506.9, 3284.2, 2904.8, 2894.8] },
        { country: "Australia", sunshineHours: [
            3565.5, 3514.2, 3510.7, 3499.1, 3229.5, 3141.1, 3092.2, 2968.4,
            2813.7, 2765.4, 2718.5, 2589.3, 2556.8, 2468.1, 2393.1, 2362.6
        ]},
        { country: "Papua New Guinea", sunshineHours: [2463] },
        { country: "Solomon Islands", sunshineHours: [2330.0] },
        { country: "New Zealand", sunshineHours: [2070.2, 2058.7, 2019.6, 2003.1, 1683.7] },
        { country: "Fiji", sunshineHours: [1922.0] },
        { country: "USA (American Samoa)", sunshineHours: [1849.1] }
    ];

    try {
        let countries = [];

        for (let i = 0; i < sunshineData.length; i++) {
            const { country, sunshineHours } = sunshineData[i];
            if (countryName) {
                if (countryName == country) {
                    countrysSunHours = sunshineHours;
                    break; // Stop searching if we found the country
                }
            }
                
            else if (sunshineHours.some(hours => hours > hoursOfSun - 1100 && hours < hoursOfSun + 100)) {
                countries.push(country); // Store only country name
            }
        }

        if (countrysSunHours.length > 0) {
            const average = countrysSunHours.reduce((sum, num) => sum + num, 0) / countrysSunHours.length;

            return NextResponse.json(average); // Return average sun hours
        }

        countries.sort(); // Sort countries alphabetically
        const countriesSet = new Set(countries); // Remove duplicates

        return NextResponse.json([...countriesSet]);
    } catch (error) {
        console.error("Error fetching sun data:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}