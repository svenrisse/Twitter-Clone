export default function Rightbar() {
  return (
    <div className="fixed top-28 right-10 hidden w-2/12 justify-center lg:flex 2xl:right-32 2xl:top-36">
      <div className="rounded-xl bg-slate-300 px-4 py-6">
        <h1 className="py-4 text-xl font-extrabold">Trends for you</h1>
        <div className="pr-10">
          <div className="py-2">
            <div className="font-bold">#ExampleTrend</div>
            <div className="text-sm text-gray-600">13K Tweets</div>
          </div>
          <div className="py-2">
            <div className="font-bold">#AnotherTrend</div>
            <div className="text-sm text-gray-600">7K Tweets</div>
          </div>
          <div className="py-2">
            <div className="font-bold">#FunnyTrend</div>
            <div className="text-sm text-gray-600">53K Tweets</div>
          </div>
          <div className="py-2">
            <div className="font-bold">#BoringTrend</div>
            <div className="text-sm text-gray-600">606K Tweets</div>
          </div>
          <div className="py-2">
            <div className="font-bold">#FoodTrend</div>
            <div className="text-sm text-gray-600">2K Tweets</div>
          </div>
        </div>
      </div>
    </div>
  );
}
