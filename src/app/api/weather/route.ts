import { error } from "console";
import { NextResponse } from "next/server";

const currentCity = "Tallinn";

export async function GET() {
    try {
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        if(!apiKey) {
            return NextResponse.json({error: "API key is missing"}, { status: 500})
        }

        const res = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${currentCity}&aqi=no`,
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
    return NextResponse.json({ city: currentCity,current: data.current });
    } catch (err) {
        return NextResponse.json({error: "Server error"}, { status: 500})
    }
}