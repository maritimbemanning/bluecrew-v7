# IndexNow Setup Guide

IndexNow is a protocol that allows you to instantly notify search engines when content is added, updated, or deleted. This helps your site get indexed faster!

## ✅ Setup Complete

Your site is now configured with IndexNow! Here's what was set up:

### 1. Key File
- **Location**: `/public/2e1cef9560304b3279a0a8b7101c13b3539560c2bae7077700380f741fb39d0f.txt`
- **Purpose**: Verifies ownership of bluecrew.no
- **Status**: ✅ Deployed (accessible at https://bluecrew.no/2e1cef9560304b3279a0a8b7101c13b3539560c2bae7077700380f741fb39d0f.txt)

### 2. API Endpoints
- **`/api/indexnow`** - Submit URLs to IndexNow
- **`/api/indexnow/submit-all`** - Submit all sitemap URLs at once

### 3. Utility Functions
- **`submitUrlToIndexNow(url)`** - Submit a single URL
- **`submitUrlsToIndexNow(urls)`** - Submit multiple URLs
- **`submitSitemapToIndexNow()`** - Submit entire sitemap

## 🚀 How to Use

### Option 1: Submit All URLs (One-Time Setup)
After deploying, run this to submit all your existing pages:

```bash
curl -X POST https://bluecrew.no/api/indexnow/submit-all
```

Or in your browser console:
```javascript
fetch('/api/indexnow/submit-all', { method: 'POST' })
  .then(r => r.json())
  .then(console.log);
```

### Option 2: Submit Individual URLs
When you create/update content, notify search engines:

```typescript
import { submitUrlToIndexNow } from '@/lib/indexnow';

// After creating a new job posting
await submitUrlToIndexNow('https://bluecrew.no/stillinger/new-job-slug');
```

### Option 3: Submit Multiple URLs
```typescript
import { submitUrlsToIndexNow } from '@/lib/indexnow';

await submitUrlsToIndexNow([
  'https://bluecrew.no/stillinger/job-1',
  'https://bluecrew.no/stillinger/job-2',
  'https://bluecrew.no/crew/new-article',
]);
```

## 🔄 Automatic Submission (Recommended)

Add IndexNow submission to your content creation workflows:

### For Job Postings
Add this to your job creation API route:

```typescript
// In /api/stillinger/create/route.ts (or wherever you create jobs)
import { submitUrlToIndexNow } from '@/lib/indexnow';

// After successfully creating job
const jobUrl = `https://bluecrew.no/stillinger/${slug}`;
await submitUrlToIndexNow(jobUrl);
```

### For Crew Articles
```typescript
// After publishing a crew article
const articleUrl = `https://bluecrew.no/crew/${slug}`;
await submitUrlToIndexNow(articleUrl);
```

## 📊 Testing

### Test Single URL Submission
```bash
curl "https://bluecrew.no/api/indexnow?url=https://bluecrew.no/"
```

### Test Batch Submission
```bash
curl -X POST https://bluecrew.no/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"urls":["https://bluecrew.no/","https://bluecrew.no/stillinger"]}'
```

## 🔍 Verify Setup

1. **Check key file is accessible**:
   - Visit: https://bluecrew.no/2e1cef9560304b3279a0a8b7101c13b3539560c2bae7077700380f741fb39d0f.txt
   - Should display: `2e1cef9560304b3279a0a8b7101c13b3539560c2bae7077700380f741fb39d0f`

2. **Submit a test URL**:
   ```bash
   curl "https://bluecrew.no/api/indexnow?url=https://bluecrew.no/"
   ```
   - Should return: `{"success":true,...}`

3. **Check search engine response**:
   - HTTP 200 = Success
   - HTTP 202 = Accepted (key validation pending)
   - HTTP 400 = Bad request
   - HTTP 403 = Key not valid

## 📈 Benefits

- **Faster Indexing**: Search engines discover your content within minutes instead of days
- **Better SEO**: Fresh content gets indexed and ranked faster
- **No Crawl Budget Waste**: Only notify when content actually changes
- **Multi-Engine Support**: Automatically submits to Bing, Yandex, and other participating engines

## 🔧 Maintenance

### Rotating the Key (Optional)
If you ever need to change the key:

1. Generate new key: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
2. Update `/public/{new-key}.txt`
3. Update `INDEXNOW_KEY` in `/src/app/api/indexnow/route.ts`
4. Update `INDEXNOW_KEY` in `/src/app/api/indexnow/submit-all/route.ts`
5. Deploy changes
6. Delete old key file

### Monitoring
- Check your server logs for IndexNow submission errors
- Search engines typically respond with HTTP 200 for successful submissions
- No response from search engines doesn't mean failure - they might be rate limiting

## 📚 Resources

- [IndexNow Documentation](https://www.indexnow.org/documentation)
- [Bing IndexNow Guide](https://www.bing.com/indexnow)
- [Supported Search Engines](https://www.indexnow.org/)

## ⚠️ Important Notes

- **Don't spam**: Only submit URLs when content actually changes
- **Rate limits**: Search engines may rate limit excessive submissions
- **Valid URLs only**: Only submit URLs from bluecrew.no
- **Max 10,000 URLs per request**
- **Keep key secret**: Only you and search engines should know the key

## 🎯 Next Steps

1. ✅ Deploy to production
2. ✅ Verify key file is accessible
3. ✅ Run `/api/indexnow/submit-all` to submit all existing pages
4. ✅ Add automatic submission to job posting creation
5. ✅ Add automatic submission to content updates
6. ✅ Monitor search engine indexing speed

---

**Setup completed on**: January 13, 2026
**Key**: `2e1cef9560304b3279a0a8b7101c13b3539560c2bae7077700380f741fb39d0f`
