// Nisab values in grams (Authentic Islamic Standards)
const GOLD_NISAB_GRAMS = 87.48;      // 2.5 Mithqal
const SILVER_NISAB_GRAMS = 612.36;   // 52.5 Dirham
const ZAKAT_RATE = 0.025;             // 2.5% per lunar year
const VORI_TO_GRAMS = 11.66;          // 1 Vori = 11.66 grams

// Currency Exchange Rates - How much USD equals 1 unit of this currency (Updated February 2026)
// Example: 1 PKR = 0.0036 USD (so when we have 100 PKR, we divide by this rate to get USD)
const EXCHANGE_RATES = {
    'USD': { name: 'US Dollar', symbol: '$', toUSD: 1.0 },
    'EUR': { name: 'Euro', symbol: '€', toUSD: 0.92 },           // 1 EUR ≈ 0.92 USD
    'GBP': { name: 'British Pound', symbol: '£', toUSD: 0.79 },  // 1 GBP ≈ 0.79 USD
    'AED': { name: 'UAE Dirham', symbol: 'د.إ', toUSD: 0.27 },   // 1 AED ≈ 0.27 USD
    'PKR': { name: 'Pakistani Rupee', symbol: '₨', toUSD: 0.0036 }, // 1 PKR ≈ 0.0036 USD
    'INR': { name: 'Indian Rupee', symbol: '₹', toUSD: 0.012 },  // 1 INR ≈ 0.012 USD
    'SAR': { name: 'Saudi Riyal', symbol: '﷼', toUSD: 0.27 },   // 1 SAR ≈ 0.27 USD
    'EGP': { name: 'Egyptian Pound', symbol: '£', toUSD: 0.020 }, // 1 EGP ≈ 0.020 USD
    'BDT': { name: 'Bangladeshi Taka', symbol: '৳', toUSD: 0.0095 }, // 1 BDT ≈ 0.0095 USD
    'MYR': { name: 'Malaysian Ringgit', symbol: 'RM', toUSD: 0.22 }, // 1 MYR ≈ 0.22 USD
    'SGD': { name: 'Singapore Dollar', symbol: '$', toUSD: 0.74 }, // 1 SGD ≈ 0.74 USD
    'AUD': { name: 'Australian Dollar', symbol: '$', toUSD: 0.65 }, // 1 AUD ≈ 0.65 USD
    'CAD': { name: 'Canadian Dollar', symbol: '$', toUSD: 0.73 }, // 1 CAD ≈ 0.73 USD
    'JPY': { name: 'Japanese Yen', symbol: '¥', toUSD: 0.0067 }, // 1 JPY ≈ 0.0067 USD
    'CNY': { name: 'Chinese Yuan', symbol: '¥', toUSD: 0.14 }    // 1 CNY ≈ 0.14 USD
};

const TASBIH_STORAGE_KEY = 'digitalTasbihState';
const QURAN_RECITER_BASE_URL = 'https://server8.mp3quran.net/afs';
const QURAN_SURAH_NAMES = [
    'Al-Fatihah', 'Al-Baqarah', 'Aal-E-Imran', 'An-Nisa', 'Al-Maidah', 'Al-Anam', 'Al-Araf', 'Al-Anfal', 'At-Tawbah', 'Yunus',
    'Hud', 'Yusuf', 'Ar-Rad', 'Ibrahim', 'Al-Hijr', 'An-Nahl', 'Al-Isra', 'Al-Kahf', 'Maryam', 'Ta-Ha',
    'Al-Anbiya', 'Al-Hajj', 'Al-Muminun', 'An-Nur', 'Al-Furqan', 'Ash-Shuara', 'An-Naml', 'Al-Qasas', 'Al-Ankabut', 'Ar-Rum',
    'Luqman', 'As-Sajdah', 'Al-Ahzab', 'Saba', 'Fatir', 'Ya-Sin', 'As-Saffat', 'Sad', 'Az-Zumar', 'Ghafir',
    'Fussilat', 'Ash-Shura', 'Az-Zukhruf', 'Ad-Dukhan', 'Al-Jathiyah', 'Al-Ahqaf', 'Muhammad', 'Al-Fath', 'Al-Hujurat', 'Qaf',
    'Adh-Dhariyat', 'At-Tur', 'An-Najm', 'Al-Qamar', 'Ar-Rahman', 'Al-Waqiah', 'Al-Hadid', 'Al-Mujadila', 'Al-Hashr', 'Al-Mumtahanah',
    'As-Saff', 'Al-Jumuah', 'Al-Munafiqun', 'At-Taghabun', 'At-Talaq', 'At-Tahrim', 'Al-Mulk', 'Al-Qalam', 'Al-Haqqah', 'Al-Maarij',
    'Nuh', 'Al-Jinn', 'Al-Muzzammil', 'Al-Muddaththir', 'Al-Qiyamah', 'Al-Insan', 'Al-Mursalat', 'An-Naba', 'An-Naziat', 'Abasa',
    'At-Takwir', 'Al-Infitar', 'Al-Mutaffifin', 'Al-Inshiqaq', 'Al-Buruj', 'At-Tariq', 'Al-Ala', 'Al-Ghashiyah', 'Al-Fajr', 'Al-Balad',
    'Ash-Shams', 'Al-Layl', 'Ad-Duha', 'Ash-Sharh', 'At-Tin', 'Al-Alaq', 'Al-Qadr', 'Al-Bayyinah', 'Az-Zalzalah', 'Al-Adiyat',
    'Al-Qariah', 'At-Takathur', 'Al-Asr', 'Al-Humazah', 'Al-Fil', 'Quraysh', 'Al-Maun', 'Al-Kawthar', 'Al-Kafirun', 'An-Nasr',
    'Al-Masad', 'Al-Ikhlas', 'Al-Falaq', 'An-Nas'
];

let tasbihCount = 0;
let selectedDhikrId = 'default-subhanallah';
let dhikrItems = [];
let currentSurahIndex = 0;
let goldLiveMeta = {
    isLive: false,
    source: 'Manual / Default',
    updatedAt: null,
    pricePerGramUSD: 66,
    history: []
};

const COUNTRY_TO_CURRENCY = {
    US: 'USD', GB: 'GBP', AE: 'AED', PK: 'PKR', IN: 'INR', SA: 'SAR',
    EG: 'EGP', BD: 'BDT', MY: 'MYR', SG: 'SGD', AU: 'AUD', CA: 'CAD',
    JP: 'JPY', CN: 'CNY', DE: 'EUR', FR: 'EUR', ES: 'EUR', IT: 'EUR',
    NL: 'EUR', BE: 'EUR', AT: 'EUR', IE: 'EUR', PT: 'EUR', FI: 'EUR',
    GR: 'EUR', CY: 'EUR', MT: 'EUR', LU: 'EUR', EE: 'EUR', LV: 'EUR',
    LT: 'EUR', SI: 'EUR', SK: 'EUR'
};
const USER_CURRENCY_PREFS_KEY = 'zakatUserCurrencyPrefs';
const COUNTRY_DEFAULT_APPLIED_KEY = 'zakatCountryDefaultApplied';
const MIN_REALISTIC_GOLD_USD_PER_GRAM = 20;
const MAX_REALISTIC_GOLD_USD_PER_GRAM = 300;

function isRealisticGoldUsdPerGram(value) {
    return Number.isFinite(value)
        && value >= MIN_REALISTIC_GOLD_USD_PER_GRAM
        && value <= MAX_REALISTIC_GOLD_USD_PER_GRAM;
}

function getCurrencyForCountry(countryCode) {
    if (!countryCode) return 'USD';
    const normalized = String(countryCode).toUpperCase();
    const currency = COUNTRY_TO_CURRENCY[normalized];
    return EXCHANGE_RATES[currency] ? currency : 'USD';
}

function getLocaleCountryCode() {
    try {
        const locale = navigator.language || '';
        const parts = locale.split('-');
        if (parts.length > 1) return parts[1].toUpperCase();
    } catch (error) {
        console.warn('Locale country detection failed', error);
    }
    return null;
}

async function detectUserCountry() {
    try {
        const response = await fetch('https://ipapi.co/json/', { cache: 'no-cache' });
        if (response.ok) {
            const data = await response.json();
            const countryCode = (data.country_code || data.country || '').toUpperCase();
            const countryName = data.country_name || countryCode || 'Unknown';
            if (countryCode) {
                return { countryCode, countryName, method: 'IP detection' };
            }
        }
    } catch (error) {
        console.warn('IP country detection failed', error);
    }

    const localeCode = getLocaleCountryCode();
    if (localeCode) {
        return { countryCode: localeCode, countryName: localeCode, method: 'Browser locale' };
    }

    return { countryCode: 'US', countryName: 'United States', method: 'Fallback' };
}

function applyCurrencyDefaults(currency) {
    const safeCurrency = EXCHANGE_RATES[currency] ? currency : 'USD';
    const goldCurrency = document.getElementById('goldCurrency');
    const silverCurrency = document.getElementById('silverCurrency');
    const preferredCurrency = document.getElementById('preferredCurrency');

    if (goldCurrency) goldCurrency.value = safeCurrency;
    if (silverCurrency) silverCurrency.value = safeCurrency;
    if (preferredCurrency) preferredCurrency.value = safeCurrency;
}

