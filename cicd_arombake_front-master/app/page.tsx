import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
          AromBake 관리 시스템
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          직원, 고객, 등급을 관리할 수 있는 시스템입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Link
          href="/staffs"
          className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-2">
            직원 관리
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            직원 정보를 조회하고 관리합니다.
          </p>
        </Link>

        <Link
          href="/guests"
          className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-2">
            고객 관리
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            고객 정보와 지출 내역을 관리합니다.
          </p>
        </Link>

        <Link
          href="/tiers"
          className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-2">
            등급 관리
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            고객 등급을 조회하고 관리합니다.
          </p>
        </Link>
      </div>
    </div>
  );
}
