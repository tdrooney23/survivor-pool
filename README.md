# March Madness Survivor Pool 2025

Live survivor pool tracker with ESPN live scores integration.

## Deploy to Railway (Step-by-Step)

### 1. Push to GitHub
```bash
cd survivor-pool
git init
git add .
git commit -m "Initial commit"
# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/survivor-pool.git
git push -u origin main
```

### 2. Deploy on Railway
1. Go to [railway.app](https://railway.app) and open your project
2. Click **+ New Service** → **GitHub Repo**
3. Select your `survivor-pool` repo
4. Railway auto-detects Node.js and runs `npm start`
5. Click **Generate Domain** under Settings → Networking
6. Share that URL with your pool participants!

## Updating Picks
When the real CSV comes in, update the `rawPicks` array in `public/index.html`:
```js
const rawPicks = [
  ['Name', 'Team1', 'Team2'],
  ...
];
```
Then commit and push — Railway auto-redeploys.

## Live Scores
The app polls ESPN's API every 60 seconds automatically.
Games that finish will auto-update participant circles:
- 🟢 Green = team won, still alive
- 🔴 Red + ✕ = team lost, eliminated

## Manual Results Override
If ESPN isn't picking up a result, you can manually set results in `public/index.html`:
```js
const results = {
  'Duke': 'won',
  'TCU': 'lost',
};
```
