export default function ScrollSample() {
  return (
    <div className="min-h-screen">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">スクロール検証用</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="rounded-lg h-96">
          <div className="flex justify-center items-center border border-gray-900 mx-2 rounded-lg p-4 m-4 gap-4">
            <img src="https://images.ygoprodeck.com/images/cards_cropped/99543666.jpg" alt="間取りの情報" width={400} height={400} />
          </div>
          <div className="flex justify-center items-center border border-gray-900 mx-2 rounded-lg p-4 m-4 gap-4">
            <img src="https://images.ygoprodeck.com/images/cards_cropped/99543666.jpg" alt="間取りの情報" width={400} height={400} />
          </div>
          <div className="flex justify-center items-center border border-gray-900 mx-2 rounded-lg p-4 m-4 gap-4">
            <img src="https://images.ygoprodeck.com/images/cards_cropped/72043279.jpg" alt="間取りの情報" width={400} height={400} />
          </div>
          </div>
        </div>
      </div>
    </div>
  )
} 