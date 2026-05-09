type DescriptionTabProps = {
  description?: string;
};

const DescriptionTab = ({ description }: DescriptionTabProps) => {
  return (
    <div className="prose max-w-none">
      <p className="text-gray-700 leading-relaxed">
        {description || "No description available."}
      </p>
      <ul className="mt-4">
        <li>Premium quality materials</li>
        <li>Designed for comfort and durability</li>
        <li>Perfect for everyday use</li>
        <li>Modern and stylish design</li>
      </ul>
    </div>
  );
};

export default DescriptionTab;