function saveUserCurrencyPreferences() {
    const goldCurrency = document.getElementById('goldCurrency')?.value || 'USD';
    const silverCurrency = document.getElementById('silverCurrency')?.value || 'USD';
    const preferredCurrency = document.getElementById('preferredCurrency')?.value || 'USD';

    const payload = { goldCurrency, silverCurrency, preferredCurrency };
    localStorage.setItem(USER_CURRENCY_PREFS_KEY, JSON.stringify(payload));
}

function loadUserCurrencyPreferences() {
    const raw = localStorage.getItem(USER_CURRENCY_PREFS_KEY);
    if (!raw) return false;

    try {
        const parsed = JSON.parse(raw);
        const goldCurrency = EXCHANGE_RATES[parsed.goldCurrency] ? parsed.goldCurrency : 'USD';
        const silverCurrency = EXCHANGE_RATES[parsed.silverCurrency] ? parsed.silverCurrency : 'USD';
        const preferredCurrency = EXCHANGE_RATES[parsed.preferredCurrency] ? parsed.preferredCurrency : 'USD';

        document.getElementById('goldCurrency').value = goldCurrency;
        document.getElementById('silverCurrency').value = silverCurrency;
        document.getElementById('preferredCurrency').value = preferredCurrency;
        return true;
    } catch (error) {
        console.warn('Could not load saved currency preferences', error);
        return false;
    }
}

async function applyCountryBasedDefaults() {
    const locationInfo = document.getElementById('detectedCountryInfo');
    const detected = await detectUserCountry();
    const detectedCurrency = getCurrencyForCountry(detected.countryCode);

    const hasSavedPrefs = loadUserCurrencyPreferences();
    const alreadyApplied = localStorage.getItem(COUNTRY_DEFAULT_APPLIED_KEY) === '1';

    if (!hasSavedPrefs && !alreadyApplied) {
        applyCurrencyDefaults(detectedCurrency);
        localStorage.setItem(COUNTRY_DEFAULT_APPLIED_KEY, '1');
        saveUserCurrencyPreferences();
    }

    if (locationInfo) {
        const activePreferredCurrency = document.getElementById('preferredCurrency')?.value || detectedCurrency;
        const modeLabel = hasSavedPrefs || alreadyApplied ? 'Saved preference' : 'Auto default';
        locationInfo.textContent = `Detected: ${detected.countryName} (${detected.countryCode}) • Currency: ${activePreferredCurrency} • ${modeLabel} • via ${detected.method}`;
    }

    updateCurrencyDisplay();
}

// Format number with commas for thousands
function formatNumber(num) {
    return num.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

// Convert amount from any currency to USD
function convertToUSD(amount, currency) {
    const rate = EXCHANGE_RATES[currency];
    if (!rate) {
        console.warn('Unknown currency:', currency);
        return amount;
    }
    if (rate.toUSD === 1.0) return amount; // Already USD
    const usd = amount * rate.toUSD;  // Changed from division to multiplication
    console.log(`Convert ${amount} ${currency} (rate: ${rate.toUSD}) -> ${usd.toFixed(2)} USD`);
    return usd;
}

// Convert amount from USD to any currency
function convertFromUSD(amount, currency) {
    const rate = EXCHANGE_RATES[currency];
    if (!rate) {
        console.warn('Unknown currency:', currency);
        return amount;
    }
    if (rate.toUSD === 1.0) return amount; // Already USD
    const converted = amount / rate.toUSD;  // Changed from multiplication to division
    console.log(`Convert ${amount.toFixed(2)} USD -> ${converted.toFixed(2)} ${currency} (rate: ${rate.toUSD})`);
    return converted;
}

// Get currency symbol
function getCurrencySymbol(currency) {
    return EXCHANGE_RATES[currency]?.symbol || '$';
}

// Convert weight units to grams
function convertToGrams(amount, unit) {
    if (unit === 'vori') {
        return amount * VORI_TO_GRAMS;
    }
    return amount; // Default is already in grams
}

// Convert 24K base gold price to selected carat price
function getGoldPriceForCarat(basePrice24K, carat) {
    const normalizedCarat = parseFloat(carat) || 24;
    return basePrice24K * (normalizedCarat / 24);
}

// Initialize calculator
document.addEventListener('DOMContentLoaded', async function() {
    console.log('✓ Multi-Currency Zakat Calculator with Dynamic Entries Initialized');
    
    const goldPriceInput = document.getElementById('goldPrice');
    const silverPriceInput = document.getElementById('silverPrice');
    
    if (goldPriceInput) goldPriceInput.value = '66';
    if (silverPriceInput) silverPriceInput.value = '0.80';
    
    // Set default currencies for price inputs (will be replaced by detected country defaults)
    document.getElementById('goldCurrency').value = 'USD';
    document.getElementById('silverCurrency').value = 'USD';
    document.getElementById('preferredCurrency').value = 'USD';
    
    // Set default units and currencies for first entries
    document.querySelector('#goldEntries .weightUnit').value = 'grams';
    document.querySelector('#silverEntries .weightUnit').value = 'grams';
    
    // Add real-time calculation triggers
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('change', updateNisabDisplay);
        input.addEventListener('keyup', updateNisabDisplay);
    });
    
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.addEventListener('change', updateNisabDisplay);
    });
    
    updateEntryDeleteButtons();
    updateCurrencyLabels();
    updateNisabDisplay();
    await applyCountryBasedDefaults();
    
    // Set default date for distribution tracker to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('distributionDate').value = today;
    
    // Auto-calculate zakat when preferred currency changes
    document.getElementById('preferredCurrency').addEventListener('change', calculateZakat);

    ['goldCurrency', 'silverCurrency', 'preferredCurrency'].forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.addEventListener('change', saveUserCurrencyPreferences);
        }
    });

    initializeGoldLiveDisplay();
    fetchGoldPrice(true);
    setInterval(() => fetchGoldPrice(true), 5 * 60 * 1000);

    initDigitalTasbih();
});

function initializeGoldLiveDisplay() {
    const currentGoldPrice = parseFloat(document.getElementById('goldPrice')?.value) || 66;
    goldLiveMeta.pricePerGramUSD = currentGoldPrice;
    goldLiveMeta.isLive = false;
    goldLiveMeta.source = 'Manual / Default';
    goldLiveMeta.updatedAt = new Date();
    addGoldHistoryPoint(currentGoldPrice, false, 'Manual / Default');
    renderGoldLiveDisplay();
}

function addGoldHistoryPoint(usdPerGram, isLive, source) {
    if (!Number.isFinite(usdPerGram) || usdPerGram <= 0) return;

    const historyPoint = {
        valueUSD: parseFloat(usdPerGram.toFixed(4)),
        isLive: !!isLive,
        source: source || 'Unknown',
        at: new Date().toISOString()
    };

    if (!Array.isArray(goldLiveMeta.history)) {
        goldLiveMeta.history = [];
    }

    goldLiveMeta.history.push(historyPoint);
    if (goldLiveMeta.history.length > 5) {
        goldLiveMeta.history = goldLiveMeta.history.slice(-5);
    }
}

function extractReasonableNumber(data, parentKey = '') {
    const key = String(parentKey || '').toLowerCase();
    const isTimeField = /(time|timestamp|ts|date|updated|created|epoch)/i.test(key);

    if (typeof data === 'number' && Number.isFinite(data)) {
        if (isTimeField) return null;
        return data;
    }

    if (Array.isArray(data)) {
        for (const item of data) {
            const found = extractReasonableNumber(item, parentKey);
            if (Number.isFinite(found) && found > 0) return found;
        }
    }

    if (data && typeof data === 'object') {
        const priorityKeys = ['price', 'gold', 'xau', 'value', 'ask', 'bid', 'last', 'close', 'ounce', 'oz'];
        for (const priorityKey of priorityKeys) {
            const matchedKey = Object.keys(data).find(k => k.toLowerCase().includes(priorityKey));
            if (matchedKey) {
                const found = extractReasonableNumber(data[matchedKey], matchedKey);
                if (Number.isFinite(found) && found > 0) return found;
            }
        }

        for (const [objectKey, value] of Object.entries(data)) {
            const found = extractReasonableNumber(value, objectKey);
            if (Number.isFinite(found) && found > 0) return found;
        }
    }

    return null;
}

function normalizeGoldToUsdPerGram(rawNumber) {
    if (!Number.isFinite(rawNumber) || rawNumber <= 0) return null;

    // Ignore unrealistic values (usually timestamps) before conversion
    if (rawNumber > 10000) {
        return null;
    }

    if (rawNumber > 1000) {
        const normalized = rawNumber / 31.1034768;
        return isRealisticGoldUsdPerGram(normalized) ? normalized : null;
    }

    if (rawNumber >= 20 && rawNumber <= 200) {
        return isRealisticGoldUsdPerGram(rawNumber) ? rawNumber : null;
    }

    if (rawNumber > 200 && rawNumber <= 1000) {
        const normalized = rawNumber / 31.1034768;
        return isRealisticGoldUsdPerGram(normalized) ? normalized : null;
    }

    return null;
}

