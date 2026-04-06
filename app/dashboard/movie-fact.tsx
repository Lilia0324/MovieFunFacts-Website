import { getMovieFact } from "@/lib/openai";

export const dynamic = "force-dynamic";

export default async function MovieFact({ title }: { title: string }) {
  const fact = await getMovieFact(title);
  return <p className="mt-2">{fact}</p>;
}
