# AI Spreadsheet Generator

A web application that allows users to generate, edit, and download spreadsheets through natural language conversations with Claude AI.

## Features

- **Split-screen Interface**: Chat with AI on the right, spreadsheet preview on the left
- **AI-Powered**: Uses Claude 4.5 Sonnet to understand requests and generate spreadsheet data
- **Interactive Spreadsheets**: Built with AG Grid for Excel-like functionality
- **Export Capabilities**: Download spreadsheets as CSV or Excel files
- **Conversation History**: Maintains context for editing existing spreadsheets
- **Custom Brown Theme**: Professional color scheme as per user preferences

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express
- **AI**: Claude 4.5 Sonnet via Anthropic API
- **Spreadsheet**: AG Grid Community Edition
- **Styling**: Custom CSS with brown color scheme

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Claude API key from Anthropic

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   cd server && npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the `server/` directory:
   ```
   ANTHROPIC_API_KEY=your_claude_api_key_here
   PORT=3001
   ```

3. **Start the application:**
   
   **Terminal 1 - Backend Server:**
   ```bash
   npm run server:dev
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## Usage

1. **Create a Spreadsheet**: Ask the AI to create any type of spreadsheet
   - "Create a monthly budget spreadsheet"
   - "Generate a sales report for Q1"
   - "Make a contact list with names, emails, and phone numbers"

2. **Edit Spreadsheets**: Reference previous spreadsheets for modifications
   - "Add a new column for department to the last spreadsheet"
   - "Update the salary column with 10% increase"
   - "Filter the data to show only employees from IT department"

3. **Export Data**: Use the export buttons to download your spreadsheets
   - CSV format for general use
   - Excel format (currently exports as CSV due to community edition)

## Example Prompts

- "Create a spreadsheet of my monthly expenses with categories like rent, food, utilities, and entertainment"
- "Generate a project timeline with tasks, start dates, end dates, and assigned team members"
- "Make a inventory list for my store with product names, SKUs, quantities, and prices"
- "Create a student gradebook with student names, subjects, and grades"

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── ChatPanel.tsx          # Chat interface
│   │   └── SpreadsheetPreview.tsx # AG Grid spreadsheet component
│   ├── services/
│   │   └── api.ts                 # API client for backend communication
│   ├── styles/
│   │   └── App.css                # Custom styling with brown theme
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   └── App.tsx                    # Main application component
├── server/
│   ├── index.js                   # Express server with Claude integration
│   └── package.json               # Backend dependencies
└── package.json                   # Frontend dependencies
```

## API Endpoints

- `POST /api/chat` - Send messages to Claude AI
- `GET /api/health` - Health check endpoint

## Development

- **Frontend**: `npm run dev` (runs on port 5173)
- **Backend**: `npm run server:dev` (runs on port 3001)
- **Build**: `npm run build` (creates production build)

## Notes

- The application uses AG Grid Community Edition (free)
- Excel export currently uses CSV format due to community edition limitations
- All API keys are stored securely on the backend
- The app maintains conversation history for context-aware spreadsheet editing