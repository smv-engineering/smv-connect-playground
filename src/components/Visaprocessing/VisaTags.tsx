export const VisaTags = ({ tags }: { tags: string[] }) => {
  if (tags && tags.length > 0) {
    return (
      <div>
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  }
};
