# 🧩 TokenMeter

**Measure what matters — every token counts.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

🌐 **Live Application**: [https://token-meter.purplestrike.net/](https://token-meter.purplestrike.net/)

TokenMeter is a powerful, client-side web application that measures and compares token counts across multiple serialization formats. It helps developers and LLM users understand which data formats consume the fewest tokens when sending structured data to Large Language Models, optimizing API costs and improving efficiency.

## ✨ Features

### 🎯 Core Functionality
- **Multi-Format Support**: Compare token usage across 10+ formats:
  - JSON, TOON, YAML, XML, TOML
  - BSON, MessagePack, Avro
  - CBOR (Concise Binary Object Representation)
  - Protocol Buffers (Protobuf)
- **Real-Time Analysis**: Client-side token counting using GPT-4 tokenizer (cl100k_base encoding)
- **Visual Comparison**: Interactive bar charts showing token usage across all formats
- **Efficiency Insights**: Automatically identify the most token-efficient format with percentage savings
- **Format Auto-Detection**: Automatically detects input format (JSON, YAML, XML, TOML, etc.)

### 🎨 User Experience
- **Prompt Templates**: Pre-built complex templates for testing:
  - User Profile with Nested Data
  - Product Catalog with Arrays
  - Event Registration with Mixed Types
  - Survey Data with Long Text Fields
  - Complex Nested Project Data
  - Plaintext Article
  - Custom Input option
- **Dark Mode**: Toggle between light and dark themes
- **Local Storage**: Remember recent inputs and preferences
- **CSV Export**: Download comparison results as CSV for further analysis
- **100% Client-Side**: No backend or API calls required - complete privacy

### 🚀 Performance
- Fast client-side processing
- Optimized token counting algorithms
- Smooth animations and transitions
- Responsive design for all devices

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** or **pnpm** package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/purplestrike/TokenMeter.git
   cd TokenMeter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
# or
pnpm build
```

The built files will be in the `dist` directory, ready for deployment.

### Preview Production Build

```bash
npm run preview
# or
pnpm preview
```

## 🛠️ Tech Stack

### Core Technologies
- **React 18** - Modern UI framework with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions

### State Management
- **Zustand** - Lightweight state management with persistence

### Data Visualization
- **Recharts** - Composable charting library

### Token Counting
- **js-tiktoken** - Fast token counting using GPT-4 tokenizer

### Format Converters
- **js-yaml** - YAML parsing and conversion
- **xml-js** - XML parsing and conversion
- **toml** / **@iarna/toml** - TOML parsing and conversion

## 📁 Project Structure

```
TokenMeter/
├── public/
│   └── logo.png              # Application logo
├── src/
│   ├── components/
│   │   ├── InputArea.tsx      # Input panel with textarea
│   │   ├── TokenResults.tsx   # Results comparison table
│   │   ├── ComparisonChart.tsx # Bar chart visualization
│   │   ├── InsightsPanel.tsx  # Efficiency insights
│   │   ├── PromptTemplates.tsx # Template selector
│   │   └── FormatPreviewTable.tsx # Format preview
│   ├── lib/
│   │   ├── TokenAnalyzer.ts   # Core analysis logic
│   │   └── converters/
│   │       ├── index.ts        # Converter registry
│   │       ├── jsonToYaml.ts
│   │       ├── jsonToXml.ts
│   │       ├── jsonToToon.ts
│   │       ├── jsonToToml.ts
│   │       ├── jsonToBson.ts
│   │       ├── jsonToMessagePack.ts
│   │       ├── jsonToAvro.ts
│   │       ├── jsonToCbor.ts
│   │       └── jsonToProtobuf.ts
│   ├── store/
│   │   └── useTokenStore.ts    # Zustand state management
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🎯 Usage

### Basic Usage

1. **Enter Your Data**: Type or paste your structured data (JSON, YAML, XML, etc.) into the input field
2. **Auto-Detection**: The system automatically detects the input format
3. **Calculate Tokens**: Click "Calculate Tokens" to analyze
4. **View Results**: See token counts, comparison chart, and efficiency insights
5. **Export**: Download results as CSV if needed

### Using Prompt Templates

1. Click on **"Prompt Templates"** to expand the template section
2. Select a pre-built template:
   - User Profile with Nested Data
   - Product Catalog with Arrays
   - Event Registration with Mixed Types
   - Survey Data with Long Text Fields
   - Complex Nested Project Data
   - Plaintext Article
   - Custom Input (for your own data)
3. The template will auto-fill the input field
4. Click "Calculate Tokens" to analyze

### Example Input

**JSON:**
```json
{
  "name": "Alice",
  "age": 30,
  "email": "alice@example.com",
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}
```

**YAML:**
```yaml
name: Alice
age: 30
email: alice@example.com
preferences:
  theme: dark
  notifications: true
```

### Example Output

The application will show:
- Token count for each format
- Percentage difference vs JSON
- Visual bar chart comparison
- Most efficient format recommendation
- Detailed insights panel

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project uses:
- **ESLint** for code linting
- **TypeScript** for type checking
- **Prettier** (recommended) for code formatting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly
- Ensure all linting passes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact & Support

- **Live Application**: [https://token-meter.purplestrike.net/](https://token-meter.purplestrike.net/)
- **Issues**: [GitHub Issues](https://github.com/purplestrike/TokenMeter/issues)
- **Discussions**: [GitHub Discussions](https://github.com/purplestrike/TokenMeter/discussions)

## 🌟 Star History

If you find TokenMeter useful, please consider giving it a star ⭐ on GitHub!

---

**Made with ❤️ for the developer community**

*Measure what matters — every token counts.*
