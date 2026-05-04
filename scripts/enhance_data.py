import json

# 城市預算映射
city_budgets = {
    'Buenos Aires': 4800, 'Adelaide': 10500, 'Perth': 10000, 'Brisbane': 9800,
    'Brisbane/Gold Coast': 9500, 'Sydney': 12500, 'Melbourne': 11500, 'Newcastle': 8500,
    'Hobart': 7500, 'Wollongong': 9000, 'Linz': 8500, 'Vienna': 9200, 'Leuven': 9500,
    'Toronto': 14000, 'Waterloo': 11000, 'Burnaby': 10000, 'Vancouver': 13500,
    'Santiago': 5500, 'Beijing': 4500, 'Xi\'an': 3800, 'Wuhan': 3500,
    'Copenhagen': 11500, 'Tampere': 9000, 'Turku': 8500, 'Paris': 11000,
    'Gif-sur-Yvette': 10500, 'Hamburg': 9500, 'Aachen': 9000, 'Munich': 10500,
    'Mannheim': 8800, 'Dublin': 12000, 'Milan': 9000, 'Tokyo': 12500,
    'Kyoto': 11000, 'Nagoya': 10500, 'Sendai': 9500, 'Yokohama': 12000,
    'Seoul': 10000, 'Daejeon': 8500, 'Amsterdam': 11500, 'Delft': 10500,
    'Auckland': 13000, 'Wellington': 11000, 'Bergen': 12500, 'Oslo': 13000,
    'Singapore': 14000, 'Barcelona': 8500, 'Stockholm': 11000, 'Lund': 10000,
    'Uppsala': 10500, 'St. Gallen': 12500, 'Zurich': 14000, 'Taipei': 7000,
    'Hsinchu': 6500, 'Tainan': 6000, 'Bangkok': 5000, 'London': 15000,
    'Edinburgh': 12000, 'Glasgow': 10500, 'Manchester': 11500, 'Birmingham': 10000,
    'Leeds': 9500, 'Nottingham': 9500, 'Sheffield': 9000, 'Warwick': 11000,
    'Boston': 13500, 'Atlanta': 12000, 'New York': 16000, 'State College': 10000,
    'West Lafayette': 9000, 'Berkeley': 15500, 'Davis': 14000, 'Los Angeles': 15000,
    'Urbana-Champaign': 9500, 'Ann Arbor': 12000, 'Chapel Hill': 10500,
    'Austin': 11000, 'Charlottesville': 10000, 'Seattle': 14000, 'Madison': 10500,
}

# 國家語言映射
region_languages = {
    'Argentina': ['Spanish (primary)', 'English (limited)'],
    'Australia': ['English'],
    'Austria': ['German (primary)', 'English (university)'],
    'Belgium': ['Dutch/French/German', 'English (high)'],
    'Canada': ['English (primary)', 'French (Quebec only)'],
    'Chile': ['Spanish (primary)', 'English (limited)'],
    'Chinese Mainland': ['Mandarin Chinese (primary)', 'English (academic)'],
    'Denmark': ['Danish (primary)', 'English (very high)'],
    'Finland': ['Finnish/Swedish (primary)', 'English (very high)'],
    'France': ['French (primary)', 'English (variable)'],
    'Germany': ['German (primary)', 'English (good at universities)'],
    'Ireland': ['English', 'Irish Gaelic (limited)'],
    'Italy': ['Italian (primary)', 'English (limited)'],
    'Japan': ['Japanese (primary)', 'English (limited outside campus)'],
    'Korea, Republic of': ['Korean (primary)', 'English (growing)'],
    'Netherlands': ['Dutch (primary)', 'English (excellent)'],
    'New Zealand': ['English', 'Maori (limited)'],
    'Norway': ['Norwegian (primary)', 'English (very high)'],
    'Singapore': ['English (primary)', 'Mandarin/Malay/Tamil'],
    'Spain': ['Spanish/Catalan (primary)', 'English (limited)'],
    'Sweden': ['Swedish (primary)', 'English (excellent)'],
    'Switzerland': ['German/French/Italian (region-dependent)', 'English (good)'],
    'Taiwan': ['Mandarin Chinese (primary)', 'English (academic)'],
    'Thailand': ['Thai (primary)', 'English (limited outside tourist areas)'],
    'UK': ['English'],
    'USA': ['English'],
}

