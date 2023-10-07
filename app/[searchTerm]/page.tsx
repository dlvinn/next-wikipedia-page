import getWikiResults from "@/lib/getWikiResults"
import { Http2ServerRequest } from "http2";
import type { Metadata } from "next";
import Item from "./components/Item";
type Params = {
  params:{
    searchTerm: string
  }
};
export async function generateMetadata({params:{searchTerm}} : Params)  {
  const wikidata: Promise<SearchResult> = await getWikiResults(searchTerm);
  const data = await wikidata;
  const resultData = searchTerm.replaceAll('%20', ' ');
  
  if(!data?.query?.pages){
    return {
      title: `${resultData} not found`
    }
  }

  return {
    title: resultData,
    description: `search results for ${resultData}`
  }
  
  
}
export default async function SearchedResults({
    params:{searchTerm}
} : Params) {
  const wikidata: Promise<SearchResult> = await getWikiResults(searchTerm);
  const data = await wikidata;
  const results: Result[] | undefined = data?.query?.pages;
  console.log(results);
  const content = (
    <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
      {results ? Object.values(results).map((result)=>{
        return <Item key={result.pageid} result={result} />
      } 
      ) :
      <h2 className="p-2 text-xl">{`${searchTerm} not Found`}</h2>
      }
    </main>
  )
  return (
content  )
}