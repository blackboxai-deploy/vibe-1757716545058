# 🚀 Quick Deploy Guide - SKV Global Crypto to skvglobalcrypto.com

## Method 1: Vercel Deployment (RECOMMENDED - 10 Minutes)

### Step 1: Prepare Your Code Repository
1. **Upload your project to GitHub/GitLab/Bitbucket**
   - Create a new repository
   - Upload all the project files from this sandbox
   - Make sure `package.json`, `next.config.ts`, and all source files are included

### Step 2: Deploy to Vercel
1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your repository**
5. **Vercel will auto-detect Next.js settings:**
   - Build Command: `pnpm run build` ✅
   - Output Directory: `.next` ✅
   - Install Command: `pnpm install` ✅

### Step 3: Add Your Custom Domain
1. **In Vercel Dashboard → Your Project → Settings → Domains**
2. **Add Domain:** `skvglobalcrypto.com`
3. **Add WWW:** `www.skvglobalcrypto.com`
4. **Vercel will show you DNS configuration**

### Step 4: Configure DNS with Your Domain Provider
Go to your domain registrar (GoDaddy, Namecheap, etc.) and add:

```
Type: A Record
Name: @
Value: 76.76.19.61

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

### Step 5: Wait for DNS Propagation (5-30 minutes)
- DNS changes can take up to 24 hours but usually work within 30 minutes
- You can check status at: [whatsmydns.net](https://whatsmydns.net)

---

## Method 2: GitHub + Netlify (Alternative)

### Step 1: Upload to GitHub
1. Create new repository on GitHub
2. Upload all project files

### Step 2: Deploy to Netlify
1. **Go to [netlify.com](https://netlify.com)**
2. **Connect GitHub repository**
3. **Build Settings:**
   - Build command: `pnpm run build`
   - Publish directory: `.next`

### Step 3: Add Custom Domain
1. **Site Settings → Domain Management**
2. **Add custom domain:** `skvglobalcrypto.com`
3. **Configure DNS as Netlify instructs**

---

## Method 3: Traditional Web Hosting

### If you have existing web hosting:
1. **Build the project locally:**
   ```bash
   pnpm install
   pnpm run build
   ```
2. **Upload `.next` folder contents to your web server**
3. **Ensure your server supports Node.js applications**
4. **Point your domain to your server**

---

## 🧪 Testing After Deployment

Once live, test these URLs:

```bash
# Main site
https://skvglobalcrypto.com

# API endpoints
https://skvglobalcrypto.com/api/crypto
https://skvglobalcrypto.com/api/portfolio

# SEO files
https://skvglobalcrypto.com/sitemap.xml
https://skvglobalcrypto.com/robots.txt
```

---

## 📞 Need Help?

**Common Issues:**
- **DNS not working?** Wait 24 hours for full propagation
- **Build failing?** Check that all files were uploaded correctly
- **API errors?** Verify environment variables if using external services

**I'm here to help with any deployment issues!**

---

## ✅ Success Checklist

- [ ] Repository created and files uploaded
- [ ] Deployed to hosting platform
- [ ] Custom domain added
- [ ] DNS configured
- [ ] Site accessible at skvglobalcrypto.com
- [ ] All pages loading correctly
- [ ] API endpoints responding
- [ ] Mobile version working
- [ ] SSL certificate active (https://)

**Your professional crypto platform will be live! 🎉**