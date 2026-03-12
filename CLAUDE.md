# Flora Wellness — Project Context for Claude

## What This Project Is
Flora Wellness is a women's hormone health brand. This repo contains 8 premium PDF wellness guides sold as a digital product collection.

## GitHub
- **Repo:** `roanpriatel-droid/Portfolio-OS`
- **Token:** stored in user's environment (ask user to provide via env or CLI arg)
- **Branch naming:** must start with `claude/` and end with session ID when pushing

## The 8 Guides (flora-guides/)
| File | Title | Target |
|------|-------|--------|
| flora_01_hormone_reset.pdf | The Hormone Reset Protocol | 40-50 pages |
| flora_02_meal_bible.pdf | The Hormone Meal Bible | 40-50 pages |
| flora_03_hormone_type.pdf | Your Hormone Type Blueprint | 40-50 pages |
| flora_04_symptom_decoder.pdf | The Hormone Symptom Decoder | 40-50 pages |
| flora_05_pms_elimination.pdf | The PMS Elimination Protocol | 40-50 pages |
| flora_06_cortisol_reset.pdf | The Cortisol Reset Protocol | 40-50 pages |
| flora_07_cycle_fitness.pdf | The Cycle Fitness Blueprint | 40-50 pages |
| flora_08_90day_roadmap.pdf | The 90-Day Hormone Transformation Roadmap | 40-50 pages |

## Brand Colors
- Primary rose: `#C8506E`
- Purple accent: `#8B5CF6`
- Teal: `#0D9488`
- Dark text: `#1F2937`
- Rose light bg: `#FDF2F4`

## Build System
- **Language:** Python 3 + ReportLab
- **Build script:** `/home/claude/build_all.py` (master script for all 8 guides)
- **Output dir:** `/home/claude/Portfolio-OS/flora-guides/`
- ReportLab IS installed. pdfminer/pikepdf do NOT work in this environment.
- Page count check: `python3 -c "import re,open; data=open(f,'rb').read(); print(len(re.findall(b'/Type\s*/Page[^s]', data)))"`

## Current Status (as of Mar 11 2026)
- All 8 PDFs exist but are only 10-27 pages (original versions)
- Rebuild in progress — target is 40-50 pages each
- Use `build_all.py` to regenerate all guides
- After building: git commit + push to main branch

## Key Design Notes
- Cover page uses full-bleed `Cover(Flowable)` with `BaseDocTemplate` + two PageTemplates (Cover frame full-page, Body frame with 1.5cm margins)
- `NextPageTemplate('Body')` must be first item in story list
- Tables use alternating ROSE_LIGHT rows, ROSE header
- Callout boxes use TEAL left border on TEAL_LIGHT background
- Week cards use rotating colors: ROSE → PURPLE → TEAL → AMBER

## How to Rebuild All Guides
```bash
cd /home/claude
python3 build_all.py
# Then push:
cd Portfolio-OS
git add flora-guides/
git commit -m "Rebuild expanded guides (40-50 pages each)"
git push -u origin claude/rebuild-<session-id>
```

## Important Notes for Future Sessions
- The GitHub token above gives full repo access
- Files are in `/home/claude/Portfolio-OS/` (NOT `/home/user/`)
- Don't attempt pdfminer or pikepdf — they fail in this environment
- ReportLab page count regex: `re.findall(b'/Type\s*/Page[^s]', data)`
- Previous session (Mar 10) created the original 8 PDFs and committed them
- This session (Mar 11) is rebuilding them at 40-50 pages
