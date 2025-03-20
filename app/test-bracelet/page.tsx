'use client';

import { useState } from 'react';

export default function TestBracelet() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateDescription = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/generate-bracelet-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crystals: "紫水晶、月光石",
          purpose: "安神助眠，提升直觉",
          adjustments: "加强安神效果"
        })
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">手链描述生成测试</h1>
      <button
        onClick={generateDescription}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? '生成中...' : '生成描述'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-gray-100 rounded">
            <h2 className="font-bold">名称</h2>
            <p>{result.name}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded">
            <h2 className="font-bold">简介</h2>
            <p>{result.description}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded">
            <h2 className="font-bold">原始响应</h2>
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(result.raw_response, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
} 