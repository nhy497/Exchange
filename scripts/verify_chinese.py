import json

with open('C:\\Users\\Ng\\CascadeProjects\\exchange-finder\\data\\schools_complete.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print('總學校數量:', len(data['schools']))
print('\n=== 前3所學校的中文內容驗證 ===\n')

for school in data['schools'][:3]:
    print(f'--- {school["name"]} ---')
    print(f'  國家中文: {school.get("countryZh", "N/A")}')
    print(f'  城市中文: {school.get("cityZh", "N/A")}')
    print(f'  配額中文: {school.get("quotaZh", "N/A")}')
    print(f'  氣候中文: {school.get("climateZh", "")[:30]}...')
    print(f'  美食中文: {school.get("foodCultureZh", "")[:30]}...')
    print(f'  特色中文: {school.get("uniqueFeaturesZh", [])[:2]}')
    print(f'  語言中文: {school.get("languagesZh", [])[:2]}')
    print()

# 統計有多少學校有中文內容
has_country_zh = sum(1 for s in data['schools'] if s.get('countryZh'))
has_city_zh = sum(1 for s in data['schools'] if s.get('cityZh'))
has_features_zh = sum(1 for s in data['schools'] if s.get('uniqueFeaturesZh'))
has_food_zh = sum(1 for s in data['schools'] if s.get('foodCultureZh'))
has_climate_zh = sum(1 for s in data['schools'] if s.get('climateZh'))

print('=== 中文內容覆蓋統計 ===')
print(f'有 countryZh: {has_country_zh}/{len(data["schools"])}')
print(f'有 cityZh: {has_city_zh}/{len(data["schools"])}')
print(f'有 uniqueFeaturesZh: {has_features_zh}/{len(data["schools"])}')
print(f'有 foodCultureZh: {has_food_zh}/{len(data["schools"])}')
print(f'有 climateZh: {has_climate_zh}/{len(data["schools"])}')
print('\n數據驗證完成！')
