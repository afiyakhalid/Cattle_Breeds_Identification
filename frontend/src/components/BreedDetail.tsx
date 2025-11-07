import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, MapPin, Award, Beef, Milk } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BreedDetailProps {
  breedId: string;
  onNavigate: (page: string) => void;
}

interface BreedInfo {
  name: string;
  image: string;
  origin: string;
  category: string;
  about: string;
  characteristics: string[];
  funFacts: string[];
  uses: string[];
}

const breedData: { [key: string]: BreedInfo } = {
  holstein: {
    name: 'Holstein',
    image: 'https://images.unsplash.com/photo-1676940217332-db25d0d08d26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xzdGVpbiUyMGNhdHRsZXxlbnwxfHx8fDE3NjIzMzAzNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'Netherlands',
    category: 'Dairy',
    about: 'The Holstein is the most popular dairy breed in the world, known for its distinctive black and white markings. This breed is highly valued for its exceptional milk production capabilities and adaptability to various climates.',
    characteristics: [
      'Distinctive black and white (or red and white) color pattern',
      'Large frame with mature cows weighing 1,400-1,800 lbs',
      'Calm and docile temperament',
      'High milk production - averaging 22,000+ lbs per lactation',
      'Strong maternal instincts',
      'Well-adapted to indoor and outdoor management systems'
    ],
    funFacts: [
      'Each Holstein has a unique pattern of spots, like a fingerprint',
      'Holsteins produce more milk than any other dairy breed',
      'The breed was originally called "Holstein-Friesian" after the regions in the Netherlands and Germany',
      'A single Holstein can produce about 9 gallons of milk per day'
    ],
    uses: [
      'Primary dairy production',
      'Cheese and butter production',
      'Surplus male calves used for veal or beef',
    ]
  },
  angus: {
    name: 'Angus',
    image: 'https://images.unsplash.com/photo-1662486750674-5cba308b8dab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmd1cyUyMGNhdHRsZXxlbnwxfHx8fDE3NjIzMzAzNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'Scotland',
    category: 'Beef',
    about: 'Angus cattle, originally from Scotland, are one of the most popular beef breeds worldwide. Known for their superior meat quality and marbling, Angus cattle are prized by farmers and consumers alike.',
    characteristics: [
      'Solid black or red color',
      'Naturally polled (hornless)',
      'Medium-sized, compact body',
      'Excellent meat marbling and quality',
      'Hardy and adaptable to various climates',
      'Good mothering abilities'
    ],
    funFacts: [
      'Certified Angus Beef® is a premium beef brand recognized worldwide',
      'The breed has been in existence for over 500 years',
      'Black Angus is the most common color, but Red Angus is also recognized',
      'Angus cattle can adapt to harsh weather conditions better than many breeds'
    ],
    uses: [
      'Premium beef production',
      'Crossbreeding to improve beef quality',
      'Show and exhibition purposes'
    ]
  },
  hereford: {
    name: 'Hereford',
    image: 'https://images.unsplash.com/photo-1528143582951-ef14e49f4381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJlZm9yZCUyMGNhdHRsZXxlbnwxfHx8fDE3NjIyODQ0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'England',
    category: 'Beef',
    about: 'Hereford cattle are known for their distinctive red body with white face, legs, and underbelly. They are one of the oldest and most widespread beef breeds, valued for their efficiency and hardiness.',
    characteristics: [
      'Red body with white face, crest, dewlap, and underline',
      'Medium to large frame',
      'Docile temperament',
      'Excellent foraging ability',
      'High fertility rates',
      'Adaptable to various climates and terrains'
    ],
    funFacts: [
      'Herefords were the first English cattle to be recognized as a true breed',
      'The breed was established in Herefordshire, England in the 1700s',
      'Herefords are found in over 50 countries worldwide',
      'They are known for their longevity and can remain productive for many years'
    ],
    uses: [
      'Beef production',
      'Grassland management',
      'Crossbreeding programs'
    ]
  },
  brahman: {
    name: 'Brahman',
    image: 'https://images.unsplash.com/photo-1501717667473-256e63ef9977?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFobWFuJTIwY2F0dGxlfGVufDF8fHx8MTc2MjMzMDM4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'India',
    category: 'Dual Purpose',
    about: 'Brahman cattle are distinguished by their large hump over the shoulders, drooping ears, and loose skin. They are exceptionally well-adapted to hot climates and are resistant to many parasites and diseases.',
    characteristics: [
      'Prominent hump over shoulders',
      'Long, drooping ears',
      'Loose, pendulous skin',
      'Gray to red coloring',
      'Excellent heat tolerance',
      'Disease and parasite resistant'
    ],
    funFacts: [
      'Brahmans can regulate their body temperature better than most cattle breeds',
      'They have more sweat glands than European breeds, helping them stay cool',
      'The breed is sacred in Hindu culture',
      'Brahman genetics have been used to create many hybrid breeds'
    ],
    uses: [
      'Beef production in hot climates',
      'Crossbreeding to add heat tolerance',
      'Draft work in some regions'
    ]
  },
  jersey: {
    name: 'Jersey',
    image: 'https://images.unsplash.com/photo-1710015425489-1b56df8c4272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXJzZXklMjBjYXR0bGV8ZW58MXx8fHwxNzYyMzMwMzgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'Jersey Island',
    category: 'Dairy',
    about: 'Jersey cattle are a small dairy breed known for producing milk with exceptionally high butterfat content. They are gentle, efficient, and well-suited to grazing-based dairy operations.',
    characteristics: [
      'Light brown to dark fawn coloring',
      'Smaller frame - mature cows weigh 800-1,200 lbs',
      'Large, expressive eyes',
      'Gentle and intelligent disposition',
      'High butterfat and protein content in milk',
      'Efficient feed converters'
    ],
    funFacts: [
      'Jersey milk has 18% more protein and 20% more calcium than average milk',
      'The breed originated on the Island of Jersey in the English Channel',
      'Jerseys are one of the oldest dairy breeds, dating back over 600 years',
      'They are the second most popular dairy breed in the world'
    ],
    uses: [
      'Premium dairy production',
      'Artisan cheese making',
      'Small-scale and organic dairy farms'
    ]
  },
  gir: {
    name: 'Gir',
    image: 'https://images.unsplash.com/photo-1596522868827-678785f7cd45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaXIlMjBjYXR0bGUlMjBJbmRpYXxlbnwxfHx8fDE3NjIzMzM0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'India',
    category: 'Dairy',
    about: 'The Gir is one of the principal Zebu breeds originating in India. Named after the Gir forest region in Gujarat, this breed is renowned for its high milk yield, disease resistance, and distinctive appearance with a convex forehead and long pendulous ears.',
    characteristics: [
      'Distinctive convex or bulging forehead (domed)',
      'Long pendulous ears with upturned tips',
      'Typically reddish-brown with white patches or vice versa',
      'Medium to large frame with prominent hump',
      'Highly resistant to tropical diseases',
      'Excellent milk production - averaging 3,000-4,000 kg per lactation'
    ],
    funFacts: [
      'Gir cattle have been exported to Brazil where they helped develop the Gir-Holando breed',
      'The breed is considered sacred in Hindu culture',
      'Gir bulls are known for their docile temperament despite their large size',
      'The distinctive forehead shape helps identify purebred Gir cattle easily'
    ],
    uses: [
      'High-quality milk production with good fat content',
      'Breeding programs for tropical dairy cattle',
      'Drought animals in some rural areas'
    ]
  },
  sahiwal: {
    name: 'Sahiwal',
    image: 'https://images.unsplash.com/photo-1676454502631-843299c46f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYWhpd2FsJTIwY2F0dGxlJTIwZGFpcnl8ZW58MXx8fHwxNzYyMzMzNDM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'India',
    category: 'Dairy',
    about: 'Sahiwal is one of the best dairy breeds of Zebu cattle, originating from the Sahiwal district in Punjab (now in Pakistan). Known for their heat tolerance and high milk production, Sahiwals are considered one of the finest dairy breeds in tropical climates.',
    characteristics: [
      'Reddish-brown to light brown coloring',
      'Loose skin and well-developed dewlap',
      'Short, thick horns that curve upward',
      'Medium-sized with prominent hump in males',
      'Excellent heat tolerance and disease resistance',
      'High milk yield - averaging 2,500-3,500 kg per lactation'
    ],
    funFacts: [
      'Sahiwal is considered the highest milk-producing Zebu breed in India',
      'The breed has been exported to many tropical countries for dairy development',
      'Sahiwal cattle can thrive in temperatures up to 50°C (122°F)',
      'They require less water compared to European dairy breeds'
    ],
    uses: [
      'Commercial dairy farming in tropical regions',
      'Crossbreeding programs to improve heat tolerance',
      'Organic and sustainable dairy production'
    ]
  },
  'red-sindhi': {
    name: 'Red Sindhi',
    image: 'https://images.unsplash.com/photo-1749557809246-7bb317154a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSZWQlMjBTaW5kaGklMjBjYXR0bGV8ZW58MXx8fHwxNzYyMzMzNDM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'India',
    category: 'Dairy',
    about: 'Red Sindhi is a versatile dairy breed originating from the Sindh province. Known for their distinctive red color and compact build, these cattle are highly valued for their milk production, adaptability to hot climates, and resistance to tropical diseases.',
    characteristics: [
      'Deep red coloring with occasional white patches',
      'Compact, muscular build with smooth coat',
      'Small to medium-sized with well-proportioned body',
      'Short, stumpy horns',
      'Excellent adaptability to harsh environments',
      'Good milk production - averaging 2,000-3,000 kg per lactation'
    ],
    funFacts: [
      'Red Sindhi cattle have been exported to over 30 countries worldwide',
      'The breed is particularly popular in the Philippines and Sri Lanka',
      'They can survive on poor quality fodder better than most dairy breeds',
      'Red Sindhi milk has high butterfat content, ideal for ghee production'
    ],
    uses: [
      'Dairy production in hot, arid climates',
      'Crossbreeding to improve heat tolerance in dairy cattle',
      'Dual-purpose farming (milk and draft work)'
    ]
  }
};

