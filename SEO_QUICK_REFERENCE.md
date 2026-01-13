# SEO Quick Reference Card

## 🚀 IndexNow - Instant Indexing

### After Deployment
```bash
# 1. Verify key file is accessible
curl https://bluecrew.no/2e1cef9560304b3279a0a8b7101c13b3539560c2bae7077700380f741fb39d0f.txt

# 2. Submit all existing pages (one-time)
curl -X POST https://bluecrew.no/api/indexnow/submit-all

# 3. Test single URL submission
curl "https://bluecrew.no/api/indexnow?url=https://bluecrew.no/"

# 4. Run full test suite
node test-indexnow.js
```

### In Your Code
```typescript
import { submitUrlToIndexNow } from '@/lib/indexnow';

// After creating/updating content
await submitUrlToIndexNow('https://bluecrew.no/stillinger/new-job');
```

---

## 📊 Top 3 SEO Priorities

### 1. ⚡ IndexNow (This Week)
- [x] Implemented
- [ ] Deploy to production
- [ ] Submit all URLs
- [ ] Add to content workflows

### 2. 🔗 Backlinks (This Month)
- [ ] Submit to 15 industry directories
- [ ] Write 2 guest posts
- [ ] Contact 5 maritime schools
- [ ] Get 10 high-quality links

### 3. 📝 Content (Ongoing)
- [ ] 2 crew stories per month
- [ ] 1 industry guide per quarter
- [ ] Update salary data quarterly

---

## 🎯 Quick Wins Checklist

### Week 1
- [ ] Deploy IndexNow
- [ ] Submit to Proff.no
- [ ] Submit to Gulesider.no
- [ ] Submit to 1881.no
- [ ] Contact Skipsrevyen for guest post

### Week 2
- [ ] Submit to 5 maritime directories
- [ ] Write guest post #1
- [ ] Contact 3 maritime schools
- [ ] Create backlink tracking spreadsheet

### Week 3
- [ ] Publish guest post #1
- [ ] Submit to 5 more directories
- [ ] Write guest post #2
- [ ] Contact Harstad Tidende for PR

### Week 4
- [ ] Review IndexNow performance
- [ ] Track new backlinks
- [ ] Publish guest post #2
- [ ] Plan next month's content

---

## 📞 Key Contacts

### Media
- **Skipsrevyen**: redaksjon@skipsrevyen.no
- **Kyst.no**: Via contact form
- **Harstad Tidende**: redaksjon@ht.no
- **Offshore.no**: redaksjon@offshore.no

### Directories
- **Proff.no**: Self-service
- **Bemanningsbransjen.no**: Contact via website
- **Maritimt Forum**: Contact for member listing

### Partnerships
- **Maritime schools**: Research local contacts
- **Industry organizations**: Via membership portals

---

## 📈 Metrics to Track

### Weekly
- New backlinks acquired
- IndexNow submissions
- Organic traffic trend

### Monthly
- Total referring domains
- Domain authority
- Keyword rankings
- Organic conversions

### Quarterly
- Content published
- Guest posts published
- Partnership agreements
- Traffic growth %

---

## 🔧 Tools & Resources

### SEO Tools
- **Google Search Console**: search.google.com/search-console
- **Bing Webmaster Tools**: bing.com/webmasters
- **Ahrefs Backlink Checker**: ahrefs.com/backlink-checker (free)

### IndexNow
- **Documentation**: indexnow.org/documentation
- **Key File**: /public/2e1c...9d0f.txt
- **API**: /api/indexnow

### Content Ideas
- Salary guides (update quarterly)
- Career paths (evergreen)
- Industry reports (annual)
- Success stories (monthly)

---

## ⚠️ Common Mistakes to Avoid

### Don't
❌ Buy links
❌ Use link farms
❌ Spam comments
❌ Ignore IndexNow errors
❌ Forget to track metrics

### Do
✅ Focus on quality over quantity
✅ Build relationships first
✅ Create valuable content
✅ Monitor and measure
✅ Be patient (SEO takes time)

---

## 🎯 Success Criteria

### 3 Months
- 20+ quality backlinks
- DA 15-20
- 30% traffic increase
- 5+ guest posts

### 6 Months
- 50+ quality backlinks
- DA 25-30
- 100% traffic increase
- 10+ guest posts

### 12 Months
- 100+ quality backlinks
- DA 35-40
- 200% traffic increase
- Top 3 for key terms

---

## 📚 Documentation

- **IndexNow Setup**: `INDEXNOW_SETUP.md`
- **Backlink Strategy**: `BACKLINK_STRATEGY.md`
- **Full Summary**: `SEO_IMPROVEMENTS_SUMMARY.md`
- **Test Script**: `test-indexnow.js`

---

## 🆘 Troubleshooting

### IndexNow not working?
1. Check key file is accessible
2. Verify API routes are deployed
3. Check server logs for errors
4. Test with curl commands

### No backlinks?
1. Are you reaching out enough?
2. Is your content valuable?
3. Are you following up?
4. Are you tracking properly?

### Traffic not growing?
1. Give it time (3-6 months)
2. Check Search Console for issues
3. Verify backlinks are indexed
4. Review content quality

---

**Quick Start**: Deploy → Test → Submit All → Add to Workflows → Track Results

**Remember**: SEO is a marathon, not a sprint. Focus on quality and consistency!
