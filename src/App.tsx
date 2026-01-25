// function App() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <h1 className="text-2xl font-bold text-blue-600">
//         Frontend vF0 - Tailwind Working
//       </h1>
//       <div className="h-screen bg-red-500 text-white text-4xl flex items-center justify-center ">
//         TAILWIND OR BUST
//       </div>
//     </div>
//   );
// }

// export default App;

import { login, getCurrentUser } from "./auth/api";
import { setTokens } from "./auth/token";

function App() {
  async function testAuth() {
    const tokens = await login("superuser", "root");
    setTokens(tokens.access, tokens.refresh);

    const user = await getCurrentUser();
    console.log("Current user:", user);
  }

  return (
    <div className="p-10">
      <button
        className="px-4 py-2 bg-blue-600 text-white"
        onClick={testAuth}
      >
        Test Auth API
      </button>
    </div>
  );
}

export default App;
