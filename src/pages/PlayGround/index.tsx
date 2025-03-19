import {useSearchParams} from "react-router-dom";
import {Card} from "antd";
import {IPlaygroundConfig} from "../../types";
import {PLAYGROUNDS} from "../../constants";
import APITag from "../../components/APITag";
import { useAuthContext } from "../../Context";

const Playground = () => {
  const [searchParams] = useSearchParams();
  const playgroundId = searchParams.get("id");
  const playground: IPlaygroundConfig | undefined = PLAYGROUNDS.find(
    (pg) => pg.id === playgroundId
  );
  const {isAuthenticated} = useAuthContext();

  if (!playground) {
    return (
      <div className="text-center text-gray-600 text-xl mt-10">
        Playground not found
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <Card className="shadow-md p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          {playground.name}
        </h1>
        <p className="text-gray-600 mb-4">{playground.description}</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {playground.tags.map((tag) => (
            <APITag key={tag} tag={tag} />
          ))}
        </div>
        {isAuthenticated() ? (
          <div className="mt-6">{playground.component}</div>
        ): 
        (
          <div>Please <a href="/auth" className="text-blue-500 underline hover:text-blue-700 transition-colors duration-300">login</a> to view the playground </div>
        )}
        
      </Card>
    </div>
  );
};

export default Playground;