export function BreedDetail({ breedId, onNavigate }: BreedDetailProps) {
  const breed = breedData[breedId] || breedData.holstein;

  return (
    <div className="space-y-6">
      <Button
        variant="outline"
        onClick={() => onNavigate('breeds')}
        className="mb-2 border-primary text-primary hover:bg-primary/5"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Breed Hub
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-primary/10">
            <CardContent className="p-0">
              <div className="aspect-video overflow-hidden rounded-t-lg bg-muted">
                <ImageWithFallback
                  src={breed.image}
                  alt={breed.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-foreground mb-2">{breed.name}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{breed.origin}</span>
                      </div>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {breed.category}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-foreground">{breed.about}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Key Characteristics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {breed.characteristics.map((char, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-foreground">{char}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle>Fun Facts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {breed.funFacts.map((fact, index) => (
                  <div key={index} className="bg-accent/5 border-l-4 border-accent p-4 rounded">
                    <p className="text-foreground">{fact}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {breed.category === 'Dairy' ? (
                  <Milk className="w-5 h-5 text-primary" />
                ) : (
                  <Beef className="w-5 h-5 text-primary" />
                )}
                Primary Uses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {breed.uses.map((use, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-foreground">{use}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Recognition Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground mb-4">
                When identifying {breed.name} cattle, look for these key features:
              </p>
              <ul className="space-y-2 text-sm">
                {breed.characteristics.slice(0, 3).map((char, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">→</span>
                    <span className="text-foreground">{char}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Button
            onClick={() => onNavigate('recognize')}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Try Recognizing This Breed
          </Button>
        </div>
      </div>
    </div>
  );
}
