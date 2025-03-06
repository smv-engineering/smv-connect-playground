import { useSearchParams } from "react-router-dom";
import { Card, Tag } from "antd";
import { IPlaygroundConfig } from "../../types";
import { PLAYGROUNDS } from "../PlayGrounds/constants";

const Playground= () => {
  const [searchParams] = useSearchParams();
  const playgroundId = searchParams.get("id");
  const playground: IPlaygroundConfig | undefined = PLAYGROUNDS.find((pg) => pg.id === playgroundId);

  if (!playground) {
    return <div className="text-center text-gray-600 text-xl mt-10">Playground not found</div>;
  }

  return (
    <div className="p-6 w-full min-h-screen bg-white">
      <Card className="shadow-md p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">{playground.name}</h1>
        <p className="text-gray-600 mb-4">{playground.description}</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {playground.tags.map((tag) => (
            <Tag key={tag} color="blue">{tag}</Tag>
          ))}
        </div>
        <div className="mt-6">
          {playground.component}
        </div>
      </Card>
    </div>
  );
};

export default Playground;
