import axios from 'axios'
import { NextResponse } from 'next/server'

const key = process.env.API_KEY

export async function POST(req) {
  try {
    const { media_type = 'movie', id } = await req.json()
    const response = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${key}&language=en-US`
    )
    const data = response.data
    const trailer = data.results.find(
      (item) => item.type === 'Trailer' && item.site === 'YouTube'
    )
    const trailerKey = trailer ? trailer.key : null
    return NextResponse.json({ trailerKey }, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch a trailer', err },
      { status: 500 }
    )
  }
}