async function fetchGoldPriceFromSources() {
    const sources = [
        {
            name: 'metals.live',
            url: 'https://api.metals.live/v1/spot/gold'
        },
        {
            name: 'api.gold-api.com',
            url: 'https://api.gold-api.com/price/XAU'
        },
        {
            name: 'goldprice.org (fallback)',
            url: 'https://data-asg.goldprice.org/dbXRates/USD'
        }
    ];

    for (const source of sources) {
        try {
            const response = await fetch(source.url, { cache: 'no-cache' });
            if (!response.ok) continue;

            const json = await response.json();
            let usdPerGram = null;
            let rawValue = null;

            if (source.name.includes('goldprice.org')) {
                const xauPrice = json?.items?.[0]?.xauPrice ?? json?.tems?.[0]?.xauPrice;
                rawValue = xauPrice;
                if (Number.isFinite(xauPrice) && xauPrice > 0) {
                    usdPerGram = normalizeGoldToUsdPerGram(xauPrice);
                }
            } else if (source.name.includes('gold-api.com')) {
                const ouncePrice = json?.price;
                rawValue = ouncePrice;
                if (Number.isFinite(ouncePrice) && ouncePrice > 0) {
                    usdPerGram = normalizeGoldToUsdPerGram(ouncePrice);
                }
            } else {
                rawValue = extractReasonableNumber(json);
                usdPerGram = normalizeGoldToUsdPerGram(rawValue);
            }

            if (usdPerGram && usdPerGram > 0) {
                return {
                    success: true,
                    source: source.name,
                    usdPerGram: parseFloat(usdPerGram.toFixed(2))
                };
            }

            console.warn(`Gold source returned unusable value: ${source.name}`, rawValue);
        } catch (error) {
            console.warn(`Gold source failed: ${source.name}`, error);
        }
    }

    return { success: false };
}

function renderGoldLiveDisplay() {
    const badge = document.getElementById('goldLiveBadge');
    const source = document.getElementById('goldLiveSource');
    const liveGoldUsd = document.getElementById('liveGoldUsd');
    const liveGoldCurrencyLabel = document.getElementById('liveGoldCurrencyLabel');
    const liveGoldUsdBase = document.getElementById('liveGoldUsdBase');
    const gold22k = document.getElementById('liveGold22k');
    const gold21k = document.getElementById('liveGold21k');
    const gold19k = document.getElementById('liveGold19k');
    const updated = document.getElementById('goldLiveUpdated');
    const trendLine = document.getElementById('goldTrendLine');
    const trendPoints = document.getElementById('goldTrendPoints');

    if (!badge || !source || !liveGoldUsd || !gold22k || !gold21k || !gold19k || !updated) {
        return;
    }

    const usdPrice = parseFloat(goldLiveMeta.pricePerGramUSD) || 0;
    const preferredCurrency = document.getElementById('preferredCurrency')?.value || 'USD';
    const converted = convertFromUSD(usdPrice, preferredCurrency);
    const symbol = getCurrencySymbol(preferredCurrency);

    liveGoldUsd.textContent = `${symbol} ${formatNumber(converted)}`;
    gold22k.textContent = `${symbol} ${formatNumber(converted * (22 / 24))}`;
    gold21k.textContent = `${symbol} ${formatNumber(converted * (21 / 24))}`;
    gold19k.textContent = `${symbol} ${formatNumber(converted * (19 / 24))}`;
    if (liveGoldCurrencyLabel) {
        liveGoldCurrencyLabel.textContent = `${preferredCurrency}`;
    }
    if (liveGoldUsdBase) {
        liveGoldUsdBase.textContent = `$ ${formatNumber(usdPrice)}`;
    }

    badge.textContent = goldLiveMeta.isLive ? 'Live' : 'Approximate';
    badge.classList.toggle('live', goldLiveMeta.isLive);
    badge.classList.toggle('stale', !goldLiveMeta.isLive);

    source.textContent = `Source: ${goldLiveMeta.source}`;

    const updatedText = goldLiveMeta.updatedAt
        ? new Date(goldLiveMeta.updatedAt).toLocaleString()
        : 'Not yet';
    updated.textContent = `Updated: ${updatedText}`;

    if (trendLine && trendPoints) {
        const history = Array.isArray(goldLiveMeta.history) ? goldLiveMeta.history.slice(-5) : [];

        if (history.length < 2) {
            trendLine.setAttribute('points', '');
            trendPoints.textContent = 'No trend points yet';
            return;
        }

        const convertedHistory = history.map(point => convertFromUSD(point.valueUSD, preferredCurrency));
        const minPrice = Math.min(...convertedHistory);
        const maxPrice = Math.max(...convertedHistory);
        const chartWidth = 200;
        const chartHeight = 52;
        const paddingX = 8;
        const paddingY = 6;
        const drawWidth = chartWidth - (paddingX * 2);
        const drawHeight = chartHeight - (paddingY * 2);
        const spread = Math.max(0.0001, maxPrice - minPrice);

        const points = convertedHistory.map((value, index) => {
            const x = paddingX + (drawWidth * index / (convertedHistory.length - 1));
            const y = paddingY + (drawHeight * (1 - ((value - minPrice) / spread)));
            return `${x.toFixed(2)},${y.toFixed(2)}`;
        }).join(' ');

        trendLine.setAttribute('points', points);

        trendPoints.innerHTML = history.map((point, index) => {
            const localTime = new Date(point.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const displayValue = formatNumber(convertedHistory[index]);
            const mode = point.isLive ? 'L' : 'A';
            return `<span class="trend-point">${mode} ${localTime}: ${symbol}${displayValue}</span>`;
        }).join('');
    }
}

function getDefaultDhikrItems() {
    return [
        { id: 'default-subhanallah', title: 'SubhanAllah', text: 'سُبْحَانَ ٱللَّٰهِ', imageDataUrl: '' },
        { id: 'default-alhamdulillah', title: 'Alhamdulillah', text: 'ٱلْحَمْدُ لِلَّٰهِ', imageDataUrl: '' },
        { id: 'default-allahuakbar', title: 'Allahu Akbar', text: 'ٱللَّٰهُ أَكْبَرُ', imageDataUrl: '' }
    ];
}

function initDigitalTasbih() {
    const targetInput = document.getElementById('tasbihTarget');
    const surahSelect = document.getElementById('quranSurahSelect');
    const quranAudio = document.getElementById('quranAudio');

    if (!targetInput || !surahSelect || !quranAudio) return;

    loadTasbihState();
    ensureQuranSurahOptions();
    renderDhikrList();
    renderTasbihCounter();
    updateQuranNowPlaying();

    targetInput.addEventListener('change', function() {
        const sanitizedTarget = Math.max(1, parseInt(targetInput.value, 10) || 33);
        targetInput.value = sanitizedTarget;
        saveTasbihState();
        renderTasbihCounter();
    });

    surahSelect.addEventListener('change', function() {
        const selectedValue = parseInt(surahSelect.value, 10) || 1;
        currentSurahIndex = Math.max(0, Math.min(QURAN_SURAH_NAMES.length - 1, selectedValue - 1));
        updateQuranNowPlaying();
    });

    quranAudio.addEventListener('ended', function() {
        playNextSurah(true);
    });
}

function loadTasbihState() {
    const targetInput = document.getElementById('tasbihTarget');
    const savedRaw = localStorage.getItem(TASBIH_STORAGE_KEY);

    if (!savedRaw) {
        dhikrItems = getDefaultDhikrItems();
        selectedDhikrId = dhikrItems[0].id;
        tasbihCount = 0;
        if (targetInput) targetInput.value = 33;
        return;
    }

    try {
        const savedState = JSON.parse(savedRaw);
        dhikrItems = Array.isArray(savedState.dhikrItems) && savedState.dhikrItems.length
            ? savedState.dhikrItems
            : getDefaultDhikrItems();
        selectedDhikrId = savedState.selectedDhikrId || dhikrItems[0].id;
        tasbihCount = Math.max(0, parseInt(savedState.tasbihCount, 10) || 0);

        if (targetInput) {
            targetInput.value = Math.max(1, parseInt(savedState.tasbihTarget, 10) || 33);
        }
    } catch (error) {
        console.warn('Could not load tasbih state, using defaults.', error);
        dhikrItems = getDefaultDhikrItems();
        selectedDhikrId = dhikrItems[0].id;
        tasbihCount = 0;
        if (targetInput) targetInput.value = 33;
    }
}

function saveTasbihState() {
    const targetInput = document.getElementById('tasbihTarget');
    const state = {
        tasbihCount,
        tasbihTarget: Math.max(1, parseInt(targetInput?.value, 10) || 33),
        selectedDhikrId,
        dhikrItems
    };
    localStorage.setItem(TASBIH_STORAGE_KEY, JSON.stringify(state));
}

function getSelectedDhikr() {
    return dhikrItems.find(item => item.id === selectedDhikrId) || dhikrItems[0] || { title: 'Dhikr', text: '' };
}

function renderTasbihCounter() {
    const countElement = document.getElementById('tasbihCount');
    const targetInput = document.getElementById('tasbihTarget');
    const remainingElement = document.getElementById('tasbihRemaining');
    const progressElement = document.getElementById('tasbihProgress');
    const selectedElement = document.getElementById('selectedDhikrDisplay');

    if (!countElement || !targetInput || !remainingElement || !progressElement || !selectedElement) return;

    const selectedDhikr = getSelectedDhikr();
    const target = Math.max(1, parseInt(targetInput.value, 10) || 33);
    const remaining = Math.max(0, target - tasbihCount);
    const percent = Math.min(100, (tasbihCount / target) * 100);

    countElement.textContent = tasbihCount;
    remainingElement.textContent = `Remaining: ${remaining}`;
    selectedElement.textContent = `Selected Dhikr: ${selectedDhikr.title}`;
    progressElement.style.width = `${percent}%`;
}

function incrementTasbih() {
    tasbihCount += 1;
    saveTasbihState();
    renderTasbihCounter();
}

function decrementTasbih() {
    tasbihCount = Math.max(0, tasbihCount - 1);
    saveTasbihState();
    renderTasbihCounter();
}

function resetTasbihCounter() {
    tasbihCount = 0;
    saveTasbihState();
    renderTasbihCounter();
}

function escapeHtml(text) {
    if (typeof text !== 'string') return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function renderDhikrList() {
    const listElement = document.getElementById('dhikrList');
    if (!listElement) return;

    if (!dhikrItems.length) {
        listElement.innerHTML = '<div class="empty-dhikr">No dhikr added yet.</div>';
        return;
    }

    listElement.innerHTML = dhikrItems.map(item => {
        const isSelected = item.id === selectedDhikrId;
        const imageHTML = item.imageDataUrl
            ? `<img src="${item.imageDataUrl}" alt="Dhikr image" class="dhikr-image">`
            : '';

        return `
            <div class="dhikr-item ${isSelected ? 'selected' : ''}">
                <div class="dhikr-item-header">
                    <strong>${escapeHtml(item.title)}</strong>
                    <div class="dhikr-actions">
                        <button class="small-btn" onclick="selectDhikrItem('${item.id}')">Use</button>
                        <button class="small-btn danger" onclick="deleteDhikrItem('${item.id}')">Delete</button>
                    </div>
                </div>
                <p>${escapeHtml(item.text || '')}</p>
                ${imageHTML}
            </div>
        `;
    }).join('');
}

function selectDhikrItem(itemId) {
    selectedDhikrId = itemId;
    saveTasbihState();
    renderDhikrList();
    renderTasbihCounter();
}

function deleteDhikrItem(itemId) {
    const item = dhikrItems.find(dhikr => dhikr.id === itemId);
    if (!item) return;

    if (item.id.startsWith('default-')) {
        alert('Default dhikr items cannot be deleted.');
        return;
    }

    if (!confirm(`Delete "${item.title}"?`)) return;

    dhikrItems = dhikrItems.filter(dhikr => dhikr.id !== itemId);

    if (!dhikrItems.length) {
        dhikrItems = getDefaultDhikrItems();
    }

    if (!dhikrItems.some(dhikr => dhikr.id === selectedDhikrId)) {
        selectedDhikrId = dhikrItems[0].id;
        tasbihCount = 0;
    }

    saveTasbihState();
    renderDhikrList();
    renderTasbihCounter();
}

function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Could not read file'));
        reader.readAsDataURL(file);
    });
}

