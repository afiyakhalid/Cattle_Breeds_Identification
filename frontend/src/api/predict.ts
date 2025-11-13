// This is your new, correct predict.ts

// This is the URL of your backend.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// 1. --- We created a new, smarter type ---
// This matches the { label, confidence, alternatives }
// structure from your new model.py
export interface PredictionResult {
  label: string;
  confidence: number; // This will be 0..1 from the API
  alternatives: {
    label: string;
    confidence: number; // This will be 0..1 from the API
  }[];
}

// 2. --- We updated the function to return this new type ---
export async function predictImage(file: File): Promise<PredictionResult> {
  const url = `${API_BASE}/predict`;
  const form = new FormData();
  form.append('image', file);

  const res = await fetch(url, {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    try {
      const json = JSON.parse(text);
      throw new Error(json.detail || JSON.stringify(json));
    } catch {
      throw new Error(text || `Request failed with status ${res.status}`);
    }
  }

  // 3. --- We now expect the full PredictionResult ---
  const data: PredictionResult = await res.json();

  // 4. --- We format all confidence numbers (main and alts) to be 0-100 ---
  
  // Format the main confidence score
  const mainConfidence = typeof data.confidence === 'number'
    ? Math.round(data.confidence * 100)
    : 0;
  
  // Format all the alternative confidence scores
  const altResults = (data.alternatives || []).map(alt => ({
    ...alt,
    confidence: typeof alt.confidence === 'number'
      ? Math.round(alt.confidence * 100)
      : 0
  }));

  // 5. --- We return the full, formatted object ---
  return {
    label: String(data.label),
    confidence: mainConfidence,
    alternatives: altResults
  };
}