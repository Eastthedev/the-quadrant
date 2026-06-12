# The Quadrant

Copytrade signal amplification system. Takes a trade signal (entry, SL, TP) and splits the SL zone into 4 equal quadrants — each a separate staggered entry targeting the same TP.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## How it works

Given Entry, SL, and TP:
- Zone size = (Entry − SL) ÷ 4
- Q1: Entry at signal entry, SL at entry − zone
- Q2: Entry at Q1's SL, SL at Q2 entry − zone
- Q3: Entry at Q2's SL, SL at Q3 entry − zone
- Q4: Entry at Q3's SL, SL at original SL
- All quadrants share the same TP

Works for both Long and Short setups.
