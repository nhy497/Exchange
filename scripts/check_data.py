import json

with open('C:/Users/Ng/CascadeProjects/exchange-finder/data/schools_complete.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Check first school
school = data['schools'][0]
print('School:', school['name'])
print()
print('English fields:')
print('  country:', school.get('country'))
print('  city:', school.get('city'))
print('  climate:', school.get('climate', '')[:50])
print('  foodCulture:', school.get('foodCulture', '')[:50])
print('  uniqueFeatures:', school.get('uniqueFeatures', [])[:2])
print()
print('Chinese fields:')
print('  countryZh:', school.get('countryZh', 'MISSING'))
print('  cityZh:', school.get('cityZh', 'MISSING'))
print('  climateZh:', school.get('climateZh', 'MISSING')[:50] if school.get('climateZh') else 'MISSING')
print('  foodCultureZh:', school.get('foodCultureZh', 'MISSING')[:50] if school.get('foodCultureZh') else 'MISSING')
print('  uniqueFeaturesZh:', school.get('uniqueFeaturesZh', 'MISSING')[:2] if school.get('uniqueFeaturesZh') else 'MISSING')
print()

# Count how many have Chinese fields
total = len(data['schools'])
has_country_zh = sum(1 for s in data['schools'] if s.get('countryZh'))
has_city_zh = sum(1 for s in data['schools'] if s.get('cityZh'))
has_climate_zh = sum(1 for s in data['schools'] if s.get('climateZh'))

print(f'Coverage: {has_country_zh}/{total} have countryZh, {has_city_zh}/{total} have cityZh, {has_climate_zh}/{total} have climateZh')
