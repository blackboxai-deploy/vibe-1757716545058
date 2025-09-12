# 🚀 SKV Global Crypto - Vercel Setup Guide (हिंदी)

## Domain: skvglobalcrypto.com को Vercel पर Setup करना

### Step 1: GitHub Repository बनाना
1. **GitHub पर जाएं:** [github.com](https://github.com)
2. **New Repository** बनाएं:
   - Repository name: `skv-global-crypto`
   - Public या Private (आपकी choice)
   - Create repository पर click करें

### Step 2: Code Upload करना
आपको ये सभी files upload करनी हैं:

```
📁 Project Files:
├── package.json ✅
├── next.config.ts ✅
├── tsconfig.json ✅
├── tailwind.config.js ✅
├── postcss.config.js ✅
├── vercel.json ✅
├── 📁 src/
│   ├── 📁 app/
│   ├── 📁 components/
│   ├── 📁 lib/
│   └── 📁 types/
├── 📁 public/
└── README.md
```

### Step 3: Vercel पर Deploy करना

1. **Vercel पर जाएं:** [vercel.com](https://vercel.com)
2. **GitHub से Sign up** करें
3. **"New Project"** पर click करें
4. **अपना repository select** करें
5. **Deploy** button पर click करें

**Vercel Automatic Settings:**
- Build Command: `pnpm run build` ✅
- Output Directory: `.next` ✅
- Install Command: `pnpm install` ✅

### Step 4: Custom Domain Add करना

1. **Vercel Dashboard में जाएं**
2. **आपका project select करें**
3. **Settings → Domains** पर जाएं
4. **Add Domain** में type करें: `skvglobalcrypto.com`
5. **Add** button पर click करें
6. **www.skvglobalcrypto.com** भी add करें

### Step 5: DNS Configuration

Vercel आपको ये DNS settings दिखाएगा:

```
🌐 DNS Records (Domain Provider में add करें):

Type: A Record
Name: @
Value: 76.76.19.61

Type: CNAME
Name: www  
Value: cname.vercel-dns.com
```

### Step 6: Domain Provider पर DNS Setup

**अपने Domain Provider पर जाकर:**

#### अगर GoDaddy है:
1. GoDaddy account में login करें
2. My Domains → skvglobalcrypto.com
3. DNS Management
4. ऊपर दिए गए records add करें

#### अगर Namecheap है:
1. Namecheap account में login करें
2. Domain List → Manage
3. Advanced DNS tab
4. ऊपर दिए गए records add करें

#### अगर कोई और Provider है:
- Domain management/DNS section में जाएं
- A Record और CNAME add करें

### Step 7: SSL Certificate (Automatic)

Vercel automatically SSL certificate provide करता है:
- ✅ https://skvglobalcrypto.com
- ✅ https://www.skvglobalcrypto.com

### Step 8: Testing

**DNS Propagation Check:**
- [whatsmydns.net](https://whatsmydns.net) पर check करें
- 30 minutes से 24 hours तक time लग सकता है

**Site Testing:**
```
✅ Main Site: https://skvglobalcrypto.com
✅ Dashboard: https://skvglobalcrypto.com/
✅ Portfolio: https://skvglobalcrypto.com/portfolio
✅ Trading: https://skvglobalcrypto.com/trading
✅ Markets: https://skvglobalcrypto.com/markets
✅ Wallet: https://skvglobalcrypto.com/wallet
✅ News: https://skvglobalcrypto.com/news
```

## 🎉 Deployment Complete!

आपका professional cryptocurrency platform live हो जाएगा:
- ⚡ Fast loading with global CDN
- 🔒 SSL certificate included
- 📱 Mobile responsive
- 🔄 Automatic deployments
- 💼 Professional SKV Global branding

## 🆘 Help Needed?

अगर कोई problem आए तो बताइए:
- DNS configuration में help
- Vercel setup में assistance  
- Domain provider के साथ issues
- Testing में problems

**आपका crypto platform तैयार है skvglobalcrypto.com पर live होने के लिए!** 🚀