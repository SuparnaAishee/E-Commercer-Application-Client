export default function Loading() {
  return (
    <div className="container pt-12 pl-12 pr-12">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-200 rounded-xl"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
