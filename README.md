# Zakat Calculator - Authentic Islamic Shariah Method

A modern, comprehensive web application for calculating Zakat based on authentic Islamic jurisprudence (Fiqh) and scholarly consensus.

## Overview

This calculator implements the most widely accepted Islamic methods for Zakat calculation across the four major schools of Islamic jurisprudence (Maliki, Hanafi, Shafi'i, and Hanbali).

## Features

### ✓ Core Calculation Features
- **Precise Nisab Calculation**: Based on authentic Islamic standards (87.48g gold or 612.36g silver)
- **Real-time Price Fetching**: Automatic fetch of current gold and silver spot prices
- **Multi-asset Support**: Calculate Zakat on gold, silver, cash, business inventory, stocks, and investments
- **Liability Deduction**: Properly deduct debts from total wealth
- **Currency Conversion**: Support for multiple currencies with customizable exchange rates

### ✓ Islamic Authenticity
- **Shariah-based**: Follows authentic Hadith and scholarly consensus
- **Four Madhabs**: Incorporates methodology from Maliki, Hanafi, Shafi'i, and Hanbali schools
- **Proper Nisab Standard**: Uses historically verified measurements (2.5 Mithqal = 87.48g gold)
- **2.5% Rate**: Standard Zakat rate (Rub' Al-'Ushr) as per Islamic law

### ✓ Educational Resources
- **Comprehensive References**: Includes Quranic verses, Hadith references, and scholarly sources
- **Zakat Recipients**: Details of eight categories (Asnaf) eligible for Zakat
- **Calculation Guidelines**: Explains which assets are included and which are excluded
- **Important Disclaimers**: Emphasizes consultation with qualified Islamic scholars

### ✓ User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Nisab values update automatically as prices change
- **Professional Styling**: Modern, Islamic-themed design with intuitive interface
- **Print-friendly**: Can print or save results as PDF
- **Sticky Results Panel**: Results remain visible while scrolling

## Installation & Usage

### Option 1: Open Directly
Simply open `index.html` in any modern web browser. No installation required.

```
Double-click index.html
or
File → Open in Browser
```

### Option 2: Use a Local Server (Recommended)
For better functionality (especially price fetching), run with a local server:

**Windows (Command Prompt):**
```cmd
# Using Python (if installed)
python -m http.server 8000

# Or using Node.js
npx http-server
```

Then visit: `http://localhost:8000`

## How to Use

### Step 1: Enter Market Prices
- Enter current gold price per gram (USD)
- Enter current silver price per gram (USD)
- Use "Fetch Current" buttons for automatic price updates
- Set currency conversion rate if needed

### Step 2: View Nisab
- The calculator automatically displays Nisab threshold
- Both gold-based and silver-based Nisab are shown
- The lower value is your applicable Nisab

### Step 3: Enter Your Wealth
- **Gold & Silver**: Enter total weight in grams
- **Cash**: All liquid funds (bank accounts, savings, cash on hand)
- **Business Inventory**: Merchandise held for sale
- **Other Assets**: Stocks, bonds, real estate investments, cryptocurrency
- **Liabilities**: Total debts owed

**Excluded (Not Counted):**
- Primary residence
- Personal vehicle
- Household furnishings
- Professional tools
- Basic living expenses

### Step 4: Calculate
- Click "Calculate Zakat" button
- Results display instantly
- Zakat amount shown in USD and local currency

### Step 5: Review & Reference
- Check detailed results breakdown
- Refer to Shariah references section
- Consult with your local Islamic scholar before payment

## Islamic Methodology

### Nisab Standards (Authentic Islamic Measurements)
- **Gold**: 87.48 grams (2.5 Mithqal) - Imam Malik standard
- **Silver**: 612.36 grams (52.5 Dirham) - Hanafi standard
- **Application**: Use whichever is LOWER in current market value
- **Sources**: 
  - Sahih Muslim 979
  - Sunan Abu Dawud 1563
  - Scholarly consensus (Ijma')

### Zakat Rate
- **Standard Rate**: 2.5% (Rub' Al-'Ushr)
- **Calculation Period**: 1 Lunar (Islamic) Year = 354-355 days
- **Possession Requirement**: Wealth must be held for complete lunar year (Hawl)

### Assets Subject to Zakat
1. **Gold & Silver** - Including jewelry (if not worn as personal adornment)
2. **Cash** - All currency and monetary assets
3. **Bank Deposits** - Savings accounts and money market accounts
4. **Business Inventory** - Merchandise held for sale at fair market value
5. **Stocks & Bonds** - Investment securities at market value
6. **Cryptocurrencies** - Digital assets valued at current market price
7. **Accounts Receivable** - Money owed to you by others

### Assets Exempt from Zakat
- Personal residence (primary home)
- Personal vehicle(s)
- Household furniture and belongings
- Clothing and personal items
- Professional equipment and tools
- Land for personal use
- Crops consumed directly by family
- Food and necessities for personal use

## Quranic & Hadith References

### Primary Sources

**The Quran:**
- Surah At-Taubah (9:60) - Zakat recipients and distribution
- Surah Al-An'am (6:141) - Obligation to pay Zakat
- Surah An-Nur (24:56) - Establishment of Zakat

**Authenticated Hadith:**
- Sahih Al-Bukhari 1395 - Rate of 2.5% for gold and silver
- Sahih Muslim 979 - Nisab and exemption amounts
- Sahih At-Tirmidhi 621 - Zakat requirements and conditions
- Sunan Abu Dawud 1563 - Zakat on trade goods
- Sunan Ibn Majah 1790 - Lunar year calculation
- Sunan At-Tirmidhi 620 - Possession period (Hawl)

### Scholarly References
- "Fiqh al-Zakat" by Yusuf al-Qaradawi (2 volumes) - Most comprehensive modern treatment
- "The Lawful and the Prohibited in Islam" by Yusuf al-Qaradawi
- "The Fiqh of Zakat" by Muhammad 'Abdur-Rahman al-'Arif
- Classical texts: Hashiyah Ibn 'Abidin (Hanafi), Al-Mudawwanah (Maliki)

## Zakat Recipients (Eight Categories - Asnaf)

As mentioned in Surah At-Taubah 9:60:

1. **Al-Fuqara** (The Extremely Poor) - Those with nothing
2. **Al-Masakin** (The Poor) - Those with insufficient means
3. **Aamileen** (Zakat Administrators) - Officials collecting and distributing Zakat
4. **Mu'allafat Al-Qulub** (Sympathizers of Islam) - Those whose hearts are inclined toward Islam
5. **Ar-Riqab** (Those in Bondage) - Slaves, captives, or indentured persons
6. **Al-Gharimin** (Those in Debt) - Those in financial hardship due to debt
7. **Fi Sabilillah** (In the Path of Allah) - Mujahideen, Islamic education, charitable works
8. **Ibnu As-Sabil** (Travelers in Need) - Travelers who have lost their means

## Important Notes

### ⚠️ Disclaimer
This calculator is for **educational and estimation purposes only**. While based on authentic Islamic principles:

1. **Consult a Scholar**: Before paying Zakat, consult your local Islamic scholar or Imam
2. **Verify Calculation**: Have your calculation verified by a qualified Islamic financial advisor
3. **School of Thought**: Different Madhhabs may have slight variations - align with your preferred school
4. **Individual Circumstances**: Personal situations may affect calculations (e.g., debts, dependents, future needs)

### ⚠️ Price Considerations
- Precious metal prices fluctuate daily
- Use reliable market sources (LBMA for gold/silver)
- Consider using average prices if calculating for past periods
- Ensure prices match your location/currency

### ⚠️ Lunar Year Calculation
- Islamic year = 354-355 days (11 days shorter than solar year)
- Zakat anniversary dates shift by ~11 days annually
- Can calculate on Gregorian anniversary for simplicity (most scholars permit)
- Check Islamic calendar for exact Hijri dates

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup for accessibility
- **CSS3**: Modern styling with flexbox and grid layouts
- **Vanilla JavaScript**: No dependencies, pure JavaScript calculations
- **APIs**: Optional integration with metals.live for spot prices

### Browser Compatibility
- Chrome/Edge: ✓ Full support
- Firefox: ✓ Full support
- Safari: ✓ Full support
- IE11: ⚠️ Limited support (not recommended)

### Responsive Design
- Desktop: Optimized for 1024px+ screens
- Tablet: Adjusted layout for 768px+ screens
- Mobile: Full-featured on 320px+ screens

## Files Included

```
ZakatCalculation/
├── index.html          # Main HTML file with calculator interface
├── style.css           # Complete styling and responsive design
├── script.js           # Calculation logic and interactivity
└── README.md           # This documentation file
```

## Customization

### Adding Your Own Currency
Edit the `getCurrencySymbol()` function in `script.js`:

```javascript
const rateMap = {
    '82.5': '₨',        // PKR (Pakistani Rupee)
    '12': '₪',          // ILS (Israeli Shekel)
    '3.67': 'AED',      // UAE Dirham
    '15': '﷼',          // IRR (Iranian Rial)
    'YOUR_RATE': 'YOUR_SYMBOL'
};
```

### Modifying Nisab Values
If you use different scholarly standards, edit in `script.js`:

```javascript
const GOLD_NISAB_GRAMS = 87.48;      // Change this value
const SILVER_NISAB_GRAMS = 612.36;   // Change this value
```

## Troubleshooting

### Price Fetch Not Working
- Check internet connection
- Try entering prices manually
- Use: https://www.lbma.org.uk/ for official gold prices
- Use Kitco or APMEX for spot silver prices

### Calculations Seem Wrong
- Verify all inputs are in correct units (grams, USD, local currency)
- Ensure conversion rate is correct
- Check that prices are actual spot values
- Consult the references to understand calculation methodology

### Mobile Display Issues
- Try in different browser (Chrome, Firefox, Safari)
- Clear browser cache
- Reload page
- Check screen orientation

## Important Islamic Reminders

> "The best of you are those who are best to their families, and I am the best among you to my families." - Prophet Muhammad (peace be upon him)

> "Charity does not decrease wealth." - Prophet Muhammad (peace be upon him)

> "Whoever gives Zakat of their wealth, Allah will remove the guilt from them and reward them." - Based on Quran 9:104

## Support & Questions

For questions about:
- **Islamic rulings**: Consult your local Islamic scholar or Imam
- **Calculation methodology**: Refer to "Fiqh al-Zakat" by Yusuf al-Qaradawi
- **Technical issues**: Review this README and script comments
- **Charitable distribution**: Contact established Islamic organizations

## Recommended Charitable Organizations

- **International**: Islamic Relief Worldwide, Muslim Hands
- **Regional**: Local Masjids, Islamic Centers, Community Organizations
- **Specialized**: Zakat Foundation International, ICNA Community Outreach

---

**May Allah accept from us and all Muslims.** *(Ameen)*

*Last Updated: February 2026*
*Version: 1.0*