async function addDhikrItem() {
    const titleInput = document.getElementById('dhikrTitle');
    const textInput = document.getElementById('dhikrText');
    const imageInput = document.getElementById('dhikrImage');

    if (!titleInput || !textInput || !imageInput) return;

    const title = titleInput.value.trim();
    const text = textInput.value.trim();

    if (!title) {
        alert('Please enter a title for your dhikr/dua.');
        return;
    }

    if (!text) {
        alert('Please enter dhikr or dua text.');
        return;
    }

    let imageDataUrl = '';
    const selectedFile = imageInput.files && imageInput.files[0] ? imageInput.files[0] : null;

    if (selectedFile) {
        const maxFileSizeBytes = 2 * 1024 * 1024;
        if (selectedFile.size > maxFileSizeBytes) {
            alert('Please choose an image smaller than 2MB.');
            return;
        }
        imageDataUrl = await fileToDataUrl(selectedFile);
    }

    const newItem = {
        id: `custom-${Date.now()}`,
        title,
        text,
        imageDataUrl
    };

    dhikrItems.unshift(newItem);
    selectedDhikrId = newItem.id;
    tasbihCount = 0;

    saveTasbihState();
    renderDhikrList();
    renderTasbihCounter();

    titleInput.value = '';
    textInput.value = '';
    imageInput.value = '';
}

function populateQuranSurahOptions() {
    const select = document.getElementById('quranSurahSelect');
    if (!select) return;

    select.innerHTML = QURAN_SURAH_NAMES.map((name, index) => {
        const surahNumber = index + 1;
        return `<option value="${surahNumber}">${surahNumber}. ${name}</option>`;
    }).join('');

    select.value = String(currentSurahIndex + 1);
}

function ensureQuranSurahOptions() {
    const select = document.getElementById('quranSurahSelect');
    if (!select) return;

    if (!select.options || select.options.length === 0) {
        populateQuranSurahOptions();
    }

    if (!select.value) {
        select.value = String(currentSurahIndex + 1);
    }
}

function formatSurahNumber(index) {
    const surahNumber = index + 1;
    return String(surahNumber).padStart(3, '0');
}

function updateQuranNowPlaying() {
    const nowPlaying = document.getElementById('quranNowPlaying');
    if (!nowPlaying) return;

    const surahName = QURAN_SURAH_NAMES[currentSurahIndex] || 'Unknown Surah';
    nowPlaying.textContent = `Now Playing: ${currentSurahIndex + 1}. ${surahName}`;
}

function playSurahByIndex(index) {
    const quranAudio = document.getElementById('quranAudio');
    const surahSelect = document.getElementById('quranSurahSelect');

    if (!quranAudio || !surahSelect) return;

    ensureQuranSurahOptions();
    currentSurahIndex = Math.max(0, Math.min(QURAN_SURAH_NAMES.length - 1, index));
    surahSelect.value = String(currentSurahIndex + 1);

    const surahCode = formatSurahNumber(currentSurahIndex);
    const audioUrl = `${QURAN_RECITER_BASE_URL}/${surahCode}.mp3`;
    quranAudio.src = audioUrl;
    quranAudio.currentTime = 0;
    updateQuranNowPlaying();

    quranAudio.play().catch(() => {
        alert('Tap Play on the audio player to start playback (browser autoplay restriction).');
    });
}

function playQuranFromBeginning() {
    playSurahByIndex(0);
}

function playSelectedSurah() {
    const surahSelect = document.getElementById('quranSurahSelect');
    if (!surahSelect) return;

    ensureQuranSurahOptions();

    const selectedNumber = parseInt(surahSelect.value, 10) || 1;
    playSurahByIndex(selectedNumber - 1);
}

function playPreviousSurah() {
    const previousIndex = Math.max(0, currentSurahIndex - 1);
    playSurahByIndex(previousIndex);
}

function playNextSurah(isAutoPlay = false) {
    if (currentSurahIndex >= QURAN_SURAH_NAMES.length - 1) {
        if (isAutoPlay) {
            const nowPlaying = document.getElementById('quranNowPlaying');
            if (nowPlaying) nowPlaying.textContent = 'Now Playing: Quran playlist finished.';
        } else {
            alert('You are at the last Surah in the playlist.');
        }
        return;
    }

    playSurahByIndex(currentSurahIndex + 1);
}

// Update Nisab display when prices change
function updateNisabDisplay() {
    const goldPrice = parseFloat(document.getElementById('goldPrice').value) || 0;
    const goldCurrency = document.getElementById('goldCurrency').value;
    const silverPrice = parseFloat(document.getElementById('silverPrice').value) || 0;
    const silverCurrency = document.getElementById('silverCurrency').value;
    
    // Convert to USD for Nisab calculation
    const goldPriceUSD = convertToUSD(goldPrice, goldCurrency);
    const silverPriceUSD = convertToUSD(silverPrice, silverCurrency);

    goldLiveMeta.pricePerGramUSD = goldPriceUSD;
    renderGoldLiveDisplay();

    const nisabGold = goldPriceUSD * GOLD_NISAB_GRAMS;
    const nisabSilver = silverPriceUSD * SILVER_NISAB_GRAMS;
    const activeNisab = Math.min(nisabGold, nisabSilver);

    const preferredCurrency = document.getElementById('preferredCurrency').value;
    const nisabGoldDisplay = convertFromUSD(nisabGold, preferredCurrency);
    const nisabSilverDisplay = convertFromUSD(nisabSilver, preferredCurrency);
    const activeNisabDisplay = convertFromUSD(activeNisab, preferredCurrency);
    const symbol = getCurrencySymbol(preferredCurrency);

    document.getElementById('nisabGold').textContent = symbol + ' ' + formatNumber(nisabGoldDisplay);
    document.getElementById('nisabSilver').textContent = symbol + ' ' + formatNumber(nisabSilverDisplay);
    document.getElementById('activeNisab').textContent = symbol + ' ' + formatNumber(activeNisabDisplay);
}

// Update display function when currency changes
function updateCurrencyDisplay() {
    updateNisabDisplay();
    updateCurrencyLabels();
    renderGoldLiveDisplay();
}

// Update currency labels throughout the form
function updateCurrencyLabels() {
    const preferredCurrency = document.getElementById('preferredCurrency').value;
    const symbol = getCurrencySymbol(preferredCurrency);
    
    // Update all entry rows to show currency symbols
    document.querySelectorAll('.entry-row .assetCurrency').forEach(select => {
        const row = select.parentElement;
        const existingLabel = row.querySelector('.currencyLabel');
        if (existingLabel) {
            existingLabel.remove();
        }
        
        const label = document.createElement('span');
        label.className = 'currencyLabel';
        const currency = select.value;
        const currencySymbol = getCurrencySymbol(currency);
        label.textContent = currencySymbol;
        row.insertBefore(label, row.querySelector('input'));
    });
}

