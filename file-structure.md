# File Structure Summary

## 📁 Current Files

### 🌐 **HTML Files**
- **`index.html`** - Facebook post with manual trigger button
- **`neutral-reader.html`** - Facebook post with 5-state demo flow

### 🎨 **CSS Files**
- **`facebook-post.css`** - CSS for `index.html` (Facebook post + Neutral Reader)
- **`neutral-reader.css`** - CSS for `neutral-reader.html` (Demo prototype)
- **`styles.css`** - Original Facebook post styles (legacy, can be deleted)

### ⚡ **JavaScript Files**
- **`script.js`** - Interactive functionality for both HTML files

### 📄 **Documentation**
- **`README.md`** - Project documentation
- **`add-thumbnail.md`** - Instructions for adding real thumbnails
- **`file-structure.md`** - This file

### 🖼️ **Assets**
- **`images/`** folder:
  - `news-thumbnail.jpg` - Real VnExpress article image
  - `news-thumbnail.svg` - SVG placeholder (legacy)

## 🔗 **File Relationships**

### **index.html**
```
index.html
├── facebook-post.css (main styles)
├── script.js (interactions)
└── images/news-thumbnail.jpg (thumbnail)
```

### **neutral-reader.html**
```
neutral-reader.html
├── neutral-reader.css (main styles)
├── [embedded script] (state machine)
└── images/news-thumbnail.jpg (thumbnail)
```

## 🎯 **Main Features**

### **Both Files Include:**
- ✅ Complete Facebook post layout
- ✅ Neutral Reader functionality
- ✅ Educational popover with annotations
- ✅ Share modal with both versions
- ✅ Responsive design
- ✅ High z-index popover (99999)
- ✅ Real VnExpress thumbnail

### **Key Differences:**
| Feature | index.html | neutral-reader.html |
|---------|------------|-------------------|
| **Control** | Manual trigger button | Step-by-step demo |
| **CSS** | External file | External file |
| **JavaScript** | External file | Embedded |
| **States** | Toggle on/off | 5 demo states |
| **Use Case** | Production demo | Educational walkthrough |

## 🗑️ **Legacy Files**
- `styles.css` - Can be safely deleted (functionality moved to `facebook-post.css`)

## 🚀 **How to Use**

### **For Manual Demo:**
1. Open `index.html`
2. Click blue trigger button (top-left)
3. Click red NR badge to see analysis
4. Share neutral version

### **For Step-by-Step Demo:**
1. Open `neutral-reader.html`
2. Use Prev/Next/Reset buttons (top-right)
3. Walk through all 5 states
4. See educational progression

Both versions now have **external CSS files** for better maintainability! 🎉
