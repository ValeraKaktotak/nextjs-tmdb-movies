import axios from 'axios'
import { NextResponse } from 'next/server'
const key = process.env.API_KEY

export async function GET() {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key${key}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false`
    )
    return NextResponse.json(response.data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch Data' }, { status: 500 })
  }
}
