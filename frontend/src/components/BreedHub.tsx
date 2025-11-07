import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BreedHubProps {
  onNavigate: (page: string, breedId?: string) => void;
}

interface Breed {
  id: string;
  name: string;
  image: string;
  origin: string;
  category: string;
}

const breeds: Breed[] = [
  {
    id: 'holstein',
    name: 'Holstein',
    image: 'https://images.unsplash.com/photo-1676940217332-db25d0d08d26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xzdGVpbiUyMGNhdHRsZXxlbnwxfHx8fDE3NjIzMzAzNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'Netherlands',
    category: 'Dairy',
  },
  {
    id: 'angus',
    name: 'Angus',
    image: 'https://images.unsplash.com/photo-1662486750674-5cba308b8dab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmd1cyUyMGNhdHRsZXxlbnwxfHx8fDE3NjIzMzAzNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'Scotland',
    category: 'Beef',
  },
  {
    id: 'hereford',
    name: 'Hereford',
    image: 'https://images.unsplash.com/photo-1528143582951-ef14e49f4381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJlZm9yZCUyMGNhdHRsZXxlbnwxfHx8fDE3NjIyODQ0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'England',
    category: 'Beef',
  },
  {
    id: 'brahman',
    name: 'Brahman',
    image: 'https://images.unsplash.com/photo-1501717667473-256e63ef9977?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFobWFuJTIwY2F0dGxlfGVufDF8fHx8MTc2MjMzMDM4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'India',
    category: 'Dual Purpose',
  },
  {
    id: 'jersey',
    name: 'Jersey',
    image: 'https://images.unsplash.com/photo-1710015425489-1b56df8c4272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXJzZXklMjBjYXR0bGV8ZW58MXx8fHwxNzYyMzMwMzgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'Jersey Island',
    category: 'Dairy',
  },
  {
    id: 'gir',
    name: 'Gir',
    image: 'https://images.unsplash.com/photo-1596522868827-678785f7cd45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaXIlMjBjYXR0bGUlMjBJbmRpYXxlbnwxfHx8fDE3NjIzMzM0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'India',
    category: 'Dairy',
  },
  {
    id: 'sahiwal',
    name: 'Sahiwal',
    image: 'https://images.unsplash.com/photo-1676454502631-843299c46f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYWhpd2FsJTIwY2F0dGxlJTIwZGFpcnl8ZW58MXx8fHwxNzYyMzMzNDM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'India',
    category: 'Dairy',
  },
  {
    id: 'red-sindhi',
    name: 'Red Sindhi',
    image: 'https://images.unsplash.com/photo-1749557809246-7bb317154a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSZWQlMjBTaW5kaGklMjBjYXR0bGV8ZW58MXx8fHwxNzYyMzMzNDM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'India',
    category: 'Dairy',
  },
];

export function BreedHub({ onNavigate }: BreedHubProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    breed.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    breed.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground mb-2">Breed Hub</h1>
        <p className="text-muted-foreground">Explore comprehensive cattle breed information</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search breeds by name, origin, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredBreeds.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No breeds found matching your search.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredBreeds.length} {filteredBreeds.length === 1 ? 'breed' : 'breeds'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBreeds.map((breed) => (
              <Card
                key={breed.id}
                className="cursor-pointer hover:shadow-lg transition-all group border-primary/10 hover:border-primary/30"
                onClick={() => onNavigate('breeds', breed.id)}
              >
                <CardContent className="p-0">
                  <div className="aspect-[4/3] overflow-hidden rounded-t-lg bg-muted">
                    <ImageWithFallback
                      src={breed.image}
                      alt={breed.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-foreground mb-1">{breed.name}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{breed.origin}</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {breed.category}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
