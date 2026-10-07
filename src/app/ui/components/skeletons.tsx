// One gray placeholder box shaped like a post card
export function PostSkeleton() {
  return (
    <div className="animate-pulse border border-gray-200 p-6 my-4">
      <div className="h-4 w-1/3 rounded-md bg-gray-200" />
      <div className="h-3 w-24 mt-3 rounded-md bg-gray-200" />
      <div className="h-6 w-full mt-3 rounded-md bg-gray-200" />
    </div>
  );
}

// Several placeholder boxes in a row
export function PostsSkeleton() {
  const skeletons = [];

  // Make 6 placeholder cards
  for (let i = 0; i < 6; i++) {
    skeletons.push(<PostSkeleton key={i} />);
  }

  return <>{skeletons}</>;
}