// Dynamic Entry Management
function addGoldEntry() {
    const container = document.getElementById('goldEntries');
    const newRow = document.createElement('div');
    newRow.className = 'entry-row';
    newRow.innerHTML = `
        <select class="goldCarat" onchange="updateNisabDisplay()" title="Select gold carat purity">
            <option value="24">24K</option>
            <option value="22">22K</option>
            <option value="21">21K</option>
            <option value="19">19K</option>
            <option value="18">18K</option>
            <option value="14">14K</option>
        </select>
        <select class="weightUnit" onchange="updateNisabDisplay()">
            <option value="grams">Grams</option>
            <option value="vori">Vori (1 Vori = 11.66g)</option>
        </select>
        <input type="number" class="goldAmountInput" placeholder="0" step="0.01" min="0" onchange="updateNisabDisplay()" onkeyup="updateNisabDisplay()">
        <button class="deleteBtn" onclick="deleteEntry(this)">✕</button>
    `;
    container.appendChild(newRow);
    updateEntryDeleteButtons();
    updateNisabDisplay();
}

function addSilverEntry() {
    const container = document.getElementById('silverEntries');
    const newRow = document.createElement('div');
    newRow.className = 'entry-row';
    newRow.innerHTML = `
        <select class="weightUnit" onchange="updateNisabDisplay()">
            <option value="grams">Grams</option>
            <option value="vori">Vori (1 Vori = 11.66g)</option>
        </select>
        <input type="number" class="silverAmountInput" placeholder="0" step="0.01" min="0" onchange="updateNisabDisplay()" onkeyup="updateNisabDisplay()">
        <button class="deleteBtn" onclick="deleteEntry(this)">✕</button>
    `;
    container.appendChild(newRow);
    updateEntryDeleteButtons();
    updateNisabDisplay();
}

function addCashEntry() {
    const container = document.getElementById('cashEntries');
    const newRow = document.createElement('div');
    newRow.className = 'entry-row';
    newRow.innerHTML = `
        <select class="assetCurrency" onchange="updateCurrencyDisplay()">
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="AED">AED (د.إ)</option>
            <option value="PKR">PKR (₨)</option>
            <option value="INR">INR (₹)</option>
            <option value="SAR">SAR (﷼)</option>
            <option value="EGP">EGP (£)</option>
            <option value="BDT">BDT (৳)</option>
            <option value="MYR">MYR (RM)</option>
            <option value="SGD">SGD ($)</option>
            <option value="AUD">AUD ($)</option>
            <option value="CAD">CAD ($)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="CNY">CNY (¥)</option>
        </select>
        <input type="number" class="cashAmountInput" placeholder="0" step="0.01" min="0">
        <button class="deleteBtn" onclick="deleteEntry(this)">✕</button>
    `;
    container.appendChild(newRow);
    updateEntryDeleteButtons();
}

function addBusinessEntry() {
    const container = document.getElementById('businessEntries');
    const newRow = document.createElement('div');
    newRow.className = 'entry-row';
    newRow.innerHTML = `
        <select class="assetCurrency" onchange="updateCurrencyDisplay()">
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="AED">AED (د.إ)</option>
            <option value="PKR">PKR (₨)</option>
            <option value="INR">INR (₹)</option>
            <option value="SAR">SAR (﷼)</option>
            <option value="EGP">EGP (£)</option>
            <option value="BDT">BDT (৳)</option>
            <option value="MYR">MYR (RM)</option>
            <option value="SGD">SGD ($)</option>
            <option value="AUD">AUD ($)</option>
            <option value="CAD">CAD ($)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="CNY">CNY (¥)</option>
        </select>
        <input type="number" class="businessAmountInput" placeholder="0" step="0.01" min="0">
        <button class="deleteBtn" onclick="deleteEntry(this)">✕</button>
    `;
    container.appendChild(newRow);
    updateEntryDeleteButtons();
}

function addOtherAssetEntry() {
    const container = document.getElementById('otherAssetEntries');
    const newRow = document.createElement('div');
    newRow.className = 'entry-row';
    newRow.innerHTML = `
        <select class="assetCurrency" onchange="updateCurrencyDisplay()">
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="AED">AED (د.إ)</option>
            <option value="PKR">PKR (₨)</option>
            <option value="INR">INR (₹)</option>
            <option value="SAR">SAR (﷼)</option>
            <option value="EGP">EGP (£)</option>
            <option value="BDT">BDT (৳)</option>
            <option value="MYR">MYR (RM)</option>
            <option value="SGD">SGD ($)</option>
            <option value="AUD">AUD ($)</option>
            <option value="CAD">CAD ($)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="CNY">CNY (¥)</option>
        </select>
        <input type="number" class="otherAssetInput" placeholder="0" step="0.01" min="0">
        <button class="deleteBtn" onclick="deleteEntry(this)">✕</button>
    `;
    container.appendChild(newRow);
    updateEntryDeleteButtons();
}

function addLiabilityEntry() {
    const container = document.getElementById('liabilityEntries');
    const newRow = document.createElement('div');
    newRow.className = 'entry-row';
    newRow.innerHTML = `
        <select class="assetCurrency" onchange="updateCurrencyDisplay()">
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="AED">AED (د.إ)</option>
            <option value="PKR">PKR (₨)</option>
            <option value="INR">INR (₹)</option>
            <option value="SAR">SAR (﷼)</option>
            <option value="EGP">EGP (£)</option>
            <option value="BDT">BDT (৳)</option>
            <option value="MYR">MYR (RM)</option>
            <option value="SGD">SGD ($)</option>
            <option value="AUD">AUD ($)</option>
            <option value="CAD">CAD ($)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="CNY">CNY (¥)</option>
        </select>
        <input type="number" class="liabilityInput" placeholder="0" step="0.01" min="0">
        <button class="deleteBtn" onclick="deleteEntry(this)">✕</button>
    `;
    container.appendChild(newRow);
    updateEntryDeleteButtons();
}

// Delete entry and manage delete buttons visibility
function deleteEntry(button) {
    button.parentElement.remove();
    updateEntryDeleteButtons();
    updateNisabDisplay();
}

function updateEntryDeleteButtons() {
    // Show delete buttons only when there are multiple entries
    const containers = ['goldEntries', 'silverEntries', 'cashEntries', 'businessEntries', 'otherAssetEntries', 'liabilityEntries'];
    
    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        const rows = container.querySelectorAll('.entry-row');
        const deleteButtons = container.querySelectorAll('.deleteBtn');
        
        deleteButtons.forEach(btn => {
            btn.style.display = rows.length > 1 ? 'block' : 'none';
        });
    });
}

// Fetch current gold price from API with multiple fallbacks
async function fetchGoldPrice(isSilent = false, triggerButton = null) {
    const button = triggerButton || (typeof event !== 'undefined' ? event.target : null);
    if (button) {
        button.textContent = 'Fetching...';
        button.disabled = true;
    }
    
    try {
        const liveResult = await fetchGoldPriceFromSources();
        if (liveResult.success) {
            const targetCurrency = document.getElementById('preferredCurrency')?.value || 'USD';
            const localizedPrice = convertFromUSD(liveResult.usdPerGram, targetCurrency);
            document.getElementById('goldPrice').value = parseFloat(localizedPrice.toFixed(2));
            document.getElementById('goldCurrency').value = targetCurrency;
            goldLiveMeta.isLive = true;
            goldLiveMeta.source = liveResult.source;
            goldLiveMeta.updatedAt = new Date().toISOString();
            goldLiveMeta.pricePerGramUSD = liveResult.usdPerGram;
            addGoldHistoryPoint(liveResult.usdPerGram, true, liveResult.source);
            renderGoldLiveDisplay();
            updateNisabDisplay();
            if (!isSilent) {
                alert('✓ Gold live price updated successfully.');
            }
            return;
        }

        const fallbackPrice = 66;
        const targetCurrency = document.getElementById('preferredCurrency')?.value || 'USD';
        const fallbackLocalized = convertFromUSD(fallbackPrice, targetCurrency);
        document.getElementById('goldPrice').value = parseFloat(fallbackLocalized.toFixed(2));
        document.getElementById('goldCurrency').value = targetCurrency;
        goldLiveMeta.isLive = false;
        goldLiveMeta.source = 'Fallback estimate';
        goldLiveMeta.updatedAt = new Date().toISOString();
        goldLiveMeta.pricePerGramUSD = fallbackPrice;
        addGoldHistoryPoint(fallbackPrice, false, 'Fallback estimate');
        renderGoldLiveDisplay();
        updateNisabDisplay();
        if (!isSilent) {
            alert('⚠️ Live source unavailable. Using fallback estimate.');
        }
        
    } catch (error) {
        console.error('Error:', error);
        if (!isSilent) {
            alert('⚠️ Could not fetch live gold price. Please enter manually.');
        }
    } finally {
        if (button) {
            button.textContent = 'Fetch';
            button.disabled = false;
        }
    }
}

// Fetch current silver price from API with multiple fallbacks
async function fetchSilverPrice() {
    const button = event.target;
    button.textContent = 'Fetching...';
    button.disabled = true;
    
    try {
        // Try metals.live API
        try {
            const response = await fetch('https://api.metals.live/v1/spot/silver');
            if (response.ok) {
                const data = await response.json();
                if (data && data.price) {
                    const pricePerGram = (data.price / 31.1035).toFixed(2);
                    document.getElementById('silverPrice').value = pricePerGram;
                    document.getElementById('silverCurrency').value = 'USD';
                    updateNisabDisplay();
                    button.textContent = 'Fetch';
                    button.disabled = false;
                    alert('✓ Silver price updated successfully!');
                    return;
                }
            }
        } catch (err) {
            console.log('metals.live API failed, using fallback...');
        }

        // Fallback: Use approximate current price
        const fallbackPrice = 0.80;
        document.getElementById('silverPrice').value = fallbackPrice;
        document.getElementById('silverCurrency').value = 'USD';
        updateNisabDisplay();
        alert('⚠️ Using fallback price ($' + fallbackPrice + '/gram). Current market: ~$0.75-0.85/gram.');
        
    } catch (error) {
        console.error('Error:', error);
        alert('⚠️ Could not fetch price. Please enter manually. Current market: ~$0.75-0.85/gram');
    }
    
    button.textContent = 'Fetch';
    button.disabled = false;
}

