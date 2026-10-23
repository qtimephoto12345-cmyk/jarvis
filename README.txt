JARVIS by EME — Node.js deployment (no Python)

LOCAL TEST
1. Install Node.js 18 or newer.
2. Open Command Prompt in this folder.
3. Run: npm install
4. Run: npm start
5. Open http://localhost:3000

RENDER DEPLOY
1. Upload this project folder to a new GitHub repository (do not put API keys in the repository).
2. In Render, choose New + > Web Service and connect the repository.
3. Runtime: Node. Build Command: npm install. Start Command: npm start.
4. Deploy. Render will give the service its own URL.
5. If the CHS AI endpoint differs, add an environment variable CHS_AI_URL with the full working endpoint, e.g. https://chs-spencer-computing.onrender.com/api/ai.

IMPORTANT
This starter forwards messages to the existing CHS /api/ai endpoint. It does not contain an AI API key. Confirm that the deployed CHS endpoint accepts POST JSON {"query":"...","message":"..."} and returns an {"answer":"..."} field. If not, the proxy will show a connection/format error and server.js must be adjusted to match CHS's real API contract.

HQ BUTTON
Once deployed, change the HQ JARVIS button link to your actual Render URL, e.g.:
<a class="shortcut" href="https://YOUR-JARVIS-SERVICE.onrender.com" target="_blank" rel="noopener noreferrer">🤖 JARVIS by EME</a>
Replace the example URL with the actual URL Render assigns.
