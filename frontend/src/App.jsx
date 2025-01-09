import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Github } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "";

const App = () => {
  const [username, setUsername] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRoast("");
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/data/${username}`);

      const data = await response.json();
      if (data.roast) {
        setRoast(data.roast);
      } else {
        setError("Failed to get a roast. Try another username!");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md border-0 shadow-lg bg-white">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <Github className="w-10 h-10 text-slate-700" />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-slate-700">
            Get your Github Roasted!
          </CardTitle>
          <p className="text-sm text-center text-slate-500">
            Enter a GitHub username and watch the roast unfold
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter GitHub Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                         outline-none text-slate-600 placeholder-slate-400
                         bg-slate-50 transition-all duration-200"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !username}
              className="w-full py-3 px-4 bg-slate-800 text-white rounded-lg font-medium 
                       hover:bg-slate-700 focus:outline-none focus:ring-2 
                       focus:ring-slate-500 focus:ring-offset-2 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-200"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Generating Roast...
                </span>
              ) : (
                "Generate Roast"
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {roast && (
            <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-lg">
              <p className="text-slate-700 whitespace-pre-wrap text-sm leading-relaxed">
                {roast}
              </p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-xs text-center text-slate-400">
              All roasts are generated in good fun and shouldn't be taken
              seriously!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
