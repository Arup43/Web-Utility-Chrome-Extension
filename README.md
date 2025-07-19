# Web Utility Chrome Extension

A powerful Chrome extension that provides essential web utilities including word counting and URL bookmarking with notes. Built with React and Vite for a modern, responsive user experience.

## 🚀 Features

### 📊 Word Counter

- **Real-time word counting** on any web page
- Instantly displays the total word count of visible text content
- Works across all websites and web applications
- Clean, easy-to-read display with formatted numbers

### 🔗 URL Saver with Notes

- **Save important URLs** with custom notes and descriptions
- **Organized storage** with timestamps for each saved URL
- **Quick access** to saved URLs with clickable links
- **Easy management** with delete functionality
- **Persistent storage** using Chrome's local storage

## 🛠️ Technology Stack

- **Frontend**: React 19.0.0
- **Build Tool**: Vite 6.3.1
- **Language**: JavaScript (ES6+)
- **Chrome Extension API**: Manifest V3
- **Chrome APIs Used**:
  - `chrome.tabs` - Query active tabs and get tab information
  - `chrome.scripting` - Execute scripts in active tabs for word counting
  - `chrome.storage.local` - Store and retrieve saved URLs with notes
  - `chrome.action` - Extension popup and icon management
- **Styling**: Inline CSS with modern design principles

## 📦 Installation

### Prerequisites

- Google Chrome browser
- Node.js (version 16 or higher)
- npm or yarn package manager

### Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Web-Utility-Chrome-Extension
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build the extension**

   ```bash
   npm run build
   ```

4. **Load the extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked"
   - Select the `dist` folder from the project directory

### Production Installation

1. **Download the extension**

   - Download the latest release from the releases page
   - Extract the ZIP file to a folder on your computer

2. **Install in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the extracted folder

## 🎯 How to Use

### Word Counter

1. Navigate to any web page you want to analyze
2. Click the extension icon in your Chrome toolbar
3. The extension will automatically count and display the word count
4. The count updates automatically when you navigate to different pages

### URL Saver

1. Click the extension icon while on a page you want to save
2. Switch to the "Save URLs" tab
3. Add a note describing why you're saving this URL
4. Click "Save URL with Note"
5. View your saved URLs in the list below
6. Click on any saved URL to open it in a new tab
7. Use the "×" button to delete unwanted entries

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the extension for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the built extension

### Project Structure

```
Web-Utility-Chrome-Extension/
├── public/
│   ├── manifest.json      # Chrome extension manifest
│   └── icons/            # Extension icons
├── src/
│   ├── Popup.jsx         # Main popup component
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles
├── popup.html            # Popup HTML template
├── vite.config.js        # Vite configuration
└── package.json          # Project dependencies
```

### Key Components

- **Popup.jsx**: Main React component handling both word counting and URL saving functionality
- **manifest.json**: Chrome extension configuration with permissions and metadata
- **vite.config.js**: Build configuration optimized for Chrome extension development

## 🔒 Permissions

The extension requires the following permissions:

- `activeTab`: To access the current tab's content for word counting
- `scripting`: To execute scripts in the current tab
- `storage`: To save and retrieve URL data locally
- `host_permissions`: `<all_urls>` to work across all websites

**Note**: This extension is designed for personal use and stores all data locally in your browser. No data is transmitted to external servers.
