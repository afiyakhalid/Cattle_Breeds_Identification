import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Upload, Scan, CheckCircle2, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <div className="relative min-h-[600px] md:min-h-[700px] flex items-center">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1707832058209-bc91a8febb4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5ueSUyMHBhc3R1cmUlMjBjYXR0bGUlMjBoZXJkfGVufDF8fHx8MTc2MjMzMjY4Nnww&ixlib=rb-4.1.0&q=80&w=1080)'
          }}
        >
          {/* Light Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background/95"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Massive Hero Title */}
            <h1 
              className="text-foreground mb-6 leading-tight"
              style={{ 
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontFamily: 'Merriweather, Georgia, serif',
                fontWeight: 700,
                lineHeight: 1.2
              }}
            >
              Instant Breed Recognition for Your Herd
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Professional cattle identification powered by AI. Built for ranchers who need accurate, 
              reliable results without the complexity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                onClick={onGetStarted}
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-7 text-xl h-auto shadow-xl"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/10 px-10 py-7 text-xl h-auto bg-background/90 backdrop-blur-sm"
              >
                Watch Demo
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              ✓ No credit card required  •  ✓ Trusted by ranchers nationwide  •  ✓ Works on any device
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-foreground mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground">Simple, fast, and accurate cattle identification in three steps</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1: Upload */}
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Upload className="w-12 h-12 text-primary" />
                  </div>
                  <div className="mb-6">
                    <span className="inline-block w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                      1
                    </span>
                    <h3 className="text-foreground mb-3">Upload Photo</h3>
                    <p className="text-muted-foreground">
                      Take a photo of your cattle or upload an existing image. Works with any smartphone or camera.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2: Analyze */}
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Scan className="w-12 h-12 text-accent" />
                  </div>
                  <div className="mb-6">
                    <span className="inline-block w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center mb-4">
                      2
                    </span>
                    <h3 className="text-foreground mb-3">AI Analysis</h3>
                    <p className="text-muted-foreground">
                      Our trained AI model analyzes the image and identifies breed characteristics in seconds.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3: Result */}
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-primary" />
                  </div>
                  <div className="mb-6">
                    <span className="inline-block w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                      3
                    </span>
                    <h3 className="text-foreground mb-3">Get Results</h3>
                    <p className="text-muted-foreground">
                      Receive breed identification with confidence scores and detailed breed information.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-foreground mb-4">Built for Ranchers, Not Tech Demos</h2>
              <p className="text-xl text-muted-foreground">Practical features that actually help you manage your operation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-foreground mb-3">Digital Herd Logbook</h3>
                  <p className="text-muted-foreground text-lg">
                    Keep detailed records of your cattle including tag IDs, birth dates, vaccination schedules, and custom notes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-foreground mb-3">Breed Information Library</h3>
                  <p className="text-muted-foreground text-lg">
                    Access comprehensive information on cattle breeds including characteristics, breeding tips, and market insights.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-foreground mb-3">Market Trends</h3>
                  <p className="text-muted-foreground text-lg">
                    Stay informed with local cattle price trends and market data to make better business decisions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-foreground mb-3">Works Offline-Ready</h3>
                  <p className="text-muted-foreground text-lg">
                    Designed to work reliably even in rural areas with limited connectivity. Your data, your control.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-primary/5 border-2 border-primary/20 rounded-2xl p-12">
            <h2 className="text-foreground mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join ranchers and cattle professionals who trust The Digital Drover for accurate breed identification.
            </p>
            <Button 
              onClick={onGetStarted}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-7 text-xl h-auto shadow-xl"
            >
              Start Identifying Breeds Now
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p>© 2024 The Digital Drover. A reliable tool for modern ranchers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