// Main Zakat Calculation Function
function calculateZakat() {
    console.log('>>> CALCULATING ZAKAT WITH MULTI-CURRENCY SUPPORT <<<');
    
    try {
        // Get metal prices and currencies
        const goldPrice = parseFloat(document.getElementById('goldPrice').value) || 0;
        const goldCurrency = document.getElementById('goldCurrency').value;
        const silverPrice = parseFloat(document.getElementById('silverPrice').value) || 0;
        const silverCurrency = document.getElementById('silverCurrency').value;
        
        // Convert to USD
        const goldPriceUSD = convertToUSD(goldPrice, goldCurrency);
        const silverPriceUSD = convertToUSD(silverPrice, silverCurrency);

        // Get wealth amounts and convert from selected units - MULTI-ENTRY SUPPORT
        // Gold entries
        const goldEntryRows = document.querySelectorAll('#goldEntries .entry-row');
        let goldAmount = 0;
        let goldValue = 0;
        goldEntryRows.forEach(row => {
            const amountRaw = parseFloat(row.querySelector('.goldAmountInput').value) || 0;
            const unitSelect = row.querySelector('.weightUnit');
            const unit = unitSelect ? unitSelect.value : 'grams';
            const caratSelect = row.querySelector('.goldCarat');
            const carat = caratSelect ? caratSelect.value : '24';
            const amountGrams = convertToGrams(amountRaw, unit);
            const rowGoldPriceUSD = getGoldPriceForCarat(goldPriceUSD, carat);

            goldAmount += amountGrams;
            goldValue += amountGrams * rowGoldPriceUSD;
        });
        
        // Silver entries
        const silverEntryRows = document.querySelectorAll('#silverEntries .entry-row');
        let silverAmount = 0;
        silverEntryRows.forEach(row => {
            const amountRaw = parseFloat(row.querySelector('.silverAmountInput').value) || 0;
            const unitSelect = row.querySelector('.weightUnit');
            const unit = unitSelect ? unitSelect.value : 'grams';
            silverAmount += convertToGrams(amountRaw, unit);
        });
        
        // Cash entries
        const cashEntryRows = document.querySelectorAll('#cashEntries .entry-row');
        let cashAmountUSD = 0;
        cashEntryRows.forEach(row => {
            const amount = parseFloat(row.querySelector('.cashAmountInput').value) || 0;
            const currencySelect = row.querySelector('.assetCurrency');
            const currency = currencySelect ? currencySelect.value : 'USD';
            cashAmountUSD += convertToUSD(amount, currency);
        });
        
        // Business inventory entries
        const businessEntryRows = document.querySelectorAll('#businessEntries .entry-row');
        let businessInventoryUSD = 0;
        businessEntryRows.forEach(row => {
            const amount = parseFloat(row.querySelector('.businessAmountInput').value) || 0;
            const currencySelect = row.querySelector('.assetCurrency');
            const currency = currencySelect ? currencySelect.value : 'USD';
            businessInventoryUSD += convertToUSD(amount, currency);
        });
        
        // Other assets entries
        const otherAssetEntryRows = document.querySelectorAll('#otherAssetEntries .entry-row');
        let otherAssetsUSD = 0;
        otherAssetEntryRows.forEach(row => {
            const amount = parseFloat(row.querySelector('.otherAssetInput').value) || 0;
            const currencySelect = row.querySelector('.assetCurrency');
            const currency = currencySelect ? currencySelect.value : 'USD';
            otherAssetsUSD += convertToUSD(amount, currency);
        });
        
        // Liability entries
        const liabilityEntryRows = document.querySelectorAll('#liabilityEntries .entry-row');
        let liabilitiesUSD = 0;
        liabilityEntryRows.forEach(row => {
            const amount = parseFloat(row.querySelector('.liabilityInput').value) || 0;
            const currencySelect = row.querySelector('.assetCurrency');
            const currency = currencySelect ? currencySelect.value : 'USD';
            liabilitiesUSD += convertToUSD(amount, currency);
        });
        
        const preferredCurrency = document.getElementById('preferredCurrency').value;

        // Validate prices
        if (!goldPriceUSD && !silverPriceUSD) {
            alert('⚠️ Please enter gold OR silver price per gram');
            document.getElementById('goldPrice').focus();
            return;
        }

        // Calculate values in USD (convert all to USD first)
        const silverValue = silverAmount * silverPriceUSD;
        // cashAmountUSD, businessInventoryUSD, otherAssetsUSD, liabilitiesUSD already calculated above
        
        console.log('Prices (USD):', {goldPriceUSD, silverPriceUSD});
        console.log('Amounts (in grams):', {goldAmount, silverAmount});
        console.log('All entries (USD):', {
            goldValue: goldValue.toFixed(2),
            silverValue: silverValue.toFixed(2),
            cashAmountUSD: cashAmountUSD.toFixed(2),
            businessInventoryUSD: businessInventoryUSD.toFixed(2),
            otherAssetsUSD: otherAssetsUSD.toFixed(2),
            liabilitiesUSD: liabilitiesUSD.toFixed(2)
        });
        
        // Calculate total wealth in USD
        let totalWealthUSD = goldValue + silverValue + cashAmountUSD + businessInventoryUSD + otherAssetsUSD;
        totalWealthUSD = Math.max(0, totalWealthUSD - liabilitiesUSD);

        // Calculate Nisab in USD
        const nisabGold = goldPriceUSD * GOLD_NISAB_GRAMS;
        const nisabSilver = silverPriceUSD * SILVER_NISAB_GRAMS;
        const activeNisabUSD = Math.min(nisabGold, nisabSilver);

        // Calculate Zakat in USD
        let zakatAmountUSD = 0;
        let statusText = '';
        let statusClass = '';

        if (totalWealthUSD >= activeNisabUSD && activeNisabUSD > 0) {
            zakatAmountUSD = totalWealthUSD * ZAKAT_RATE;
            statusText = '✓ Nisab Met - Zakat DUE';
            statusClass = 'status-qualified';
        } else if (activeNisabUSD === 0) {
            statusText = 'Enter valid prices';
            statusClass = 'status-pending';
        } else {
            statusText = '✗ Nisab NOT Met';
            statusClass = 'status-not-qualified';
        }

        // Convert results to preferred currency
        const totalWealthDisplay = convertFromUSD(totalWealthUSD, preferredCurrency);
        const activeNisabDisplay = convertFromUSD(activeNisabUSD, preferredCurrency);
        const zakatAmountDisplay = convertFromUSD(zakatAmountUSD, preferredCurrency);
        const symbol = getCurrencySymbol(preferredCurrency);

        console.log('ZAKAT AMOUNT: ' + symbol + zakatAmountDisplay.toFixed(2));

        // Convert individual amounts for display
        const goldValueDisplay = convertFromUSD(goldValue, preferredCurrency);
        const silverValueDisplay = convertFromUSD(silverValue, preferredCurrency);
        const cashAmountDisplay = convertFromUSD(cashAmountUSD, preferredCurrency);
        const businessInventoryDisplay = convertFromUSD(businessInventoryUSD, preferredCurrency);
        const otherAssetsDisplay = convertFromUSD(otherAssetsUSD, preferredCurrency);
        const liabilitiesDisplay = convertFromUSD(liabilitiesUSD, preferredCurrency);

        // Display results
        document.getElementById('resultGoldValue').textContent = symbol + ' ' + formatNumber(goldValueDisplay);
        document.getElementById('resultSilverValue').textContent = symbol + ' ' + formatNumber(silverValueDisplay);
        document.getElementById('resultCashValue').textContent = symbol + ' ' + formatNumber(cashAmountDisplay);
        document.getElementById('resultInventoryValue').textContent = symbol + ' ' + formatNumber(businessInventoryDisplay);
        document.getElementById('resultOtherValue').textContent = symbol + ' ' + formatNumber(otherAssetsDisplay);
        document.getElementById('resultLiabilities').textContent = '-' + symbol + ' ' + formatNumber(liabilitiesDisplay);
        document.getElementById('resultTotalWealth').textContent = symbol + ' ' + formatNumber(totalWealthDisplay);
        document.getElementById('resultApplicableNisab').textContent = symbol + ' ' + formatNumber(activeNisabDisplay);
        
        // Display Zakat with currency
        const zakatDisplay = symbol + ' ' + formatNumber(zakatAmountDisplay);
        document.getElementById('resultZakat').textContent = zakatDisplay;
        document.getElementById('resultZakatSymbol').textContent = '';  // Clear separate symbol display
        document.getElementById('displayCurrency').textContent = preferredCurrency + ' (' + EXCHANGE_RATES[preferredCurrency].name + ')';
        
        // Save to localStorage for distribution tracker
        localStorage.setItem('lastZakatAmountUSD', zakatAmountUSD.toFixed(2));
        localStorage.setItem('lastZakatCurrency', preferredCurrency);
        localStorage.setItem('lastZakatAmount', zakatAmountDisplay.toFixed(2));
        
        // Show equivalent in USD only if not USD
        if (preferredCurrency !== 'USD') {
            document.getElementById('resultZakatUSD').textContent = '$ ' + formatNumber(zakatAmountUSD);
            document.getElementById('resultZakatUSD').style.display = 'block';
        } else {
            document.getElementById('resultZakatUSD').style.display = 'none';  // Hide if already USD
        }

        // Update status
        const nisabStatusElement = document.getElementById('nisabStatus');
        if (nisabStatusElement) {
            nisabStatusElement.innerHTML = '<span class="label">Status:</span><span class="value ' + statusClass + '">' + statusText + '</span>';
        }

        // Highlight result
        const resultCard = document.querySelector('.results-card');
        if (resultCard) {
            resultCard.classList.remove('pulse-highlight');
            void resultCard.offsetWidth; // Force reflow
            resultCard.classList.add('pulse-highlight');
        }

        // Scroll to results
        document.querySelector('.results-section').scrollIntoView({ behavior: 'smooth' });
        
        console.log('>>> CALCULATION COMPLETE <<<');
    } catch (error) {
        console.error('ERROR:', error);
        alert('Error: ' + error.message);
    }
}

