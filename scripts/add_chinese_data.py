import json

# 讀取現有數據
with open('C:\\Users\\Ng\\CascadeProjects\\exchange-finder\\data\\schools_complete.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 國家中文名稱映射
country_names_zh = {
    'Argentina': '阿根廷',
    'Australia': '澳洲',
    'Austria': '奧地利',
    'Belgium': '比利時',
    'Canada': '加拿大',
    'Chile': '智利',
    'Chinese Mainland': '中國內地',
    'Denmark': '丹麥',
    'Finland': '芬蘭',
    'France': '法國',
    'Germany': '德國',
    'Ireland': '愛爾蘭',
    'Italy': '意大利',
    'Japan': '日本',
    'Korea, Republic of': '韓國',
    'Netherlands': '荷蘭',
    'New Zealand': '新西蘭',
    'Norway': '挪威',
    'Singapore': '新加坡',
    'Spain': '西班牙',
    'Sweden': '瑞典',
    'Switzerland': '瑞士',
    'Taiwan': '台灣',
    'Thailand': '泰國',
    'UK': '英國',
    'USA': '美國'
}

# 城市中文名稱映射
city_names_zh = {
    'Buenos Aires': '布宜諾斯艾利斯',
    'Santiago': '聖地亞哥',
    'Beijing': '北京',
    'Xi\'an': '西安',
    'Wuhan': '武漢',
    'Toronto': '多倫多',
    'Burnaby': '本拿比',
    'Vancouver': '溫哥華',
    'Waterloo': '滑鐵盧',
    'Adelaide': '阿德萊德',
    'Perth': '珀斯',
    'Brisbane': '布里斯班',
    'Brisbane/Gold Coast': '布里斯班/黃金海岸',
    'Sydney': '悉尼',
    'Melbourne': '墨爾本',
    'Newcastle': '紐卡斯爾',
    'Hobart': '霍巴特',
    'Wollongong': '臥龍崗',
    'Linz': '林茨',
    'Vienna': '維也納',
    'Leuven': '魯汶',
    'Copenhagen': '哥本哈根',
    'Tampere': '坦佩雷',
    'Turku': '圖爾庫',
    'Paris': '巴黎',
    'Gif-sur-Yvette': '吉夫敘伊韋特',
    'Hamburg': '漢堡',
    'Aachen': '亞琛',
    'Munich': '慕尼黑',
    'Mannheim': '曼海姆',
    'Dublin': '都柏林',
    'Milan': '米蘭',
    'Tokyo': '東京',
    'Kyoto': '京都',
    'Nagoya': '名古屋',
    'Sendai': '仙台',
    'Yokohama': '橫濱',
    'Seoul': '首爾',
    'Daejeon': '大田',
    'Amsterdam': '阿姆斯特丹',
    'Delft': '代爾夫特',
    'Auckland': '奧克蘭',
    'Wellington': '惠靈頓',
    'Bergen': '卑爾根',
    'Oslo': '奧斯陸',
    'Singapore': '新加坡',
    'Barcelona': '巴塞隆拿',
    'Stockholm': '斯德哥爾摩',
    'Lund': '隆德',
    'Uppsala': '烏普薩拉',
    'St. Gallen': '聖加倫',
    'Zurich': '蘇黎世',
    'Taipei': '台北',
    'Hsinchu': '新竹',
    'Tainan': '台南',
    'Bangkok': '曼谷',
    'London': '倫敦',
    'Edinburgh': '愛丁堡',
    'Glasgow': '格拉斯哥',
    'Manchester': '曼徹斯特',
    'Warwick': '華威',
    'Birmingham': '伯明翰',
    'Leeds': '列斯',
    'Nottingham': '諾丁漢',
    'Sheffield': '謝菲爾德',
    'Boston': '波士頓',
    'Atlanta': '亞特蘭大',
    'New York': '紐約',
    'State College': '州立學院',
    'West Lafayette': '西拉法葉',
    'Berkeley': '柏克萊',
    'Davis': '戴維斯',
    'Los Angeles': '洛杉磯',
    'Urbana-Champaign': '厄巴納-香檳',
    'Ann Arbor': '安娜堡',
    'Chapel Hill': '教堂山',
    'Austin': '奧斯汀',
    'Charlottesville': '夏洛茨維爾',
    'Seattle': '西雅圖',
    'Madison': '麥迪遜'
}

# 學校特色中文翻譯映射
unique_features_zh = {
    'University of Toronto': ['加拿大排名第一的大學', '三個校區（聖佐治、密西沙加、士嘉堡）', '所有學科研究實力強勁', '位於多倫多市中心'],
    'Simon Fraser University': ['本拿比山頂校園', '計算機與工程實力強勁', '創新學期制度'],
    'University of Waterloo': ['世界聞名的實習課程', '加拿大工程界的MIT', '強大的業界聯繫', '高畢業生就業率'],
    'Peking University': ['中國的哈佛', '未名湖畔的歷史校園', '中國頂尖人文社會科學', '需回鄉證'],
    'Tsinghua University': ['中國的MIT', '頂尖工程與科技', '校園靠近頤和園', '需回鄉證'],
    'Wuhan University': ['美麗的櫻花校園', '中國前十名', '遙感測繪實力強', '需回鄉證'],
    'Kyoto University': ['日本第二古老的大學', '諾貝爾獎得主母校', '歷史悠久的京都環境', '研究密集型'],
    'University of Tokyo': ['日本頂尖大學', '亞洲最具聲望', '東京市中心校園', '本鄉校園有歷史大門'],
    'Seoul National University': ['韓國第一名校', '位於冠岳山', '韓國最難進的大學', '綜合研究型大學'],
    'KAIST': ['韓國的MIT', '專注科學與科技', '英語授課', '大田研究重鎮'],
    'National University of Singapore': ['亞洲頂尖大學（QS 2025）', '全球教育樞紐', '熱帶校園', '強大的業界合作'],
    'Imperial College London': ['世界第二（QS 2025）', '僅專注STEM領域', '南肯辛頓位置', '精英研究密集型'],
    'University College London': ['倫敦第一所大學', '綜合研究型', '布盧姆斯伯里位置', '高度國際化'],
    'University of Edinburgh': ['蘇格蘭頂尖大學', '歷史悠久的老城校園', 'AI與信息學實力強', '著名的節日之城'],
    'University of California, Berkeley': ['公立常春藤', '學運歷史', '頂尖計算機科學', '鄰近矽谷'],
    'University of California, Los Angeles': ['頂尖公立大學', '美麗的西木區校園', '電影與傳媒實力強', '洛杉磯位置'],
    'New York University': ['曼哈頓校園', '全球網絡大學', '藝術與商業實力強', '格林威治村位置'],
    'Delft University of Technology': ['荷蘭頂尖工程', '運河旁歷史校園', '建築設計重鎮', '單車友好城市'],
    'Technical University of Munich': ['德國精英大學', '強大的業界聯繫', '慕尼黑科技中心', 'TUM就是TUM']
}

# 美食文化中文翻譯
food_culture_zh = {
    'Argentina': '阿根廷以牛排和紅酒聞名，布宜諾斯艾利斯擁有豐富的咖啡文化',
    'Australia': '澳洲提供多元化的美食，新鮮海鮮、現代澳洲菜及亞太地區多元餐飲',
    'Austria': '奧地利以維也納炸豬排、薩赫蛋糕聞名，咖啡文化深厚',
    'Belgium': '比利時以華夫餅、巧克力和啤酒聞名，魯汶學生餐廳選擇豐富',
    'Canada': '加拿大提供多元化美食，多倫多有豐富的亞洲餐飲，溫哥華以海鮮聞名',
    'Chile': '智利以海鮮、紅酒聞名，聖地亞哥有新興的美食場景',
    'Chinese Mainland': '中國內地美食文化豐富，北京有宮廷菜，西安有肉夾饃，武漢有熱乾麵',
    'Denmark': '丹麥以新北歐料理聞名，哥本哈根有米其林餐廳，開放三明治是特色',
    'Finland': '芬蘭以漿果、蘑菇和魚類聞名，咖啡文化濃厚',
    'France': '法國是美食之都，巴黎有世界級餐廳，麵包和芝士是日常生活',
    'Germany': '德國以香腸、啤酒聞名，各地有不同特色菜餚',
    'Ireland': '愛爾蘭以燉肉、海鮮聞名，都柏林有豐富的酒吧文化',
    'Italy': '意大利是美食天堂，米蘭有高端餐飲，各地有不同特色',
    'Japan': '日本美食豐富，東京有壽司、拉麵、天婦羅，京都懷石料理',
    'Korea, Republic of': '韓國以韓燒、泡菜聞名，首爾街頭美食豐富，大田有傳統市場',
    'Netherlands': '荷蘭以芝士、生鯡魚聞名，阿姆斯特丹和代爾夫特有國際美食',
    'New Zealand': '新西蘭以羊肉、海鮮聞名，奧克蘭和惠靈頓有多元文化餐飲',
    'Norway': '挪威以海鮮聞名，特別是三文魚，奧斯陸和卑爾根有美食場景',
    'Singapore': '新加坡是美食天堂，有海南雞飯、肉骨茶、辣椒蟹等',
    'Spain': '西班牙以 tapas 聞名，巴塞隆拿有豐富的加泰羅尼亞美食',
    'Sweden': '瑞典以肉丸、醃魚聞名，斯德哥爾摩有新潮餐廳',
    'Switzerland': '瑞士以芝士火鍋、朱古力聞名，聖加倫和蘇黎世有高端餐飲',
    'Taiwan': '台灣是美食天堂，台北有夜市、小籠包，各地有特色小吃',
    'Thailand': '泰國以街頭美食聞名，曼谷有豐富的泰式料理',
    'UK': '英國飲食多元化，倫敦有世界級餐廳，各地有不同特色',
    'USA': '美國飲食多元化，各地有不同特色菜系'
}

# 氣候中文翻譯
climate_zh = {
    'Argentina': '溫帶氣候，夏季炎熱，冬季涼爽',
    'Australia': '地中海或亞熱帶氣候，適合戶外活動',
    'Austria': '溫帶大陸性氣候，四季分明',
    'Belgium': '溫帶海洋性氣候，溫和濕潤',
    'Canada': '四季分明，冬季寒冷，夏季溫暖',
    'Chile': '地中海氣候，夏季乾燥溫暖，冬季溫和濕潤',
    'Chinese Mainland': '大陸性氣候，四季分明，冬季寒冷',
    'Denmark': '溫帶海洋性氣候，冬季溫和，夏季涼爽',
    'Finland': '大陸性氣候，冬季寒冷，夏季溫暖',
    'France': '溫帶氣候，巴黎溫和濕潤',
    'Germany': '溫帶氣候，四季分明',
    'Ireland': '溫帶海洋性氣候，溫和濕潤',
    'Italy': '地中海氣候，冬季溫和，夏季炎熱',
    'Japan': '四季分明，夏季炎熱潮濕，冬季寒冷',
    'Korea, Republic of': '四季分明，夏季炎熱潮濕，冬季寒冷',
    'Netherlands': '溫帶海洋性氣候，溫和濕潤',
    'New Zealand': '溫帶海洋性氣候，全年溫和',
    'Norway': '海洋性氣候，冬季溫和，夏季涼爽',
    'Singapore': '熱帶雨林氣候，全年炎熱潮濕',
    'Spain': '地中海氣候，夏季炎熱乾燥，冬季溫和',
    'Sweden': '溫帶氣候，冬季寒冷，夏季溫暖',
    'Switzerland': '山區氣候，冬季寒冷，夏季溫和',
    'Taiwan': '亞熱帶氣候，夏季炎熱潮濕，冬季溫和',
    'Thailand': '熱帶季風氣候，全年炎熱，雨季分明',
    'UK': '溫帶海洋性氣候，溫和濕潤',
    'USA': '氣候多樣，依地區而異'
}

# 特別特色通用中文模板
special_features_templates = {
    'Argentina': ['阿根廷頂尖私立大學', '拉丁美洲商學院排名前五', '安全校園，現代設施', '學習西班牙語和探戈文化'],
    'Australia': ['澳洲頂尖研究大學', 'QS 排名前 200', '現代化校園設施', '豐富的學生支援服務'],
    'Austria': ['奧地利頂尖大學', '歐洲中心位置', '音樂和文化氛圍濃厚'],
    'Belgium': ['歐洲頂尖大學', '國際化程度高', '英語課程豐富'],
    'Canada': ['加拿大頂尖大學', '研究實力強勁', '國際化程度高'],
    'Chile': ['智利頂尖大學', '南美洲門戶', '安第斯山脈和太平洋近在咫尺'],
    'Chinese Mainland': ['中國頂尖大學', '深厚的文化底蘊', '學費和生活費較低'],
    'Denmark': ['丹麥頂尖大學', '幸福指數最高的國家', '環保先鋒'],
    'Finland': ['芬蘭頂尖大學', '教育質量世界聞名', '可觀賞極光'],
    'France': ['法國頂尖大學', '工程和管理實力強', '歐洲文化中心'],
    'Germany': ['德國精英大學', '工程和科技領先', '免學費'],
    'Ireland': ['愛爾蘭頂尖大學', '英語環境', '歐盟成員國'],
    'Italy': ['意大利頂尖商學院', '時尚和金融中心', '歷史文化豐富'],
    'Japan': ['日本頂尖大學', '傳統與現代融合', '安全整潔'],
    'Korea, Republic of': ['韓國頂尖大學', '科技產業發達', 'K-pop 文化'],
    'Netherlands': ['荷蘭頂尖大學', '英語授課程度高', '國際化環境'],
    'New Zealand': ['新西蘭頂尖大學', '自然環境優美', '戶外活動豐富'],
    'Norway': ['挪威頂尖大學', '高福利社會', '峽灣美景'],
    'Singapore': ['亞洲頂尖大學', '全球教育樞紐', '多元文化'],
    'Spain': ['西班牙頂尖大學', '地中海生活方式', '建築藝術'],
    'Sweden': ['瑞典頂尖大學', '創新設計聞名', '社會福利完善'],
    'Switzerland': ['瑞士頂尖大學', '金融和商業中心', '多語言環境'],
    'Taiwan': ['台灣頂尖大學', '華人文化濃厚', '科技產業發達'],
    'Thailand': ['泰國頂尖大學', '佛教文化', '熱帶風情'],
    'UK': ['英國頂尖大學', '歷史悠久', '學術傳統深厚'],
    'USA': ['美國頂尖公立/私立大學', '研究資源豐富', '多元文化']
}

# 配額中文說明
def translate_quota(quota):
    if not quota or quota == 'To be updated':
        return '待定'
    if quota == 'N/A':
        return '不適用'
    return quota

# 備註通用翻譯
notes_translations = {
    'Early nomination deadline': '提名截止日期較早',
    'Check course restrictions': '請查閱課程限制',
    'Med, OT, Physio, Speech, Nursing, Pharmacy not open': '醫學、職業治療、物理治療、言語治療、護理、藥學不開放',
    'Psychology, Law, Business quota separate': '心理學、法律、商學配額分開計算',
    'Business School only': '僅商學院開放',
    'Semester 1 & 2 options': '第一學期和第二學期可選',
    'Selection based on merit': '按成績遴選',
    ' quota': '配額',
    'IELTS': '雅思',
    'TOEFL': '托福',
    'no band less than': '單項不低於',
    'Course': '課程',
    'available': '可選',
    'not open': '不開放',
    'restrictions': '限制',
    'apply': '申請',
    'deadline': '截止日期'
}

def translate_notes(notes):
    if not notes:
        return ''
    
    translated = notes
    for en, zh in notes_translations.items():
        translated = translated.replace(en, zh)
    return translated

# 語言中文翻譯
def translate_languages(languages):
    translations = {
        'English': '英語',
        'Spanish': '西班牙語',
        'German': '德語',
        'French': '法語',
        'Italian': '意大利語',
        'Japanese': '日語',
        'Korean': '韓語',
        'Dutch': '荷蘭語',
        'Mandarin Chinese': '普通話',
        'primary': '主要',
        'limited': '有限',
        'high': '高',
        'very high': '非常高',
        'variable': '各異',
        'good at universities': '大學授課良好',
        'limited outside campus': '校園外有限',
        'growing': '日益普及',
        'excellent': '優秀',
        'academic': '學術用語',
        'region-dependent': '依地區而異'
    }
    
    result = []
    for lang in languages:
        translated = lang
        for en, zh in translations.items():
            translated = translated.replace(en, zh)
        result.append(translated)
    return result

# 為每所學校添加中文內容
for school in data['schools']:
    country = school['country']
    name = school['name']
    
    # 添加中文國家名稱
    school['countryZh'] = country_names_zh.get(country, country)
    
    # 添加中文城市名稱
    city = school.get('city', 'N/A')
    school['cityZh'] = city_names_zh.get(city, city)
    
    # 翻譯 uniqueFeatures
    if name in unique_features_zh:
        school['uniqueFeaturesZh'] = unique_features_zh[name]
    else:
        # 使用國家模板
        templates = special_features_templates.get(country, ['頂尖大學', '交換項目開放', '請查閱網站獲取更多資訊'])
        school['uniqueFeaturesZh'] = templates.copy()
    
    # 保留原始 uniqueFeatures 作為英文版本
    if 'uniqueFeatures' not in school:
        school['uniqueFeatures'] = [
            f'Top university in {country}',
            'Exchange program available',
            'Check website for more details'
        ]
    
    # 翻譯 foodCulture
    if name in food_culture_zh:
        school['foodCultureZh'] = food_culture_zh[name]
    elif country in food_culture_zh:
        school['foodCultureZh'] = food_culture_zh[country]
    else:
        school['foodCultureZh'] = f'體驗 {country} 的美食文化'
    
    if 'foodCulture' not in school:
        school['foodCulture'] = f'Experience {country} food culture'
    
    # 翻譯 climate
    school['climateZh'] = climate_zh.get(country, '溫帶氣候')
    if 'climate' not in school:
        school['climate'] = f'{country} climate'
    
    # 翻譯 specialFeatures
    if name in unique_features_zh:
        school['specialFeaturesZh'] = unique_features_zh[name]
    else:
        templates = special_features_templates.get(country, ['頂尖大學', '交換項目', '現代設施'])
        school['specialFeaturesZh'] = templates.copy()
    
    if 'specialFeatures' not in school:
        templates = special_features_templates.get(country, ['Top university', 'Exchange program', 'Modern facilities'])
        school['specialFeatures'] = [f.replace('頂尖大學', 'Top university').replace('交換項目', 'Exchange program').replace('現代設施', 'Modern facilities') for f in templates]
    
    # 翻譯 selectionFactors
    sf = school.get('selectionFactors', {})
    school['selectionFactorsZh'] = {
        'academicFit': translate_notes(sf.get('academicFit', 'General exchange program')),
        'culturalExperience': f'體驗 {country_names_zh.get(country, country)} 文化',
        'budgetLevel': f'每月港幣 {school.get("budget", 9000):,}',
        'language': '、'.join(translate_languages(school.get('languages', ['English']))),
        'supportServices': '國際學生服務、學術支援、住宿協助'
    }
    
    if 'selectionFactors' not in school or not school['selectionFactors']:
        school['selectionFactors'] = {
            'academicFit': sf.get('academicFit', 'General exchange program'),
            'culturalExperience': f'Experience {country} culture',
            'budgetLevel': f'HK${school.get("budget", 9000):,}/month',
            'language': ', '.join(school.get('languages', ['English'])),
            'supportServices': 'International student services, academic support, accommodation assistance'
        }
    
    # 翻譯 notes
    school['notesZh'] = translate_notes(school.get('notes', ''))
    
    # 翻譯 quota
    school['quotaZh'] = translate_quota(school.get('quota', ''))
    
    # 翻譯 languages
    school['languagesZh'] = translate_languages(school.get('languages', ['English']))

# 保存更新後的數據
with open('C:\\Users\\Ng\\CascadeProjects\\exchange-finder\\data\\schools_complete.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'已為 {len(data["schools"])} 所學校添加中文內容')
print('已保存至 schools_complete.json')

# 驗證
sample = data['schools'][0]
print(f'\\n樣本學校：{sample["name"]}')
print(f'國家中文：{sample.get("countryZh", "N/A")}')
print(f'城市中文：{sample.get("cityZh", "N/A")}')
print(f'特色中文：{sample.get("uniqueFeaturesZh", [])}')
print(f'美食中文：{sample.get("foodCultureZh", "")[:50]}...')
