export default function Loading() {
  return (
    <div className="container pt-12 pl-12 pr-12">
      <div className="animate-pulse">
        <div className="h-40 bg-gray-200 rounded-xl mb-8"></div>
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="aspect-square bg-gray-200 rounded-xl"></div>
          <div className="aspect-square bg-gray-200 rounded-xl"></div>
          <div className="aspect-square bg-gray-200 rounded-xl"></div>
          <div className="aspect-square bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
