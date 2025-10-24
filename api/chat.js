export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Mock spreadsheet data generator
    const generateSpreadsheet = (msg) => {
      const lowerMsg = msg.toLowerCase();
      
      if (lowerMsg.includes('employee') || lowerMsg.includes('staff')) {
        return {
          type: 'spreadsheet',
          data: [
            { name: 'John Doe', age: 30, department: 'Engineering', salary: 75000 },
            { name: 'Jane Smith', age: 28, department: 'Marketing', salary: 65000 },
            { name: 'Bob Johnson', age: 35, department: 'Sales', salary: 80000 },
            { name: 'Alice Brown', age: 32, department: 'HR', salary: 60000 }
          ],
          message: 'I\'ve created an employee spreadsheet for you!'
        };
      }
      
      if (lowerMsg.includes('budget') || lowerMsg.includes('expense')) {
        return {
          type: 'spreadsheet',
          data: [
            { category: 'Rent', amount: 1200, date: '2024-01-01', paid: true },
            { category: 'Groceries', amount: 300, date: '2024-01-02', paid: true },
            { category: 'Utilities', amount: 150, date: '2024-01-03', paid: false },
            { category: 'Entertainment', amount: 200, date: '2024-01-04', paid: true }
          ],
          message: 'I\'ve created a budget/expense spreadsheet for you!'
        };
      }
      
      if (lowerMsg.includes('sales') || lowerMsg.includes('revenue')) {
        return {
          type: 'spreadsheet',
          data: [
            { product: 'Laptop', quantity: 50, price: 999, total: 49950 },
            { product: 'Mouse', quantity: 100, price: 25, total: 2500 },
            { product: 'Keyboard', quantity: 75, price: 75, total: 5625 },
            { product: 'Monitor', quantity: 30, price: 299, total: 8970 }
          ],
          message: 'I\'ve created a sales report spreadsheet for you!'
        };
      }
      
      // Default spreadsheet
      return {
        type: 'spreadsheet',
        data: [
          { item: 'Item 1', value: 100, category: 'A' },
          { item: 'Item 2', value: 200, category: 'B' },
          { item: 'Item 3', value: 150, category: 'A' },
          { item: 'Item 4', value: 300, category: 'C' }
        ],
        message: 'I\'ve created a sample spreadsheet for you!'
      };
    };

    const spreadsheetData = generateSpreadsheet(message);

    res.status(200).json({
      response: spreadsheetData,
      message: `Here's your spreadsheet: ${spreadsheetData.message}`
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    res.status(500).json({ 
      error: 'Failed to process request',
      details: error.message 
    });
  }
}