// Reset form
function resetForm() {
    // Reset price inputs
    document.getElementById('goldPrice').value = '66';
    document.getElementById('silverPrice').value = '0.80';
    document.getElementById('goldCurrency').value = 'USD';
    document.getElementById('silverCurrency').value = 'USD';
    document.getElementById('preferredCurrency').value = 'USD';
    
    // Reset dynamic entries - clear extra rows and reset remaining to empty
    const containers = [
        {id: 'goldEntries', class: 'goldAmountInput', unit: true},
        {id: 'silverEntries', class: 'silverAmountInput', unit: true},
        {id: 'cashEntries', class: 'cashAmountInput', unit: false},
        {id: 'businessEntries', class: 'businessAmountInput', unit: false},
        {id: 'otherAssetEntries', class: 'otherAssetInput', unit: false},
        {id: 'liabilityEntries', class: 'liabilityInput', unit: false}
    ];
    
    containers.forEach(container => {
        const containerEl = document.getElementById(container.id);
        const rows = containerEl.querySelectorAll('.entry-row');
        
        // Keep only first row, delete rest
        rows.forEach((row, index) => {
            if (index > 0) {
                row.remove();
            }
        });
        
        // Reset first row
        const firstRow = containerEl.querySelector('.entry-row');
        if (firstRow) {
            const input = firstRow.querySelector('input');
            if (input) input.value = '';

            if (container.id === 'goldEntries') {
                const caratSelect = firstRow.querySelector('.goldCarat');
                const unitSelect = firstRow.querySelector('.weightUnit');
                if (caratSelect) caratSelect.value = '24';
                if (unitSelect) unitSelect.value = 'grams';
            } else {
                const sel = firstRow.querySelector('select');
                if (sel) {
                    if (container.unit) {
                        sel.value = 'grams';
                    } else {
                        sel.value = 'USD';
                    }
                }
            }
        }
    });
    
    updateEntryDeleteButtons();

    // Reset results
    document.getElementById('resultGoldValue').textContent = '$ 0.00';
    document.getElementById('resultSilverValue').textContent = '$ 0.00';
    document.getElementById('resultCashValue').textContent = '$ 0.00';
    document.getElementById('resultInventoryValue').textContent = '$ 0.00';
    document.getElementById('resultOtherValue').textContent = '$ 0.00';
    document.getElementById('resultLiabilities').textContent = '-$ 0.00';
    document.getElementById('resultTotalWealth').textContent = '$ 0.00';
    document.getElementById('resultApplicableNisab').textContent = '$ 0.00';
    document.getElementById('resultZakat').textContent = '$ 0.00';
    document.getElementById('resultZakatSymbol').textContent = '';
    document.getElementById('resultZakatUSD').textContent = '$ 0.00';

    document.getElementById('nisabGold').textContent = '$ 0.00';
    document.getElementById('nisabSilver').textContent = '$ 0.00';
    document.getElementById('activeNisab').textContent = '$ 0.00';

    const nisabStatusElement = document.getElementById('nisabStatus');
    if (nisabStatusElement) {
        nisabStatusElement.innerHTML = '<span class="label">Status:</span><span class="value status-pending">Pending</span>';
    }

    updateNisabDisplay();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Animation
const style = document.createElement('style');
style.textContent = '@keyframes pulse-highlight { 0% { box-shadow: 0 0 0 0 rgba(44, 95, 45, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(44, 95, 45, 0); } 100% { box-shadow: 0 0 0 0 rgba(44, 95, 45, 0); } } .pulse-highlight { animation: pulse-highlight 1.5s ease-out !important; }';
document.head.appendChild(style);

// ============================================
// DISTRIBUTION TRACKER FUNCTIONALITY
// ============================================

// Switch between tabs
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    
    // Remove active from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');

    if (typeof event !== 'undefined' && event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    } else {
        const tabButton = document.querySelector(`.tab-btn[onclick="switchTab('${tabName}')"]`);
        if (tabButton) tabButton.classList.add('active');
    }
    
    // Load distribution records when opening the tab
    if (tabName === 'distribution') {
        loadDistributionRecords();
    }

    if (tabName === 'tasbih') {
        ensureQuranSurahOptions();
        renderDhikrList();
        renderTasbihCounter();
        updateQuranNowPlaying();
    }
}

// Convert Gregorian date to Hijri date (Accurate Islamic Calendar Conversion)
function toHijri(gregorianDate) {
    const date = new Date(gregorianDate);
    
    // Get Gregorian date components
    const gYear = date.getFullYear();
    const gMonth = date.getMonth() + 1;
    const gDay = date.getDate();
    
    // Julian Day Number calculation
    let a = Math.floor((14 - gMonth) / 12);
    let y = gYear + 4800 - a;
    let m = gMonth + (12 * a) - 3;
    
    let jdn = gDay + Math.floor((153 * m + 2) / 5) + (365 * y) + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    
    // Convert Julian Day to Hijri
    let l = jdn - 1948440 + 10632;
    let n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
    l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
    
    const hMonth = Math.floor((24 * l) / 709);
    const hDay = l - Math.floor((709 * hMonth) / 24);
    const hYear = 30 * n + j - 30;
    
    // Month names in Arabic and English
    const hijriMonths = [
        'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
        'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', "Sha'ban",
        'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah'
    ];
    
    return `${hDay} ${hijriMonths[hMonth - 1]} ${hYear}`;
}

