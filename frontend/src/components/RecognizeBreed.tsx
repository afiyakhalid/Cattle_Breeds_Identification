import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Upload, Camera, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Progress } from './ui/progress';

// --- REAL API IMPORT ---
import { predictImage } from '../api/predict'; // Make sure this path is correct!

interface RecognizeBreedProps {
  onNavigate: (page: string, breedId?: string) => void;
}

// --- UPDATED INTERFACE (to match your API) ---
interface ClassificationResult {
  label: string;
  confidence: number;
}

export function RecognizeBreed({ onNavigate }: RecognizeBreedProps) {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); // <-- 1. ADDED FILE STATE
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // --- 2. DELETED MOCK RESULTS ---

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setImageFile(file); // <-- 3. SAVE THE FILE
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // --- 4. REPLACED WITH REAL API CALL ---
  const handleClassify = async () => {
    if (!imageFile) {
      console.error("No file to classify!");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      // THIS IS THE REAL API CALL
      const data = await predictImage(imageFile);
      // data will be { label: "Sahiwal", confidence: 92 }
      setResult(data);
    } catch (error) {
      console.error("Classification failed:", error);
      // You could add an error state here to show the user
      // Example: setError("Analysis failed. Please try again.")
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setImageFile(null); // <-- 5. RESET THE FILE
    setResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-neutral-900 mb-2">Recognize Cattle Breed</h1>
        <p className="text-neutral-600">Upload a photo or use your webcam to identify the breed</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section (No changes here) */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Photo</CardTitle>
            <CardDescription>
              {!image ? 'Drag and drop or click to select an image' : 'Image ready for classification'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!image ? (
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  dragActive
                    ? 'border-green-700 bg-green-50'
                    : 'border-neutral-300 hover:border-green-700 hover:bg-neutral-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-600 mb-2">Drop your image here</p>
                <p className="text-sm text-neutral-500 mb-4">or</p>
                <label htmlFor="file-upload">
                  <Button type="button" variant="outline" className="cursor-pointer" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Browse Files
                    </span>
                  </Button>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileInput}
                />
                <p className="text-xs text-neutral-500 mt-4">Supports: JPG, PNG, WebP (max 10MB)</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden bg-neutral-100">
                  <img src={image} alt="Uploaded cattle" className="w-full h-auto" />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleClassify} disabled={isAnalyzing} className="flex-1 bg-green-700 hover:bg-green-800">
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Camera className="w-4 h-4 mr-2" />
                        Classify Breed
                      </>
                    )}
                  </Button>
                  <Button onClick={handleReset} variant="outline">
                    Reset
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>Classification Results</CardTitle>
            <CardDescription>
              {!result && !isAnalyzing && 'Results will appear here after classification'}
              {isAnalyzing && 'Analyzing image with our AI model...'}
              {result && 'Classification complete!'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isAnalyzing && (
              <div className="space-y-6 py-8">
                <div className="flex justify-center">
                  <Loader2 className="w-16 h-16 text-green-700 animate-spin" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>Processing image...</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <p className="text-center text-sm text-neutral-600">
                  Our AI is analyzing the cattle characteristics
                </p>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-green-900 mb-1">Primary Match</h3>
                      {/* --- 6. FIXED: result.breed -> result.label --- */}
                      <p className="text-green-800 mb-2">{result.label}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-green-700">Confidence Score</span>
                          <span className="text-green-900">{result.confidence}%</span>
                        </div>
                        <Progress value={result.confidence} className="h-2 bg-green-100" />
                      </div>
                    </div>
                  </div>
                  <Button
                    // --- 7. FIXED: result.breed -> result.label ---
                    onClick={() => onNavigate('breeds', result.label.toLowerCase())}
                    className="w-full bg-green-700 hover:bg-green-800"
                  >
                    Learn more about {result.label}
                  </Button>
                </div>

                {/* --- 8. DELETED ALTERNATIVES BLOCK --- */}

                {/* <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-900">
                    <strong>Note:</strong> Results are based on AI analysis. For critical decisions,
                    please consult with a veterinarian or livestock expert.
                  </p>
                </div> */}
              </div>
            )}

            {!result && !isAnalyzing && (
              <div className="text-center py-12 text-neutral-500">
                <Camera className="w-16 h-16 mx-auto mb-4 text-neutral-300" />
                <p>Upload and classify an image to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}