# 城市映射
university_cities = {
    'University of Toronto': 'Toronto',
    'Simon Fraser University': 'Burnaby',
    'University of Waterloo': 'Waterloo',
    'University of British Columbia': 'Vancouver',
    'Pontificia Universidad Catolica de Chile': 'Santiago',
    'Peking University': 'Beijing',
    'Tsinghua University': 'Beijing',
    'Wuhan University': 'Wuhan',
    'Xi\'an Jiaotong University': 'Xi\'an',
    'University of Copenhagen': 'Copenhagen',
    'Tampere University': 'Tampere',
    'University of Turku': 'Turku',
    'CentraleSupélec': 'Gif-sur-Yvette',
    'Sciences Po': 'Paris',
    'Hamburg University of Applied Sciences': 'Hamburg',
    'RWTH Aachen University': 'Aachen',
    'Technical University of Munich': 'Munich',
    'University of Mannheim': 'Mannheim',
    'Trinity College Dublin': 'Dublin',
    'University College Dublin': 'Dublin',
    'Bocconi University': 'Milan',
    'Hitotsubashi University': 'Tokyo',
    'Kyoto University': 'Kyoto',
    'Nagoya University': 'Nagoya',
    'Sophia University': 'Tokyo',
    'Tohoku University': 'Sendai',
    'Tokyo Institute of Technology': 'Yokohama',
    'University of Tokyo': 'Tokyo',
    'Waseda University': 'Tokyo',
    'KAIST': 'Daejeon',
    'Seoul National University': 'Seoul',
    'Yonsei University': 'Seoul',
    'Delft University of Technology': 'Delft',
    'University of Amsterdam': 'Amsterdam',
    'University of Auckland': 'Auckland',
    'Victoria University of Wellington': 'Wellington',
    'University of Bergen': 'Bergen',
    'University of Oslo': 'Oslo',
    'National University of Singapore': 'Singapore',
    'Nanyang Technological University': 'Singapore',
    'University of Navarra': 'Barcelona',
    'KTH Royal Institute of Technology': 'Stockholm',
    'Lund University': 'Lund',
    'Stockholm University': 'Stockholm',
    'University of St. Gallen': 'St. Gallen',
    'University of Zurich': 'Zurich',
    'National Cheng Kung University': 'Tainan',
    'National Taiwan University': 'Taipei',
    'National Tsing Hua University': 'Hsinchu',
    'Chulalongkorn University': 'Bangkok',
    'Imperial College London': 'London',
    'University College London': 'London',
    'University of Edinburgh': 'Edinburgh',
    'University of Glasgow': 'Glasgow',
    'University of Manchester': 'Manchester',
    'University of Warwick': 'Warwick',
    'University of Birmingham': 'Birmingham',
    'University of Leeds': 'Leeds',
    'University of Nottingham': 'Nottingham',
    'University of Sheffield': 'Sheffield',
    'Boston University': 'Boston',
    'Georgia Institute of Technology': 'Atlanta',
    'New York University': 'New York',
    'Pennsylvania State University': 'State College',
    'Purdue University': 'West Lafayette',
    'University of California, Berkeley': 'Berkeley',
    'University of California, Davis': 'Davis',
    'University of California, Los Angeles': 'Los Angeles',
    'University of Illinois Urbana-Champaign': 'Urbana-Champaign',
    'University of Michigan': 'Ann Arbor',
    'University of North Carolina at Chapel Hill': 'Chapel Hill',
    'University of Texas at Austin': 'Austin',
    'University of Virginia': 'Charlottesville',
    'University of Washington': 'Seattle',
    'University of Wisconsin-Madison': 'Madison',
    'Johannes Kepler University Linz': 'Linz',
    'University of Vienna': 'Vienna',
    'KU Leuven': 'Leuven',
}