// Add distribution record
function addDistributionRecord() {
    const recipientName = document.getElementById('recipientName').value.trim();
    const category = document.getElementById('recipientCategory').value;
    const amount = parseFloat(document.getElementById('distributionAmount').value) || 0;
    const currency = document.getElementById('distributionCurrency').value;
    const date = document.getElementById('distributionDate').value;
    const notes = document.getElementById('distributionNotes').value.trim();
    
    // Validation
    if (!recipientName) {
        alert('Please enter recipient name');
        return;
    }
    if (!category) {
        alert('Please select a category');
        return;
    }
    if (amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (!date) {
        alert('Please select a date');
        return;
    }
    
    // Create record object
    const record = {
        id: Date.now(),
        recipientName,
        category,
        amount,
        currency,
        date,
        notes,
        dateAdded: new Date().toISOString()
    };
    
    // Load existing records
    let records = JSON.parse(localStorage.getItem('zakatDistributions')) || [];
    
    // Add new record
    records.push(record);
    
    // Save to localStorage
    localStorage.setItem('zakatDistributions', JSON.stringify(records));
    
    // Clear form
    document.getElementById('recipientName').value = '';
    document.getElementById('recipientCategory').value = '';
    document.getElementById('distributionAmount').value = '';
    document.getElementById('distributionDate').value = '';
    document.getElementById('distributionNotes').value = '';
    
    // Reload display
    loadDistributionRecords();
    
    alert('Distribution record added successfully!');
}

// Load and display distribution records
function loadDistributionRecords() {
    const records = JSON.parse(localStorage.getItem('zakatDistributions')) || [];
    const tableBody = document.getElementById('distributionTableBody');
    
    if (records.length === 0) {
        tableBody.innerHTML = '<tr class="empty-row"><td colspan="7">No distribution records yet</td></tr>';
        updateDistributionSummary([]);
        return;
    }
    
    // Sort records by date (newest first)
    records.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Build table rows
    tableBody.innerHTML = records.map(record => {
        const gregDate = new Date(record.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
        const hijriDate = toHijri(record.date);
        const symbol = EXCHANGE_RATES[record.currency]?.symbol || record.currency;
        
        return `
            <tr>
                <td>${gregDate}</td>
                <td>${hijriDate}</td>
                <td><strong>${record.recipientName}</strong></td>
                <td>${record.category}</td>
                <td>${symbol} ${formatNumber(record.amount)}</td>
                <td><small>${record.notes || '-'}</small></td>
                <td>
                    <div class="action-buttons">
                        <button class="delete-btn" onclick="deleteDistributionRecord(${record.id})">Delete</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    
    updateDistributionSummary(records);
}

// Delete distribution record
function deleteDistributionRecord(recordId) {
    if (!confirm('Are you sure you want to delete this record?')) {
        return;
    }
    
    let records = JSON.parse(localStorage.getItem('zakatDistributions')) || [];
    records = records.filter(r => r.id !== recordId);
    localStorage.setItem('zakatDistributions', JSON.stringify(records));
    
    loadDistributionRecords();
}

// Update distribution summary
function updateDistributionSummary(records) {
    // Get total zakat calculated
    const zakatAmountUSD = parseFloat(localStorage.getItem('lastZakatAmountUSD')) || 0;
    const zakatCurrency = localStorage.getItem('lastZakatCurrency') || 'USD';
    
    // Calculate total distributed in USD
    let totalDistributedUSD = 0;
    records.forEach(record => {
        const amountUSD = convertToUSD(record.amount, record.currency);
        totalDistributedUSD += amountUSD;
    });
    
    // Convert to preferred currency for display
    const preferredCurrency = document.getElementById('preferredCurrency')?.value || zakatCurrency;
    const totalDistributed = convertFromUSD(totalDistributedUSD, preferredCurrency);
    const totalZakat = convertFromUSD(zakatAmountUSD, preferredCurrency);
    const remaining = totalZakat - totalDistributed;
    
    const symbol = EXCHANGE_RATES[preferredCurrency]?.symbol || '$';
    
    document.getElementById('totalDistributed').textContent = symbol + ' ' + formatNumber(totalDistributed);
    document.getElementById('totalZakatDue').textContent = symbol + ' ' + formatNumber(totalZakat);
    document.getElementById('remainingBalance').textContent = symbol + ' ' + formatNumber(Math.max(0, remaining));
    document.getElementById('totalRecords').textContent = records.length;
    
    // Update progress bar
    const progressPercent = zakatAmountUSD > 0 ? Math.min(100, (totalDistributedUSD / zakatAmountUSD) * 100) : 0;
    document.getElementById('distributionProgress').style.width = progressPercent + '%';
    document.getElementById('progressPercent').textContent = progressPercent.toFixed(1) + '%';
    
    if (records.length > 0) {
        const mostRecent = new Date(records[0].date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
        document.getElementById('mostRecentDate').textContent = mostRecent;
    } else {
        document.getElementById('mostRecentDate').textContent = '-';
    }
}

// Export distribution records to CSV
function exportDistributionCSV() {
    const records = JSON.parse(localStorage.getItem('zakatDistributions')) || [];
    
    if (records.length === 0) {
        alert('No records to export');
        return;
    }
    
    // Prepare CSV content
    let csvContent = 'Date (Gregorian),Date (Hijri),Recipient Name,Category,Amount,Currency,Notes\n';
    
    records.forEach(record => {
        const gregDate = new Date(record.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
        const hijriDate = toHijri(record.date);
        
        csvContent += `"${gregDate}","${hijriDate}","${record.recipientName}","${record.category}","${record.amount}","${record.currency}","${record.notes}"\n`;
    });
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `Zakat-Distribution-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Distribution records exported to CSV!');
}

// Clear all distribution records
function clearAllDistributions() {
    if (!confirm('Are you sure you want to delete ALL distribution records? This cannot be undone!')) {
        return;
    }
    
    localStorage.removeItem('zakatDistributions');
    loadDistributionRecords();
    alert('All distribution records cleared!');
}

// Generate and print final report
function generateFinalReport() {
    const records = JSON.parse(localStorage.getItem('zakatDistributions')) || [];
    const zakatAmountUSD = parseFloat(localStorage.getItem('lastZakatAmountUSD')) || 0;
    const zakatCurrency = localStorage.getItem('lastZakatCurrency') || 'USD';
    const zakatAmount = parseFloat(localStorage.getItem('lastZakatAmount')) || 0;
    
    if (zakatAmountUSD === 0) {
        alert('Please calculate your Zakat first in the Calculator tab!');
        return;
    }
    
    // Calculate totals
    let totalDistributedUSD = 0;
    records.forEach(record => {
        const amountUSD = convertToUSD(record.amount, record.currency);
        totalDistributedUSD += amountUSD;
    });
    
    const totalDistributed = convertFromUSD(totalDistributedUSD, zakatCurrency);
    const remaining = zakatAmount - totalDistributed;
    const symbol = EXCHANGE_RATES[zakatCurrency]?.symbol || '$';
    
    // Create print window
    const printWindow = window.open('', '_blank');
    const printDate = new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
    const hijriDate = toHijri(new Date());
    
    let recordsHTML = '';
    if (records.length > 0) {
        recordsHTML = records.map((record, index) => {
            const gregDate = new Date(record.date).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});
            const hDate = toHijri(record.date);
            const recSymbol = EXCHANGE_RATES[record.currency]?.symbol || record.currency;
            
            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${gregDate}<br><small>${hDate}</small></td>
                    <td><strong>${record.recipientName}</strong></td>
                    <td>${record.category}</td>
                    <td style="text-align: right;">${recSymbol} ${formatNumber(record.amount)}</td>
                    <td><small>${record.notes || '-'}</small></td>
                </tr>
            `;
        }).join('');
    } else {
        recordsHTML = '<tr><td colspan="6" style="text-align: center; color: #999;">No distribution records yet</td></tr>';
    }
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Zakat Report - ${printDate}</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    padding: 30px;
                    background: white;
                    color: #333;
                }
                .header {
                    text-align: center;
                    border-bottom: 3px solid #2c5f2d;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .header h1 {
                    color: #2c5f2d;
                    font-size: 2em;
                    margin-bottom: 10px;
                }
                .header p {
                    color: #666;
                    font-size: 0.95em;
                }
                .summary-section {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 8px;
                    margin-bottom: 30px;
                    border: 1px solid #ddd;
                }
                .summary-section h2 {
                    color: #2c5f2d;
                    font-size: 1.3em;
                    margin-bottom: 15px;
                }
                .summary-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                    margin-top: 15px;
                }
                .summary-item {
                    background: white;
                    padding: 15px;
                    border-radius: 6px;
                    border-left: 4px solid #2c5f2d;
                }
                .summary-item label {
                    display: block;
                    font-size: 0.85em;
                    color: #666;
                    margin-bottom: 5px;
                }
                .summary-item .value {
                    font-size: 1.5em;
                    font-weight: bold;
                    color: #2c5f2d;
                }
                .summary-item.remaining {
                    border-left-color: ${remaining > 0 ? '#f44336' : '#4CAF50'};
                }
                .summary-item.remaining .value {
                    color: ${remaining > 0 ? '#f44336' : '#4CAF50'};
                }
                .records-section {
                    margin-top: 30px;
                }
                .records-section h2 {
                    color: #2c5f2d;
                    font-size: 1.3em;
                    margin-bottom: 15px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 15px;
                    border: 1px solid #ddd;
                }
                thead {
                    background: #2c5f2d;
                    color: white;
                }
                th, td {
                    padding: 12px;
                    text-align: left;
                    border: 1px solid #ddd;
                }
                th {
                    font-weight: 600;
                }
                tr:nth-child(even) {
                    background: #f8f9fa;
                }
                .footer {
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 2px solid #ddd;
                    text-align: center;
                    color: #666;
                    font-size: 0.9em;
                }
                .islamic-note {
                    background: #e8f5e9;
                    padding: 15px;
                    border-radius: 6px;
                    margin-top: 20px;
                    border: 1px solid #c8e6c9;
                }
                .islamic-note strong {
                    color: #2c5f2d;
                }
                @media print {
                    body { padding: 20px; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>📋 Zakat Distribution Report</h1>
                <p>Based on Authentic Islamic Shariah Methods</p>
                <p style="margin-top: 10px;">Report Generated: ${printDate} | ${hijriDate}</p>
            </div>
            
            <div class="summary-section">
                <h2>Zakat Summary</h2>
                <div class="summary-grid">
                    <div class="summary-item">
                        <label>Total Zakat Due</label>
                        <div class="value">${symbol} ${formatNumber(zakatAmount)}</div>
                    </div>
                    <div class="summary-item">
                        <label>Total Distributed</label>
                        <div class="value">${symbol} ${formatNumber(totalDistributed)}</div>
                    </div>
                    <div class="summary-item remaining">
                        <label>${remaining > 0 ? 'Remaining Balance' : 'Status'}</label>
                        <div class="value">${remaining > 0 ? symbol + ' ' + formatNumber(remaining) : 'Completed ✓'}</div>
                    </div>
                </div>
            </div>
            
            <div class="records-section">
                <h2>Distribution Records (${records.length} ${records.length === 1 ? 'Record' : 'Records'})</h2>
                <table>
                    <thead>
                        <tr>
                            <th style="width: 5%;">#</th>
                            <th style="width: 15%;">Date</th>
                            <th style="width: 20%;">Recipient</th>
                            <th style="width: 15%;">Category</th>
                            <th style="width: 15%;">Amount</th>
                            <th style="width: 30%;">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${recordsHTML}
                    </tbody>
                </table>
            </div>
            
            <div class="islamic-note">
                <p><strong>Remember:</strong> "The example of those who spend their wealth in the way of Allah is like a seed of grain that sprouts seven ears; in every ear there are a hundred grains." (Quran 2:261)</p>
            </div>
            
            <div class="footer">
                <p>Generated by Zakat Calculator | May Allah accept your Zakat. Ameen.</p>
                <p style="margin-top: 5px; font-size: 0.85em;">This is a computer-generated report for personal record-keeping purposes.</p>
            </div>
            
            <script>
                window.onload = function() {
                    window.print();
                }
            </script>
        </body>
        </html>
    `);
    
    printWindow.document.close();
}

console.log('✓ Multi-Currency Calculator Ready - 15 Currencies + Weight Units Supported');
