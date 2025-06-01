
import SampleAtomic from "@/components/organisms/sample/atomic/SampleAtomic";
import SampleAtomic2 from "@/components/organisms/sample/atomic/SampleAtomic2";
import SampleAtomic3 from "@/components/organisms/sample/atomic/SampleAtomic3";
import SampleAtomic4 from "@/components/organisms/sample/atomic/SampleAtomic4";

export default function AtomicSampleTemplate() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">atomicサンプルテンプレート</h1>
        </div>
      </header>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 gap-4">
          <h2 className="text-2xl font-bold text-gray-900 pt-3">使用例１</h2>
          <div className="border-4 border-dashed border-gray-200 rounded-lg flex flex-col">
            <SampleAtomic />
            <SampleAtomic2 />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 pt-3">中央揃え</h2>
          <div className="border-4 border-dashed border-gray-200 rounded-lg flex flex-col items-center">
            <SampleAtomic />
            <SampleAtomic2 />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 pt-3">justify-between</h2>
          <div className="border-4 border-dashed border-gray-200 rounded-lg flex justify-between">
            <SampleAtomic3 />
            <SampleAtomic4 />
          </div>
        </div>
      </div>
    </div>
  )
} 