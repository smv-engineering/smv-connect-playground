import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import APITag from "../../components/APITag";
import { PLAYGROUNDS } from "../../constants";

const Playgrounds = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">API Playgrounds</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {PLAYGROUNDS.map((playground) => (
          <Card
          key={playground.name}
          hoverable
          cover={
            <div className="h-48 w-full overflow-hidden rounded-t-lg">
              <img 
                alt={playground.name} 
                src={playground.photo} 
                className="h-full w-full object-cover" 
              />
            </div>
          }
          className="rounded-lg shadow-md"
          onClick={() => navigate(`/playground?id=${playground.id}`)}
        >
          <h2 className="text-xl font-semibold text-gray-800">{playground.name}</h2>
          <p className="text-gray-600 text-sm mt-2">{playground.description}</p>
          <div className="flex flex-wrap mt-4 gap-2">
            {playground.tags.map((tag) => (
              <APITag key={tag} tag={tag} />
            ))}
          </div>
        </Card>
        ))}
      </div>
    </div>
  );
};

export default Playgrounds;
