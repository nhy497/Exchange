import React, { useState, useMemo, useEffect } from 'react';
import { Heart, MapPin, Calendar, Award, GraduationCap, Globe, Filter, X, Star, BookOpen, DollarSign, ExternalLink, TrendingUp, Info, Languages, Building2, Lightbulb, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Plus, Minus, Scale, Loader2 } from 'lucide-react';
import { LanguageProvider, useLanguage, regionFeatures } from './LanguageContext';

// ?ïÊ??†Ë?Â≠∏Ê†°?∏Ê?
function useSchoolsData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('data/schools_complete.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load schools data');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading schools data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}

function AppContent() {
  const { lang, setLang, t } = useLanguage();
  
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('exchangeFavorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem('exchangeCompare');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [expandedSchool, setExpandedSchool] = useState(null);
  const [showCriteriaGuide, setShowCriteriaGuide] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showComparePanel, setShowComparePanel] = useState(false);
  
  // ?†Ë?Â≠∏Ê†°?∏Ê?
  const { data: schoolsData, loading, error } = useSchoolsData();
  
  // Ë®àÁ??ãÂÆ∂?óË°®
  const countries = useMemo(() => {
    if (!schoolsData) return [];
    return [...new Set(schoolsData.schools.map(s => s.country))].sort();
  }, [schoolsData]);
  
  // ÁØ©ÈÅ∏Ê¢ù‰ª∂ - ?ØÊ??ôÂ?
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [cgpaMode, setCgpaMode] = useState('max'); // 'max' or 'min'
  const [cgpaValue, setCgpaValue] = useState(4.0);
  const [ieltsMode, setIeltsMode] = useState('min'); // 'min' or 'max'
  const [ieltsValue, setIeltsValue] = useState(0);
  const [budgetMode, setBudgetMode] = useState('max'); // 'max' or 'min'
  const [budgetValue, setBudgetValue] = useState(16000);
  const [explorerGrant, setExplorerGrant] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('exchangeFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('exchangeCompare', JSON.stringify(compareList));
  }, [compareList]);

  const toggleCompare = (id) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        return prev.filter(cid => cid !== id);
      }
      if (prev.length >= 4) {
        alert(lang === 'zh' ? '?ÄÂ§öÂè™?ΩÊ?Ëº??ìÂ≠∏?? : 'You can compare up to 4 schools');
        return prev;
      }
      return [...prev, id];
    });
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const openSchoolModal = (school) => {
    setSelectedSchool(school);
  };

  const closeSchoolModal = () => {
    setSelectedSchool(null);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const filteredSchools = useMemo(() => {
    return schoolsData.schools.filter(school => {
      if (showFavoritesOnly && !favorites.includes(school.id)) return false;
      if (selectedCountries.length > 0 && !selectedCountries.includes(school.country)) return false;
      
      // CGPA ?ôÂ?ÁØ©ÈÅ∏
      if (school.cgpa > 0) {
        if (cgpaMode === 'max' && school.cgpa > cgpaValue) return false;
        if (cgpaMode === 'min' && school.cgpa < cgpaValue) return false;
      }
      
      if (explorerGrant && !school.explorerGrant) return false;
      
      // IELTS ?ôÂ?ÁØ©ÈÅ∏
      const schoolIelts = parseFloat(school.ielts) || 0;
      if (ieltsValue > 0) {
        if (ieltsMode === 'min' && schoolIelts < ieltsValue && schoolIelts > 0) return false;
        if (ieltsMode === 'max' && schoolIelts > ieltsValue) return false;
      }
      
      // ?êÁ??ôÂ?ÁØ©ÈÅ∏
      if (budgetMode === 'max' && school.budget > budgetValue) return false;
      if (budgetMode === 'min' && school.budget < budgetValue) return false;
      
      // ?úÁ¥¢ - ?¥Â??∞Êõ¥Â§öÂ?ÊÆ?      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const searchable = [
          school.name,
          school.country,
          school.city,
          school.notes,
          school.ielts,
          school.toefl,
          school.semester,
          ...(school.languages || []),
          ...(school.uniqueFeatures || []),
          school.selectionFactors?.academicFit || ''
        ].join(' ').toLowerCase();
        if (!searchable.includes(term)) return false;
      }
      
      return true;
    });
  }, [selectedCountries, cgpaMode, cgpaValue, explorerGrant, ieltsMode, ieltsValue, budgetMode, budgetValue, showFavoritesOnly, favorites, searchTerm]);

  const toggleCountry = (country) => {
    setSelectedCountries(prev => 
      prev.includes(country) 
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const clearFilters = () => {
    setSelectedCountries([]);
    setCgpaMode('max');
    setCgpaValue(4.0);
    setExplorerGrant(false);
    setIeltsMode('min');
    setIeltsValue(0);
    setBudgetMode('max');
    setBudgetValue(16000);
    setSearchTerm('');
  };

  const toggleSchoolExpand = (id) => {
    setExpandedSchool(expandedSchool === id ? null : id);
  };

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ background: 'var(--bg)' }}>
      {/* Hero Header */}
      <header className="hero-gradient text-white rounded-[32px] p-8 mb-8 shadow-lg relative overflow-hidden">
        <div className="absolute right-[-60px] top-[-60px] w-[220px] h-[220px] rounded-full bg-white/5" />
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
          <div>
            <div className="text-white/75 text-sm mb-2">2026-27 Main Round Application</div>
            <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3 mb-3">
              <Globe className="w-10 h-10 text-[var(--accent)]" />
              {lang === 'zh' ? 'Â∞ãÊâæ‰Ω†Á??Ä‰Ω≥‰∫§?õÈÅ∏?? : 'Find Your Best Exchange Match'}
            </h1>
            <p className="text-white/85 max-w-[70ch] text-lg">
              {lang === 'zh' 
                ? `?èË¶Ω?ÑÂ?Â§ßÂ≠∏ÔºåÊ?Ëº?CGPA ?åË?Ë®ÄË¶ÅÊ?Ôºå‰Ωø?®Êõ¥Ê∏ÖÊô∞?Ñ‰??¢Êâæ?∞Ê??©Â?‰Ω†Á??ÆÁ??∞„ÄÇÂÖ± ${schoolsData.schools.length} ?ìÂ?‰ΩúÈô¢?°„ÄÇ` 
                : `Browse universities by region, compare CGPA and language requirements, and find your perfect match from ${schoolsData.schools.length} partner institutions.`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
              className="px-4 py-2 bg-white/10 text-white rounded-[12px] hover:bg-white/20 transition-all font-medium border border-white/20"
            >
              {lang === 'zh' ? 'EN' : '‰∏≠Ê?'}
            </button>
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-[12px] font-medium transition-all border ${
                showFavoritesOnly 
                  ? 'bg-[var(--accent)] text-[var(--text)] border-[var(--accent)]' 
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              <Heart className={`w-5 h-5 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              {t.favorites} {favorites.length > 0 && `(${favorites.length})`}
            </button>
            {compareList.length > 0 && (
              <button
                onClick={() => setShowComparePanel(!showComparePanel)}
                className={`flex items-center gap-2 px-4 py-2 rounded-[12px] font-medium transition-all border ${
                  showComparePanel 
                    ? 'bg-[var(--accent)] text-[var(--text)] border-[var(--accent)]' 
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                <Scale className="w-5 h-5" />
                {lang === 'zh' ? 'ÊØîË?' : 'Compare'} ({compareList.length})
              </button>
            )}
          </div>
        </div>

        {/* ?úÁ¥¢Ê¨?*/}
        <div className="mt-6 flex gap-3 max-w-[860px]">
          <div className="flex-1 flex items-center bg-white rounded-[18px] p-2">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 text-gray-800 outline-none text-base"
            />
          </div>
          <button
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className="flex items-center gap-2 px-5 py-3 bg-[var(--brand)] text-white rounded-[18px] hover:bg-[var(--brand2)] transition-all font-semibold"
          >
            <Filter className="w-5 h-5" />
            {showFilterPanel ? t.hideFilter : t.showFilter}
          </button>
          <button
            onClick={() => setShowCriteriaGuide(!showCriteriaGuide)}
            className="flex items-center gap-2 px-5 py-3 bg-white/10 text-white rounded-[18px] hover:bg-white/20 transition-all border border-white/20"
          >
            <Lightbulb className="w-5 h-5" />
            {lang === 'zh' ? '?∏Ê†°?áÂ?' : 'Guide'}
          </button>
        </div>

        {/* ?êË¶Ω?êÁ§∫ */}
        <div className="mt-4 p-4 rounded-[20px] bg-[var(--soft)]/30 border border-[var(--brand)]/20 text-[var(--accent)] text-sm">
          {lang === 'zh' 
            ? '?∏Ê?‰æÜÊ?ÔºöCityU GEO I-level Quota PDF (?¥Êñ∞??2026Âπ???6???ÇÈ?ÁÆóÊ†π?öÂÖ∑È´îÂ?Â∏Ç‰º∞ÁÆóÔ??ÖÂê´‰ΩèÂÆø?ÅÈ?È£≤„ÄÅ‰∫§?öÁ??∫Êú¨?üÊ¥ªË≤ª„Ä? 
            : 'Data source: CityU GEO I-level Quota PDF (updated Jan 16, 2026). Budget estimates are city-specific, covering accommodation, food, transport.'}
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ÁØ©ÈÅ∏?¢Êùø - ?∞Ë®≠Ë®?*/}
        {showFilterPanel && (
          <aside className="lg:w-[320px] filter-section p-5 h-fit sticky top-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[var(--text)] flex items-center gap-2">
                <Filter className="w-5 h-5 text-[var(--brand)]" />
                {t.filters}
              </h2>
              <button
                onClick={clearFilters}
                className="text-sm text-[var(--brand)] hover:text-[var(--brand2)] flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-[var(--soft)] transition-all"
              >
                <X className="w-4 h-4" />
                {t.clearAll}
              </button>
            </div>

            {/* ?ãÂÆ∂ÁØ©ÈÅ∏ */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-[var(--text)] mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--muted)]" />
                {t.country}
              </h3>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {countries.map(country => (
                  <label key={country} className="flex items-center gap-2.5 cursor-pointer hover:bg-[var(--bg)] p-2 rounded-[12px] transition-all">
                    <input
                      type="checkbox"
                      checked={selectedCountries.includes(country)}
                      onChange={() => toggleCountry(country)}
                      className="w-4 h-4 text-[var(--brand)] rounded border-[var(--line)] focus:ring-[var(--brand)]"
                    />
                    <span className="text-sm text-[var(--text)]">{country}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* CGPA ?ôÂ?ÁØ©ÈÅ∏ */}
            <div className="mb-5 p-4 bg-[var(--bg)] rounded-[16px]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[var(--text)] flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[var(--muted)]" />
                  {t.cgpaRequirement}
                </h3>
                <div className="flex bg-white rounded-lg p-0.5 border border-[var(--line)]">
                  <button
                    onClick={() => setCgpaMode('max')}
                    className={`px-2 py-1 text-xs rounded-md transition-all ${cgpaMode === 'max' ? 'bg-[var(--brand)] text-white' : 'text-[var(--muted)]'}`}
                  >
                    ??                  </button>
                  <button
                    onClick={() => setCgpaMode('min')}
                    className={`px-2 py-1 text-xs rounded-md transition-all ${cgpaMode === 'min' ? 'bg-[var(--brand)] text-white' : 'text-[var(--muted)]'}`}
                  >
                    ??                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="2.0"
                  max="4.0"
                  step="0.1"
                  value={cgpaValue}
                  onChange={(e) => setCgpaValue(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-[var(--line)] rounded-lg appearance-none cursor-pointer accent-[var(--brand)]"
                />
                <span className="text-sm font-bold text-[var(--brand)] min-w-[3ch]">{cgpaValue.toFixed(1)}</span>
              </div>
              <p className="text-xs text-[var(--muted)] mt-2">
                {cgpaMode === 'max' 
                  ? (lang === 'zh' ? 'È°ØÁ§∫ CGPA Ë¶ÅÊ? ??' : 'Show schools with CGPA ??') + cgpaValue.toFixed(1)
                  : (lang === 'zh' ? 'È°ØÁ§∫ CGPA Ë¶ÅÊ? ??' : 'Show schools with CGPA ??') + cgpaValue.toFixed(1)}
              </p>
            </div>

            {/* IELTS ?ôÂ?ÁØ©ÈÅ∏ */}
            <div className="mb-5 p-4 bg-[var(--bg)] rounded-[16px]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[var(--text)] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[var(--muted)]" />
                  {t.languageRequirement}
                </h3>
                <div className="flex bg-white rounded-lg p-0.5 border border-[var(--line)]">
                  <button
                    onClick={() => setIeltsMode('min')}
                    className={`px-2 py-1 text-xs rounded-md transition-all ${ieltsMode === 'min' ? 'bg-[var(--brand)] text-white' : 'text-[var(--muted)]'}`}
                  >
                    ??                  </button>
                  <button
                    onClick={() => setIeltsMode('max')}
                    className={`px-2 py-1 text-xs rounded-md transition-all ${ieltsMode === 'max' ? 'bg-[var(--brand)] text-white' : 'text-[var(--muted)]'}`}
                  >
                    ??                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="8.0"
                  step="0.5"
                  value={ieltsValue}
                  onChange={(e) => setIeltsValue(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-[var(--line)] rounded-lg appearance-none cursor-pointer accent-[var(--brand)]"
                />
                <span className="text-sm font-bold text-[var(--brand)] min-w-[3ch]">{ieltsValue.toFixed(1)}</span>
              </div>
              <p className="text-xs text-[var(--muted)] mt-2">
                {ieltsMode === 'min' 
                  ? (lang === 'zh' ? 'È°ØÁ§∫ IELTS Ë¶ÅÊ? ??' : 'Show schools with IELTS ??') + ieltsValue.toFixed(1)
                  : (lang === 'zh' ? 'È°ØÁ§∫ IELTS Ë¶ÅÊ? ??' : 'Show schools with IELTS ??') + ieltsValue.toFixed(1)}
              </p>
            </div>

            {/* ?êÁ??ôÂ?ÁØ©ÈÅ∏ */}
            <div className="mb-5 p-4 bg-[var(--bg)] rounded-[16px]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[var(--text)] flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[var(--muted)]" />
                  {t.budgetRange}
                </h3>
                <div className="flex bg-white rounded-lg p-0.5 border border-[var(--line)]">
                  <button
                    onClick={() => setBudgetMode('max')}
                    className={`px-2 py-1 text-xs rounded-md transition-all ${budgetMode === 'max' ? 'bg-[var(--brand)] text-white' : 'text-[var(--muted)]'}`}
                  >
                    ??                  </button>
                  <button
                    onClick={() => setBudgetMode('min')}
                    className={`px-2 py-1 text-xs rounded-md transition-all ${budgetMode === 'min' ? 'bg-[var(--brand)] text-white' : 'text-[var(--muted)]'}`}
                  >
                    ??                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="3000"
                  max="16000"
                  step="500"
                  value={budgetValue}
                  onChange={(e) => setBudgetValue(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-[var(--line)] rounded-lg appearance-none cursor-pointer accent-[var(--brand)]"
                />
                <span className="text-sm font-bold text-[var(--brand)] min-w-[5ch]">HK${(budgetValue/1000).toFixed(0)}K</span>
              </div>
              <p className="text-xs text-[var(--muted)] mt-2">
                {budgetMode === 'max' 
                  ? (lang === 'zh' ? 'È°ØÁ§∫?êÁ? ??HK$' : 'Show budget ??HK$') + budgetValue.toLocaleString() + (lang === 'zh' ? '/?? : '/month')
                  : (lang === 'zh' ? 'È°ØÁ§∫?êÁ? ??HK$' : 'Show budget ??HK$') + budgetValue.toLocaleString() + (lang === 'zh' ? '/?? : '/month')}
              </p>
            </div>

            {/* Explorer Grant */}
            <div className="mb-4 p-3 bg-[var(--soft)]/50 rounded-[12px]">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={explorerGrant}
                  onChange={(e) => setExplorerGrant(e.target.checked)}
                  className="w-5 h-5 text-[var(--brand)] rounded border-[var(--line)] focus:ring-[var(--brand)]"
                />
                <div>
                  <span className="font-semibold text-[var(--text)] flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-[var(--success)]" />
                    {t.explorerGrant}
                  </span>
                  <p className="text-xs text-[var(--muted)]">{t.explorerGrantDesc}</p>
                </div>
              </label>
            </div>

            {/* ÁµêÊ?Áµ±Ë? */}
            <div className="pt-4 border-t border-[var(--line)]">
              <p className="text-sm text-[var(--muted)]">
                {t.results}: <span className="font-bold text-[var(--brand)] text-lg">{filteredSchools.length}</span> / {schoolsData.schools.length} {t.totalSchools}
              </p>
            </div>
          </aside>
        )}

        {/* ?∏Ê?Ê®ôÊ??áÂ? */}
        {showCriteriaGuide && (
          <div className="mb-6 p-6 bg-[var(--card)] border border-[var(--line)] rounded-[24px] shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[var(--text)] flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-[var(--accent)]" />
                {lang === 'zh' ? 'Â¶Ç‰??∏Ê??©Â??Ñ‰∫§?õÂ≠∏?°Ô?' : 'How to Choose the Right Exchange University?'}
              </h2>
              <button onClick={() => setShowCriteriaGuide(false)} className="p-2 hover:bg-[var(--bg)] rounded-full">
                <X className="w-5 h-5 text-[var(--muted)]" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: GraduationCap, title: lang === 'zh' ? 'Â≠∏Ë??πÈ?' : 'Academic Fit', desc: lang === 'zh' ? 'Á¢∫Ë?Ë™≤Á??ØÂê¶?á‰??ÑÂ?Ê•≠Â??àË∂£?∏Á¨¶ÔºåÂ≠∏?ÜËÉΩ?¶Ë??ûCityU' : 'Ensure courses align with your major and credits transfer back to CityU' },
                { icon: Languages, title: lang === 'zh' ? 'Ë™ûË?Ë¶ÅÊ?' : 'Language', desc: lang === 'zh' ? 'Ë©ï‰º∞‰Ω†Á?IELTS/TOEFL?ÜÊï∏ÔºåËÄÉÊÖÆ?ØÂê¶?ÄË¶ÅÂ≠∏ÁøíÁï∂?∞Ë?Ë®Ä' : 'Evaluate your IELTS/TOEFL scores, consider local language needs' },
                { icon: DollarSign, title: lang === 'zh' ? '?êÁ??ÉÈ?' : 'Budget', desc: lang === 'zh' ? '?ÉÊÖÆË©≤Â?Â∏ÇÁ??üÊ¥ªË≤ªÔ?Â∞ãÊâæ?éÂ≠∏?ëÂ?Ë≥áÂä©Ê©üÊ?' : 'Consider city living costs, look for scholarships and grants' },
                { icon: MapPin, title: lang === 'zh' ? '?∞Á?‰ΩçÁΩÆ' : 'Location', desc: lang === 'zh' ? 'Ê∞?Äô„ÄÅÊ??ñ„ÄÅÂ??®„ÄÅÈõ¢ÂÆ∂Ë??¢Ô?‰ª•Â??®È??ÖÈ?Ê©üÊ?' : 'Climate, culture, safety, distance from home, travel opportunities' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-[var(--bg)] rounded-[16px]">
                  <item.icon className="w-8 h-8 text-[var(--brand)] mb-2" />
                  <h3 className="font-semibold text-[var(--text)] mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--muted)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Â≠∏Ê†°?óË°® */}
        <main className="flex-1">
          {filteredSchools.length === 0 ? (
            <div className="glass-effect p-12 text-center">
              <p className="text-[var(--muted)] text-lg mb-4">{t.noResults}</p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                {t.clearFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredSchools.map(school => (
                <div
                  key={school.id}
                  className={`school-card p-5 relative ${expandedSchool === school.id ? 'col-span-1 md:col-span-2 xl:col-span-2' : ''}`}
                >
                  {/* ?∂Ë??âÈ? */}
                  <button
                    onClick={() => toggleFavorite(school.id)}
                    className={`heart-btn absolute top-5 right-5 p-2 rounded-full ${
                      favorites.includes(school.id) 
                        ? 'text-[var(--danger)]' 
                        : 'text-[var(--muted)] hover:text-[var(--danger)]'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${favorites.includes(school.id) ? 'fill-current' : ''}`} />
                  </button>

                  {/* ÂæΩÁ?Ë°?*/}
                  <div className="flex items-center gap-2 mb-3 flex-wrap pr-10">
                    <span className="px-3 py-1 bg-[var(--brand)]/10 text-[var(--brand)] rounded-full text-sm font-medium">
                      {school.country}
                    </span>
                    {school.city && school.city !== 'N/A' && (
                      <span className="px-2 py-1 bg-[var(--bg)] text-[var(--muted)] rounded-full text-xs flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {school.city}
                      </span>
                    )}
                    {school.ranking && (
                      <span className="badge-ranking text-xs font-medium flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        QS #{school.ranking}
                      </span>
                    )}
                    {school.explorerGrant && (
                      <span className="badge-grant text-xs font-medium flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        HK$10K Grant
                      </span>
                    )}
                  </div>

                  {/* Â≠∏Ê†°?çÁ®± */}
                  <h3 className="text-xl font-bold text-[var(--text)] mb-2 pr-10">{school.name}</h3>

                  {/* Ë™ûË?‰ø°ÊÅØ */}
                  {school.languages && (
                    <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-3">
                      <Languages className="w-3.5 h-3.5" />
                      <span>{school.languages.join(' ¬∑ ')}</span>
                    </div>
                  )}

                  {/* ?∏Â?‰ø°ÊÅØ Chips */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="chip flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5" />
                      HK${(school.budget/1000).toFixed(0)}K{lang === 'zh' ? '/?? : '/mo'}
                    </span>
                    <span className="chip flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" />
                      {lang === 'zh' ? '?çÈ?: ' : 'Quota: '}{school.quota}
                    </span>
                    {school.cgpa > 0 && (
                      <span className="chip flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5" />
                        CGPA ??{school.cgpa}
                      </span>
                    )}
                    {school.ielts !== '-' && (
                      <span className="chip flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        IELTS {school.ielts}
                      </span>
                    )}
                  </div>

                  {/* Â≠∏Ê†°?®Áâπ?πËâ≤ */}
                  {school.uniqueFeatures && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[var(--brand)] mb-2">
                        <CheckCircle2 className="w-4 h-4" />
                        {lang === 'zh' ? 'Â≠∏Ê†°?πËâ≤' : 'University Highlights'}
                      </div>
                      <ul className="space-y-1">
                        {school.uniqueFeatures.slice(0, expandedSchool === school.id ? 5 : 2).map((feature, i) => (
                          <li key={i} className="text-sm text-[var(--text)] flex items-start gap-2">
                            <span className="text-[var(--accent)] mt-1">??/span>
                            <span className="flex-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {school.uniqueFeatures.length > 2 && (
                        <button
                          onClick={() => toggleSchoolExpand(school.id)}
                          className="mt-2 text-sm text-[var(--brand)] hover:text-[var(--brand2)] flex items-center gap-1"
                        >
                          {expandedSchool === school.id ? (
                            <><ChevronUp className="w-4 h-4" /> {lang === 'zh' ? '?∂Ëµ∑' : 'Show less'}</>
                          ) : (
                            <><ChevronDown className="w-4 h-4" /> {lang === 'zh' ? `?ÑÊ? ${school.uniqueFeatures.length - 2} ??..` : `${school.uniqueFeatures.length - 2} more...`}</>
                          )}
                        </button>
                      )}
                    </div>
                  )}

                  {/* ?∏Ê?Ê®ôÊ?Ê®ôÁ±§ */}
                  {school.selectionFactors && (
                    <div className="mb-4 p-3 bg-[var(--soft)]/50 rounded-[12px]">
                      <div className="text-xs text-[var(--muted)] mb-1">{lang === 'zh' ? '?©Â?‰Ω†Ô?Â¶ÇÊ?Ôº? : 'Good fit if you:'}</div>
                      <div className="text-sm text-[var(--text)]">{school.selectionFactors.academicFit}</div>
                    </div>
                  )}

                  {/* ?ç‰??âÈ? */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => openSchoolModal(school)}
                      className="btn-primary text-sm flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {lang === 'zh' ? '?•Á?Ë©≥Ê?' : 'View Details'}
                    </button>
                    <button
                      onClick={() => toggleCompare(school.id)}
                      className={`px-4 py-2 rounded-[12px] text-sm font-medium flex items-center gap-1.5 transition-all ${
                        compareList.includes(school.id)
                          ? 'bg-[var(--danger)]/10 text-[var(--danger)] border border-[var(--danger)]'
                          : 'bg-[var(--bg)] text-[var(--text)] border border-[var(--line)] hover:border-[var(--brand)]'
                      }`}
                    >
                      {compareList.includes(school.id) ? (
                        <><Minus className="w-4 h-4" /> {lang === 'zh' ? 'ÁßªÂá∫ÊØîË?' : 'Remove'}</>
                      ) : (
                        <><Plus className="w-4 h-4" /> {lang === 'zh' ? '?†ÂÖ•ÊØîË?' : 'Compare'}</>
                      )}
                    </button>
                  </div>

                  {/* Â±ïÈ??ÑË©≥Á¥∞‰ø°??*/}
                  {expandedSchool === school.id && (
                    <div className="mt-4 pt-4 border-t border-[var(--line)]">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-[var(--muted)]">{t.semester}:</span>
                          <p className="font-medium text-[var(--text)]">{school.semester}</p>
                        </div>
                        <div>
                          <span className="text-[var(--muted)]">{t.budget}:</span>
                          <p className="font-medium text-[var(--text)]">HK${school.budget.toLocaleString()}{lang === 'zh' ? '/?? : '/month'}</p>
                        </div>
                        {school.toefl !== '-' && (
                          <div>
                            <span className="text-[var(--muted)]">TOEFL:</span>
                            <p className="font-medium text-[var(--text)]">{school.toefl}</p>
                          </div>
                        )}
                      </div>
                      {school.notes && (
                        <div className="mt-3 p-3 bg-[var(--warning)]/10 rounded-[12px] border border-[var(--warning)]/20">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-[var(--warning)] mt-0.5" />
                            <p className="text-sm text-[var(--warning)]">{school.notes}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ÊØîË??ΩÂ? */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-48px)] bg-[var(--card)] border border-[var(--line)] rounded-[24px] shadow-[0_18px_38px_rgba(0,0,0,0.18)] p-5 z-20">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-[var(--text)] flex items-center gap-2">
              <Scale className="w-5 h-5 text-[var(--brand)]" />
              {lang === 'zh' ? 'ÊØîË?Ê∏ÖÂñÆ' : 'Compare'} ({compareList.length}/4)
            </h4>
            <div className="flex gap-2">
              <button
                onClick={() => setShowComparePanel(!showComparePanel)}
                className="text-sm px-3 py-1.5 bg-[var(--brand)] text-white rounded-full hover:bg-[var(--brand2)] transition-all"
              >
                {showComparePanel 
                  ? (lang === 'zh' ? '?±Ë?' : 'Hide') 
                  : (lang === 'zh' ? 'Â±ïÈ?' : 'Expand')}
              </button>
              <button
                onClick={clearCompare}
                className="text-sm px-3 py-1.5 border border-[var(--line)] rounded-full hover:bg-[var(--bg)] transition-all"
              >
                {lang === 'zh' ? 'Ê∏ÖÈô§' : 'Clear'}
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {compareList.map(id => {
              const school = schoolsData.schools.find(s => s.id === id);
              return (
                <span key={id} className="inline-flex items-center gap-1.5 bg-[var(--bg)] border border-[var(--line)] px-3 py-1.5 rounded-full text-sm">
                  {school?.name}
                  <button
                    onClick={() => toggleCompare(id)}
                    className="text-[var(--muted)] hover:text-[var(--danger)]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              );
            })}
          </div>

          {showComparePanel && compareList.length >= 2 && (
            <div className="border-t border-[var(--line)] pt-4">
              <h5 className="font-semibold text-sm mb-3 text-[var(--text)]">
                {lang === 'zh' ? 'ÊØîË?Ë°®Ê†º' : 'Comparison Table'}
              </h5>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--line)]">
                      <th className="text-left py-2 text-[var(--muted)] font-medium">{lang === 'zh' ? '?ÖÁõÆ' : 'Item'}</th>
                      {compareList.map(id => {
                        const school = schoolsData.schools.find(s => s.id === id);
                        return (
                          <th key={id} className="text-left py-2 px-3 font-semibold text-[var(--text)] min-w-[120px]">
                            {school?.name}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: lang === 'zh' ? '?ãÂÆ∂' : 'Country', key: 'country' },
                      { label: lang === 'zh' ? '?éÂ?' : 'City', key: 'city' },
                      { label: lang === 'zh' ? '?çÈ?' : 'Quota', key: 'quota' },
                      { label: lang === 'zh' ? 'CGPA' : 'CGPA', key: 'cgpa', format: (v) => v > 0 ? `??${v}` : '-' },
                      { label: lang === 'zh' ? 'IELTS' : 'IELTS', key: 'ielts' },
                      { label: lang === 'zh' ? 'Â≠∏Ê?' : 'Semester', key: 'semester' },
                      { label: lang === 'zh' ? '?êÁ?/?? : 'Budget/mo', key: 'budget', format: (v) => `HK$${v?.toLocaleString()}` },
                      { label: 'QS ' + (lang === 'zh' ? '?íÂ?' : 'Rank'), key: 'ranking', format: (v) => v ? `#${v}` : '-' },
                      { label: lang === 'zh' ? 'Ë≥áÂä©' : 'Grant', key: 'explorerGrant', format: (v) => v ? (lang === 'zh' ? '?? : 'Yes') : (lang === 'zh' ? '?? : 'No') },
                    ].map((row, idx) => (
                      <tr key={row.key} className="border-b border-[var(--line)]/50">
                        <td className="py-2 text-[var(--muted)]">{row.label}</td>
                        {compareList.map(id => {
                          const school = schoolsData.schools.find(s => s.id === id);
                          const value = school?.[row.key];
                          return (
                            <td key={id} className="py-2 px-3 text-[var(--text)]">
                              {row.format ? row.format(value) : value || '-'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ë©≥Ê?ÂΩàÁ? */}
      {selectedSchool && (
        <div 
          className="fixed inset-0 bg-black/45 flex items-center justify-center p-4 md:p-8 z-30"
          onClick={closeSchoolModal}
        >
          <div 
            className="w-full max-w-[840px] max-h-[90vh] overflow-y-auto bg-[var(--card)] rounded-[28px] p-6 md:p-8 border border-[var(--line)] shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
            onClick={e => e.stopPropagation()}
          >
            {/* ÂΩàÁ??≠ÈÉ® */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[var(--text)] mb-2">{selectedSchool.name}</h2>
                <p className="text-[var(--muted)]">{selectedSchool.city} ¬∑ {selectedSchool.country} ¬∑ {selectedSchool.region}</p>
              </div>
              <button
                onClick={closeSchoolModal}
                className="p-2 border border-[var(--line)] rounded-full hover:bg-[var(--bg)] transition-all"
              >
                <X className="w-5 h-5 text-[var(--muted)]" />
              </button>
            </div>

            {/* Âø´ÈÄü‰ø°?ØË? */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="chip">{lang === 'zh' ? '?çÈ?' : 'Quota'}: {selectedSchool.quota}</span>
              <span className="chip">CGPA: {selectedSchool.cgpa > 0 ? `??${selectedSchool.cgpa}` : '-'}</span>
              <span className="chip">IELTS: {selectedSchool.ielts}</span>
              <span className="chip">QS #{selectedSchool.ranking || '-'}</span>
              <span className="chip">{lang === 'zh' ? '?êÁ?' : 'Budget'}: HK${selectedSchool.budget?.toLocaleString()}{lang === 'zh' ? '/?? : '/mo'}</span>
              {selectedSchool.explorerGrant && (
                <span className="badge-grant text-xs">HK$10K Grant</span>
              )}
            </div>

            {/* Ë©≥Á¥∞‰ø°ÊÅØÁ∂≤Ê†º */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* ?∫Êú¨Ë¶ÅÊ? */}
              <div className="p-4 bg-[var(--bg)] rounded-[18px] border border-[var(--line)]">
                <h5 className="font-semibold text-[var(--text)] mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--brand)]" />
                  {lang === 'zh' ? '?∫Êú¨Ë¶ÅÊ?' : 'Core Requirements'}
                </h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-[var(--muted)]">{lang === 'zh' ? 'Ë™ûË?Ë¶ÅÊ?' : 'Language'}:</span>
                    <span className="text-[var(--text)] font-medium">{selectedSchool.ielts !== '-' ? `IELTS ${selectedSchool.ielts}` : ''} {selectedSchool.toefl !== '-' ? `TOEFL ${selectedSchool.toefl}` : lang === 'zh' ? '?°ÁâπÂÆöË?Ê±? : 'No specific'}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-[var(--muted)]">{lang === 'zh' ? 'Â≠∏Ê??ÇÈ?' : 'Semester'}:</span>
                    <span className="text-[var(--text)] font-medium">{selectedSchool.semester}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-[var(--muted)]">{lang === 'zh' ? '?°Â?Ë™ûË?' : 'Campus languages'}:</span>
                    <span className="text-[var(--text)] font-medium">{(selectedSchool.languages || []).join(', ')}</span>
                  </li>
                </ul>
              </div>

              {/* Â≠∏Ë??çÂ? */}
              <div className="p-4 bg-[var(--bg)] rounded-[18px] border border-[var(--line)]">
                <h5 className="font-semibold text-[var(--text)] mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[var(--brand)]" />
                  {lang === 'zh' ? 'Â≠∏Ë??çÂ?' : 'Academic Fit'}
                </h5>
                <ul className="space-y-2 text-sm">
                  <li>
                    <span className="text-[var(--muted)]">{lang === 'zh' ? '?©Â?Â∞àÊ•≠: ' : 'Good for: '}</span>
                    <span className="text-[var(--text)]">{selectedSchool.selectionFactors?.academicFit}</span>
                  </li>
                  <li>
                    <span className="text-[var(--muted)]">{lang === 'zh' ? '?ØÊè¥?çÂ?: ' : 'Support: '}</span>
                    <span className="text-[var(--text)]">{selectedSchool.selectionFactors?.supportServices}</span>
                  </li>
                </ul>
              </div>

              {/* Â≠∏Ê†°?πËâ≤ */}
              <div className="p-4 bg-[var(--bg)] rounded-[18px] border border-[var(--line)] md:col-span-2">
                <h5 className="font-semibold text-[var(--text)] mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-[var(--accent)]" />
                  {lang === 'zh' ? 'Â≠∏Ê†°?πËâ≤' : 'University Highlights'}
                </h5>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {(selectedSchool.uniqueFeatures || []).map((feature, i) => (
                    <li key={i} className="text-sm text-[var(--text)] flex items-start gap-2">
                      <span className="text-[var(--accent)] mt-1">??/span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ?áÂ?È´îÈ? */}
              <div className="p-4 bg-[var(--bg)] rounded-[18px] border border-[var(--line)]">
                <h5 className="font-semibold text-[var(--text)] mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[var(--brand)]" />
                  {lang === 'zh' ? '?áÂ?È´îÈ?' : 'Cultural Experience'}
                </h5>
                <p className="text-sm text-[var(--text)]">{selectedSchool.selectionFactors?.culturalExperience}</p>
                <p className="text-sm text-[var(--muted)] mt-2">{lang === 'zh' ? '?êÁ?Ê∞¥Âπ≥: ' : 'Budget level: '}{selectedSchool.selectionFactors?.budgetLevel}</p>
              </div>

              {/* ?çË??ôË®ª */}
              {selectedSchool.notes && (
                <div className="p-4 bg-[var(--warning)]/10 rounded-[18px] border border-[var(--warning)]/20">
                  <h5 className="font-semibold text-[var(--warning)] mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {lang === 'zh' ? '?çË??ôË®ª' : 'Important Notes'}
                  </h5>
                  <p className="text-sm text-[var(--warning)]">{selectedSchool.notes}</p>
                </div>
              )}
            </div>

            {/* Â∫ïÈÉ®?ç‰? */}
            <div className="flex gap-3 pt-4 border-t border-[var(--line)]">
              {selectedSchool.website && (
                <a
                  href={selectedSchool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  {lang === 'zh' ? 'Ë®™Â?ÂÆòÁ∂≤' : 'Visit Website'}
                </a>
              )}
              <button
                onClick={() => {
                  toggleCompare(selectedSchool.id);
                }}
                className={`px-5 py-2.5 rounded-[12px] font-medium flex items-center gap-2 transition-all ${
                  compareList.includes(selectedSchool.id)
                    ? 'bg-[var(--danger)]/10 text-[var(--danger)] border border-[var(--danger)]'
                    : 'bg-[var(--bg)] text-[var(--text)] border border-[var(--line)] hover:border-[var(--brand)]'
                }`}
              >
                {compareList.includes(selectedSchool.id) ? (
                  <><Minus className="w-4 h-4" /> {lang === 'zh' ? 'ÁßªÂá∫ÊØîË?' : 'Remove from compare'}</>
                ) : (
                  <><Plus className="w-4 h-4" /> {lang === 'zh' ? '?†ÂÖ•ÊØîË?' : 'Add to compare'}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ?†Ë??Ä??*/}
      {loading && (
        <div className="fixed inset-0 bg-[var(--bg)] flex items-center justify-center z-50">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-[var(--brand)] animate-spin mx-auto mb-4" />
            <p className="text-[var(--muted)]">{lang === 'zh' ? 'Ê≠?ú®ËºâÂÖ•?∏Ê?...' : 'Loading data...'}</p>
          </div>
        </div>
      )}

      {/* ?ØË™§?Ä??*/}
      {error && !loading && (
        <div className="fixed inset-0 bg-[var(--bg)] flex items-center justify-center z-50">
          <div className="text-center max-w-md p-6">
            <AlertCircle className="w-12 h-12 text-[var(--danger)] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[var(--text)] mb-2">
              {lang === 'zh' ? 'ËºâÂÖ•Â§±Ê?' : 'Failed to Load'}
            </h3>
            <p className="text-[var(--muted)] mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              {lang === 'zh' ? '?çÊñ∞ËºâÂÖ•' : 'Reload'}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 text-center text-[var(--muted)] text-sm pb-6">
        <p>{t.footer}</p>
        <p className="mt-1">Created for Peter ¬∑ {t.disclaimer}</p>
        <p className="mt-2 text-xs">{lang === 'zh' ? '?êÁ?‰º∞Á??∫Êñº2026Âπ¥Êï∏?öÔ?ÂØ¶È?Ë≤ªÁî®?ØËÉΩ?âÊ?‰∏çÂ?' : 'Budget estimates based on 2026 data, actual costs may vary'}</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