# 學校獨特特色
unique_features = {
    'University of Toronto': ['Canada\'s top-ranked university', 'Three campuses (St. George, Mississauga, Scarborough)', 'Strong research across all disciplines', 'Located in downtown Toronto'],
    'Simon Fraser University': ['Mountain-top campus in Burnaby', 'Strong in computing and engineering', 'Innovative semester system'],
    'University of Waterloo': ['World-famous co-op program', 'Canada\'s MIT for engineering', 'Strong industry connections', 'High graduate employment rate'],
    'Peking University': ['China\'s Harvard', 'Historic campus with Weiming Lake', 'Top humanities and social sciences in China', 'Requires Mainland Travel Permit'],
    'Tsinghua University': ['China\'s MIT', 'Premier engineering and technology', 'Campus near Summer Palace', 'Requires Mainland Travel Permit'],
    'Wuhan University': ['Beautiful cherry blossom campus', 'Top 10 in China', 'Strong remote sensing and surveying', 'Requires Mainland Travel Permit'],
    'Kyoto University': ['Japan\'s second-oldest university', 'Nobel laureates affiliation', 'Historic Kyoto setting', 'Research-intensive'],
    'University of Tokyo': ['Japan\'s top university', 'Most prestigious in Asia', 'Campus in heart of Tokyo', 'Hongo campus with historic gates'],
    'Seoul National University': ['Korea\'s #1 university', 'Located in Gwanak Mountain', 'Most selective in Korea', 'Comprehensive research university'],
    'KAIST': ['Korea\'s MIT', 'Science and technology focus', 'English-medium instruction', 'Daejeon research hub'],
    'National University of Singapore': ['Asia\'s top university (QS 2025)', 'Global education hub', 'Tropical campus', 'Strong industry partnerships'],
    'Imperial College London': ['World #2 (QS 2025)', 'STEM-focused only', 'South Kensington location', 'Elite research-intensive'],
    'University College London': ['London\'s first university', 'Comprehensive research', 'Bloomsbury location', 'High international diversity'],
    'University of Edinburgh': ['Scotland\'s top university', 'Historic Old Town campus', 'Strong AI and informatics', 'Famous Festival city'],
    'University of California, Berkeley': ['Public Ivy', 'Activism history', 'Top computer science', 'Silicon Valley proximity'],
    'University of California, Los Angeles': ['Top public university', 'Beautiful Westwood campus', 'Strong film and media', 'Los Angeles location'],
    'New York University': ['Manhattan campus', 'Global network university', 'Strong arts and business', 'Greenwich Village location'],
    'Delft University of Technology': ['Netherlands\' top engineering', 'Historic canal-side campus', 'Architecture powerhouse', 'Bike-friendly city'],
    'Technical University of Munich': ['Germany\'s excellence university', 'Strong industry links', 'Munich tech hub', 'TUM is TUM'],
}

# 加載原始數據
with open('C:\\Users\\Ng\\CascadeProjects\\exchange-finder\\data\\schools.json', 'r', encoding='utf-8') as f:
    original = json.load(f)

# 增強數據
enhanced_schools = []

for school in original['schools']:
    name = school['name']
    country = school['country']
    
    # 獲取城市
    city = university_cities.get(name, 'N/A')
    if city == 'N/A':
        # 嘗試從country提取
        if country in ['Argentina']:
            city = 'Buenos Aires'
        elif country == 'Chile':
            city = 'Santiago'
        elif country == 'New Zealand':
            city = 'Auckland'
        elif country == 'Singapore':
            city = 'Singapore'
        elif country == 'Ireland':
            city = 'Dublin'
    
    # 獲取預算
    budget = city_budgets.get(city, 9000)
    
    # 獲取語言
    languages = region_languages.get(country, ['English'])
    
    # 獲取特色
    features = unique_features.get(name, [
        f'Top university in {country}',
        'Exchange program available',
        'Check website for more details'
    ])
    
    # 構建增強版學校數據
    enhanced_school = {
        **school,
        'city': city,
        'budget': budget,
        'languages': languages,
        'uniqueFeatures': features,
        'selectionFactors': {
            'academicFit': school.get('notes', 'General exchange program'),
            'culturalExperience': f'Experience {country} culture',
            'budgetLevel': f'HK${budget:,}/month',
            'language': ', '.join(languages)
        }
    }
    
    enhanced_schools.append(enhanced_school)

# 構建完整數據
result = {
    'metadata': {
        'version': '2.0',
        'lastUpdated': '2026-01-16',
        'source': 'CityU GEO I-level Quota PDF',
        'selectionCriteria': [
            'academicFit',
            'languageRequirements', 
            'budgetConstraints',
            'locationPreferences',
            'semesterCompatibility',
            'careerGoals',
            'culturalExperience',
            'supportServices'
        ],
        'budgetNote': 'Monthly living expenses in HKD, varies by city',
        'languageNote': 'Primary language and English availability'
    },
    'schools': enhanced_schools
}

# 保存
with open('C:\\Users\\Ng\\CascadeProjects\\exchange-finder\\data\\schools_complete.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

print(f'Enhanced {len(enhanced_schools)} schools')
print('Saved to schools_complete.json')

# 統計
from collections import Counter
cities_count = Counter(s['city'] for s in enhanced_schools)
print(f'\nCities covered: {len(cities_count)}')
avg_budget = sum(s['budget'] for s in enhanced_schools) / len(enhanced_schools)
print('Average budget: ' + str(int(avg_budget)) + ' HKD')
