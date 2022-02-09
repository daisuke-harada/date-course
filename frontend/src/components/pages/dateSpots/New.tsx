import { memo, VFC } from "react";

export const New: VFC = memo(() => {
  return(
    <header className="container mx-auto text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">HR</h1>
        <div>
          <button>
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/>
            </svg>
          </button>
        </div>
      </div>
      <div>
        <ul>
          <li className="block px-8 py-2 hover:bg-gray-600">HRとは</li>
          <li className="block px-8 py-2 hover:bg-gray-600">HRとは</li>
          <li className="block px-8 py-2 hover:bg-gray-600">HRとは</li>
          <li className="block px-8 py-2 hover:bg-gray-600">HRとは</li>
        </ul>
      </div>
    </header>
  );
});