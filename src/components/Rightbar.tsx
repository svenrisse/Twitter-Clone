export default function Rightbar() {
  return (
    <div className="fixed right-0 hidden w-1/4 justify-center px-12 py-24 lg:flex">
      <div className="rounded-xl bg-slate-300 px-4 py-6">
        <h1 className="text-xl font-extrabold">Trends for you</h1>
        <div className="pr-20">
          <div className="py-5">
            <div className="text-sm text-gray-600">Trending</div>
            <div className="font-bold">#ExampleTrend</div>
            <div className="text-sm text-gray-600">13K Tweets</div>
          </div>
          <div className="py-5">
            <div className="text-sm text-gray-600">Trending</div>
            <div className="font-bold">#AnotherTrend</div>
            <div className="text-sm text-gray-600">7K Tweets</div>
          </div>
          <div className="py-5">
            <div className="text-sm text-gray-600">Trending</div>
            <div className="font-bold">#FunnyTrend</div>
            <div className="text-sm text-gray-600">53K Tweets</div>
          </div>
          <div className="py-5">
            <div className="text-sm text-gray-600">Trending</div>
            <div className="font-bold">#BoringTrend</div>
            <div className="text-sm text-gray-600">606K Tweets</div>
          </div>
          <div className="py-5">
            <div className="text-sm text-gray-600">Trending</div>
            <div className="font-bold">#FoodTrend</div>
            <div className="text-sm text-gray-600">2K Tweets</div>
          </div>
        </div>
      </div>
    </div>
  );
}
