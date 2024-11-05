import React, { useState, useEffect } from 'react';
import { weapons } from './data/weapons';
import { WeaponProgress, CamoProgress } from './types';
import { ProgressHeader } from './components/ProgressHeader';
import { WeaponCard } from './components/WeaponCard';
import { Filter } from 'lucide-react';

const categories = Array.from(new Set(weapons.Planilha1.map(w => w.Categoria)));

function App() {
  const [progress, setProgress] = useState<WeaponProgress>(() => {
    const saved = localStorage.getItem('weaponProgress');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('weaponProgress', JSON.stringify(progress));
  }, [progress]);

  const handleToggleCamo = (weaponName: string, camo: keyof CamoProgress) => {
    setProgress(prev => {
      const weaponProgress = prev[weaponName] || { gold: false, diamond: false, darkSpice: false, darkMatter: false };
      const updated = { ...prev };

      // Reset higher tier camos if lower tier is unchecked
      if (!weaponProgress[camo]) {
        updated[weaponName] = { ...weaponProgress, [camo]: true };
      } else {
        const resetProgress = { ...weaponProgress, [camo]: false };
        if (camo === 'gold') {
          resetProgress.diamond = false;
          resetProgress.darkSpice = false;
          resetProgress.darkMatter = false;
        } else if (camo === 'diamond') {
          resetProgress.darkSpice = false;
          resetProgress.darkMatter = false;
        } else if (camo === 'darkSpice') {
          resetProgress.darkMatter = false;
        }
        updated[weaponName] = resetProgress;
      }

      return updated;
    });
  };

  const filteredWeapons = weapons.Planilha1.filter(weapon => {
    const matchesCategory = selectedCategory === 'All' || weapon.Categoria === selectedCategory;
    const matchesSearch = weapon.Arma.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-8">
      <ProgressHeader 
        progress={progress} 
        totalWeapons={weapons.Planilha1.length} 
      />
      
      <div className="max-w-7xl mx-auto px-4 pt-32">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search weapons..."
              className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              className="bg-transparent focus:outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWeapons.map((weapon) => (
            <WeaponCard
              key={weapon.Arma}
              weapon={weapon}
              progress={progress[weapon.Arma] || { gold: false, diamond: false, darkSpice: false, darkMatter: false }}
              onToggleCamo={(camo) => handleToggleCamo(weapon.Arma, camo)}
              isLocked={weapon["Desbloqueia em"] !== "Aberta" && !progress[weapon.Arma]?.gold}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;