export default async function getWikiResults(searchTerm : string) {
    const searchParams = new URLSearchParams({
        action: 'query',
        generator: 'search',
        gsrsearch: searchTerm,
        gsrlimit: '20',
        prop: 'pageimages|extracts',
        exchars: '100',
        exintro: 'true',
        explaintext: 'true',
        exlimit: 'max',
        format: 'json',
        origin: '*',
    })//all of these different values inside of that object are something are related to wikipedia it's not something specific that you need to know or memorize or recognize


  const response = await fetch('https://en.wikipedia.org/w/api.php?' + searchParams)
  return response.json()
}