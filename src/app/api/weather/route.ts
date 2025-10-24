import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const city = searchParams.get('city') || 'Tallinn';

        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        if(!apiKey) {
            return NextResponse.json({error: "API key is missing"}, { status: 500})
        }

        const res = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    );

    if (!res.ok) {
        return NextResponse.json({error: "Failed to fetch weather data"}, { status: res.status})
    }

    const data = await res.json();
    return NextResponse.json({ city: city, current: data.current });
    } catch (error) {
        return NextResponse.json({error: error instanceof Error ? error.message : String(error)}, { status: 500})
    }
}