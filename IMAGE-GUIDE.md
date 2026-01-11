# IMAGE MANAGEMENT (LOCAL)

## 📁 Directory Structure

Images are stored locally in `public/images/`.
All images should be converted to **WebP** format for performance.

Structure:
```
public/images/
├── team/
│   ├── isak.webp
│   └── tor.webp
├── og/
│   ├── default.webp     (1200x630)
│   ├── sjofolk.webp     (1200x630)
│   ├── rederi.webp      (1200x630)
│   └── lonn.webp        (1200x630)
├── hero/
│   └── background.webp
├── sectors/
│   ├── offshore.webp
│   ├── havbruk.webp
│   └── shipping.webp
├── careers/
│   ├── kaptein.webp
│   ├── maskinist.webp
│   └── matros.webp
├── lonn/
│   ├── hero.webp
│   ├── hero-2.webp
│   └── guide.webp
└── about/
    ├── handshake.webp
    └── diploma.webp
```

## 🚀 HOW TO ADD IMAGES

1.  Add your image (jpg/png) to the appropriate folder in `public/images/`.
2.  Run the conversion script:
    ```bash
    node scripts/convert-to-webp.mjs
    ```
3.  Update `src/lib/images.ts` if adding a new named path.

---

## 🗑️ DEPRECATED: SUPABASE STORAGE

*The following section is deprecated as we have moved to local image hosting.*

## 📁 Bucket Structure
const { data: { publicUrl } } = supabase.storage
  .from('images')
  .getPublicUrl('team/isak.jpg');
```

---

## 📸 IMAGE SPECIFICATIONS

### Team Photos
- **Format:** JPG or PNG
- **Size:** 400x400px (square)
- **Names:** `team/isak.jpg`, `team/tor.jpg`
- **Quality:** High-res, professional
- **Background:** Transparent PNG or solid color

### OG Images (Social Sharing)
- **Format:** PNG
- **Size:** 1200x630px (Facebook/LinkedIn standard)
- **Names:** `og/default.png`, `og/sjofolk.png`, etc.
- **Content:** 
  - Bluecrew logo
  - Page title in big text
  - Arctic blue gradient background
  - No text smaller than 50px

**Tools to create OG images:**
- Canva (easiest)
- Figma
- @vercel/og (programmatic generation)

### Favicons
- **Format:** PNG + ICO
- **Sizes:** 16x16, 32x32, 180x180, 192x192, 512x512
- **Location:** `/public/` folder (NOT Supabase)
- **Tools:** favicon.io, realfavicongenerator.net

---

## 🔧 HOW IT WORKS IN CODE

### Using the helper function:

```typescript
import { getImageUrl, IMAGE_PATHS } from '@/lib/images';
import Image from 'next/image';

// Get team photo
const isakPhoto = getImageUrl(IMAGE_PATHS.team.isak);
// Returns: https://[project].supabase.co/storage/v1/object/public/images/team/isak.jpg

// Use in component
<Image 
  src={isakPhoto} 
  alt="Isak Didriksson" 
  width={200} 
  height={200} 
  className="rounded-full"
/>
```

### Already integrated in:
- ✅ `TeamGrid.tsx` - Will show real photos if uploaded, falls back to initials

---

## 📤 UPLOAD CHECKLIST

### 1. Team Photos (Priority 1)
- [ ] Upload `team/isak.jpg` (400x400px)
- [ ] Upload `team/tor.jpg` (400x400px)
- [ ] Verify images are public
- [ ] Refresh site to see photos

### 2. OG Images (Priority 2)
- [ ] Create `og/default.png` (1200x630px)
- [ ] Upload to Supabase `images/og/`
- [ ] Update metadata in pages to use URLs
- [ ] Test with Facebook Debugger or LinkedIn Post Inspector

### 3. Favicons (Priority 3)
- [ ] Generate favicon set (favicon.io)
- [ ] Download zip
- [ ] Copy to `/public/` folder
- [ ] Add to `<head>` in layout.tsx

---

## 🎨 DESIGN GUIDELINES FOR IMAGES

### Colors (match site)
- **Primary:** Arctic Cyan (#22d3ee)
- **Secondary:** Ocean Blue (#0c1929)
- **Accent:** Seafoam Green (#34d399)

### Style
- Modern, clean, professional
- High contrast
- Consistent with "Premium Nordic Maritime" brand
- Avoid stock photos that look generic

---

## ⚡ QUICK START

**Right now, upload these 2 files to get started:**

1. **`team/isak.jpg`** - Isak's photo (400x400px, square)
2. **`team/tor.jpg`** - Tor's photo (400x400px, square)

The `TeamGrid` component is already set up to display them automatically!

**URL format:**
```
https://[YOUR_PROJECT_ID].supabase.co/storage/v1/object/public/images/team/isak.jpg
```

Replace `[YOUR_PROJECT_ID]` with your actual Supabase project ID.

---

## 🔗 NEED HELP?

If you need help creating OG images or optimizing photos, just say the word!

