import CardDetail from "@/app/components/Cards/CardDetail";
import { getLocalDogPostById } from "@/app/lib/getLocalDogPostById";

interface Props {
  params: { id: string };
}

interface Post {
  id: string;
  title: string;
  content: string;
}

export default async function PostPage({ params }: Props) {
  const data: Post = await getLocalDogPostById(params.id);

  return (
    <div className="mt-6">
      <CardDetail {...data} />
    </div>
  );
}
