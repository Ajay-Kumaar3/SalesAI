const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

if (!process.env.GEMINI_API_KEY) {
  console.warn("WARNING: GEMINI_API_KEY is not defined. AI insights will fail.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy_key");

async function generateBusinessInsights(logs) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in environment variables.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  const compactLogs = logs.map(l => ({
    op: l.action_type,
    table: l.table_name,
    old: l.old_value,
    new: l.new_value
  }));

  const prompt = `Analyze these business audit logs: ${JSON.stringify(compactLogs)}. 
    
    Provide a professional executive summary with the following sections:
    1. ACTIVITY OVERVIEW: Summarize recent database changes.
    2. KEY TRENDS: Identify patterns in sales or customer behavior.
    3. POTENTIAL ANOMALIES: Highlight any unusual or large data modifications.
    4. STRATEGIC TIPS: Provide 2-3 brief business recommendations.

    IMPORTANT: Do NOT use markdown formatting (no asterisks, no bolding, no headers). 
    Use a clean, plain-text structure suitable for a professional dashboard.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = { generateBusinessInsights };
