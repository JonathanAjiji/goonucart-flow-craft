import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, MapPin, Tag, Star, Clock, ShoppingCart, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { MOCK_PRODUCTS } from '@/mockData';
import { Product, Category, Campus, Condition } from '@/types';

interface MarketplaceProps {
  onAddToCart: (product: Product) => void;
}

export function Marketplace({ onAddToCart }: MarketplaceProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState<Category | 'All'>('All');
  const [priceRange, setPriceRange] = React.useState([0, 2000]);
  const [selectedCampuses, setSelectedCampuses] = React.useState<Campus[]>([]);
  const [selectedConditions, setSelectedConditions] = React.useState<Condition[]>([]);
  const [itemType, setItemType] = React.useState<'All' | 'Item' | 'Service'>('All');

  const categories: (Category | 'All')[] = ['All', 'Electronics', 'Books', 'Furniture', 'Services', 'Transportation', 'Other'];
  const campuses: Campus[] = ['Main Campus', 'North Campus', 'South Campus', 'West Campus'];
  const conditions: Condition[] = ['New', 'Like New', 'Good', 'Fair', 'Poor'];

  const suggestions = MOCK_PRODUCTS
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 5);

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCampus = selectedCampuses.length === 0 || selectedCampuses.includes(product.location);
    const matchesCondition = selectedConditions.length === 0 || (product.condition && selectedConditions.includes(product.condition));
    const matchesType = itemType === 'All' || product.type === itemType;

    return matchesSearch && matchesCategory && matchesPrice && matchesCampus && matchesCondition && matchesType;
  });

  const toggleCampus = (campus: Campus) => {
    setSelectedCampuses(prev => 
      prev.includes(campus) ? prev.filter(c => c !== campus) : [...prev, campus]
    );
  };

  const toggleCondition = (condition: Condition) => {
    setSelectedConditions(prev => 
      prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="flex items-center gap-2 font-semibold text-lg mb-4">
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filters</span>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-3 block">Type</Label>
              <div className="flex gap-2 p-1 bg-muted rounded-lg">
                <Button 
                  variant={itemType === 'All' ? 'secondary' : 'ghost'} 
                  size="sm" 
                  className="flex-1 text-xs"
                  onClick={() => setItemType('All')}
                >
                  All
                </Button>
                <Button 
                  variant={itemType === 'Item' ? 'secondary' : 'ghost'} 
                  size="sm" 
                  className="flex-1 text-xs"
                  onClick={() => setItemType('Item')}
                >
                  Items
                </Button>
                <Button 
                  variant={itemType === 'Service' ? 'secondary' : 'ghost'} 
                  size="sm" 
                  className="flex-1 text-xs"
                  onClick={() => setItemType('Service')}
                >
                  Services
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Price Range (${priceRange[0]} - ${priceRange[1]})</Label>
              <Slider
                value={priceRange}
                max={2000}
                step={10}
                onValueChange={setPriceRange}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Campus Location</Label>
              <div className="space-y-2">
                {campuses.map(campus => (
                  <div key={campus} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`campus-${campus}`} 
                      checked={selectedCampuses.includes(campus)}
                      onCheckedChange={() => toggleCampus(campus)}
                    />
                    <label htmlFor={`campus-${campus}`} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {campus}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Condition</Label>
              <div className="space-y-2">
                {conditions.map(condition => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`condition-${condition}`} 
                      checked={selectedConditions.includes(condition)}
                      onCheckedChange={() => toggleCondition(condition)}
                    />
                    <label htmlFor={`condition-${condition}`} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {condition}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full mt-6" onClick={() => {
            setPriceRange([0, 2000]);
            setSelectedCampuses([]);
            setSelectedConditions([]);
            setItemType('All');
            setActiveCategory('All');
          }}>
            Reset Filters
          </Button>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex flex-col gap-6">
            {/* Search & Categories */}
            <div className="space-y-4">
              <div className="relative group">
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="What are you looking for today?"
                    className="pl-12 h-12 text-lg rounded-xl shadow-sm border-muted focus-visible:ring-primary"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  />
                </div>

                {/* Predictive Text Suggestions */}
                <AnimatePresence>
                  {showSuggestions && searchQuery.length > 0 && suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-xl shadow-lg z-10 overflow-hidden"
                    >
                      {suggestions.map(s => (
                        <div
                          key={s.id}
                          className="px-4 py-3 hover:bg-muted cursor-pointer flex items-center justify-between"
                          onClick={() => {
                            setSearchQuery(s.name);
                            setShowSuggestions(false);
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-muted overflow-hidden">
                              <img src={s.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{s.name}</p>
                              <p className="text-xs text-muted-foreground">{s.category}</p>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-primary">${s.price}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex overflow-x-auto pb-2 -mx-1 no-scrollbar gap-2">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={activeCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveCategory(cat)}
                    className="rounded-full whitespace-nowrap"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight">
                  {activeCategory === 'All' ? 'Discover Everything' : activeCategory}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">({filteredProducts.length} results)</span>
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Sort by:</span>
                  <select className="text-xs font-medium bg-transparent border-none focus:ring-0 cursor-pointer">
                    <option>Newest First</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Nearest Campus</option>
                  </select>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4 text-muted-foreground">
                    <Search className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold">No results found</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto mt-2">Try adjusting your filters or search terms to find what you're looking for.</p>
                  <Button variant="outline" className="mt-6" onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                    setPriceRange([0, 2000]);
                  }}>Clear all</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow group h-full flex flex-col">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            <Badge className="bg-white/90 text-primary hover:bg-white backdrop-blur-sm border-none shadow-sm font-bold">
                              ${product.price}
                            </Badge>
                            {product.type === 'Service' && (
                              <Badge className="bg-primary text-white border-none shadow-sm">
                                Service
                              </Badge>
                            )}
                          </div>
                          <Button 
                            variant="secondary" 
                            size="icon" 
                            className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-white/90 hover:bg-primary hover:text-white backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                            onClick={() => onAddToCart(product)}
                          >
                            <Plus className="h-5 w-5" />
                          </Button>
                        </div>
                        <CardContent className="p-4 flex flex-col flex-1">
                          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-muted-foreground mb-2">
                            <span>{product.category}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {product.location}</span>
                          </div>
                          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{product.description}</p>
                          <div className="pt-3 border-t flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                                {product.sellerName.charAt(0)}
                              </div>
                              <span className="text-xs font-medium">{product.sellerName}</span>
                            </div>
                            {product.condition && (
                              <Badge variant="outline" className="text-[10px] py-0 h-5">
                                {product.condition}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
