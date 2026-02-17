# GitHub Setup Guide

## ✅ What's Already Done

- [x] Git initialized
- [x] `.gitignore` created
- [x] Initial commit made (14 files, 3,883 lines)
- [x] Branch renamed to `main`

---

## 🚀 Create GitHub Repository

### Step 1: Create Repo on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Fill in the details:

```
Repository name:     operational-data-graphics
Description:         A modern visualization system for data infrastructure teams
Visibility:          ☑ Public (for portfolio visibility)
Initialize:          ☐ Do NOT add README, .gitignore, or license (we already have them)
```

3. Click **"Create repository"**

---

### Step 2: Connect Your Local Repo

GitHub will show you instructions. Use these commands:

```bash
# Navigate to your project (if not already there)
cd "/Users/christina/Dropbox/Mac/Documents/Web Projects/cursor projects/Data Graphics"

# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/operational-data-graphics.git

# Push your code
git push -u origin main
```

**Replace `YOUR_USERNAME`** with your GitHub username.

---

### Step 3: Verify It Worked

After pushing, refresh your GitHub repo page. You should see:
- 14 files
- Your commit message
- README.md displaying as the landing page

---

## 🎯 Repository Settings (Recommended)

Once created, configure these settings on GitHub:

### General Settings
- **Description**: Add "Data Graphics Design System | Portfolio Project"
- **Website**: (Add your portfolio URL when ready)
- **Topics**: Add tags like:
  - `data-visualization`
  - `vega`
  - `design-system`
  - `portfolio`
  - `data-graphics`
  - `operational-metrics`

### About Section
Edit to include:
```
🎨 A modern visualization system for operational data contexts
📊 Built with full Vega | Grammar of Graphics approach
🔧 Designed for data infrastructure teams
```

### Pages (Optional)
Enable GitHub Pages to host your demo:
1. Go to Settings → Pages
2. Source: Deploy from branch `main`
3. Folder: `/` (root)
4. Save

Your demo will be live at:
```
https://YOUR_USERNAME.github.io/operational-data-graphics/
```

Access the demo page at:
```
https://YOUR_USERNAME.github.io/operational-data-graphics/vega-implementations/
```

---

## 📝 Good Commit Message Practices

For future commits, follow this format:

```bash
# Feature commits
git commit -m "feat: Add multi-series comparison line chart implementation"

# Documentation updates
git commit -m "docs: Update color system with light mode palette"

# Design additions
git commit -m "design: Add Figma visual foundations file"

# Fixes
git commit -m "fix: Correct axis label alignment in time-series chart"

# Refactoring
git commit -m "refactor: Extract tooltip logic into config template"
```

**Prefixes:**
- `feat:` New feature
- `docs:` Documentation
- `design:` Design files
- `fix:` Bug fix
- `refactor:` Code improvement
- `style:` Formatting
- `chore:` Maintenance

---

## 🔄 Regular Git Workflow

### Daily Work
```bash
# Check status
git status

# Stage specific files
git add path/to/file.html

# Or stage all changes
git add -A

# Commit with message
git commit -m "feat: Add histogram chart implementation"

# Push to GitHub
git push
```

### Before Starting New Work
```bash
# Make sure you're on main
git branch

# Pull latest changes (if working from multiple machines)
git pull
```

---

## 🌿 Branch Strategy (Optional)

For this portfolio project, working directly on `main` is fine. But if you want to experiment:

```bash
# Create feature branch
git checkout -b feature/multi-series-chart

# Work on your changes...
# Commit as usual

# When done, merge back to main
git checkout main
git merge feature/multi-series-chart

# Push
git push
```

---

## 📊 Project Milestones (as GitHub Issues)

Consider creating GitHub Issues for tracking:

**Week 1**
- [ ] Create Figma visual foundations
- [ ] Document spacing system
- [ ] Finalize axis/grid standards

**Week 2**
- [ ] Mockup Chart #2: Multi-series line
- [ ] Mockup Chart #3: Stacked area
- [ ] Mockup Chart #4: Histogram
- [ ] Mockup Chart #5: Bar comparison
- [ ] Mockup Chart #6: Status timeline
- [ ] Write usage guidelines

**Week 3**
- [ ] Implement Chart #2
- [ ] Implement Chart #3 or #4
- [ ] Implement Chart #5 or #6
- [ ] Add tooltips to all charts

**Week 4**
- [ ] Write case study
- [ ] Polish demo page
- [ ] Take screenshots
- [ ] Publish portfolio

---

## 🔒 SSH Setup (Optional but Recommended)

If you want to avoid entering your password every push:

### Generate SSH Key
```bash
# Generate key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Start SSH agent
eval "$(ssh-agent -s)"

# Add key to agent
ssh-add ~/.ssh/id_ed25519

# Copy public key
pbcopy < ~/.ssh/id_ed25519.pub
```

### Add to GitHub
1. Go to GitHub Settings → SSH and GPG keys
2. Click "New SSH key"
3. Paste your key (already in clipboard)
4. Save

### Update Remote URL
```bash
# Change remote from HTTPS to SSH
git remote set-url origin git@github.com:YOUR_USERNAME/operational-data-graphics.git
```

Now you can push without passwords!

---

## 🎯 README Badges (Optional Polish)

Add these to the top of your README.md for visual flair:

```markdown
![Status](https://img.shields.io/badge/status-in%20development-yellow)
![Vega](https://img.shields.io/badge/Vega-v5-blue)
![License](https://img.shields.io/badge/license-MIT-green)
```

---

## 📱 Share Your Repo

Once pushed, your repo URL will be:
```
https://github.com/YOUR_USERNAME/operational-data-graphics
```

Perfect for:
- Portfolio
- LinkedIn projects section
- Resume
- Job applications
- Twitter/social media

---

## ✨ Next Steps

1. Create the GitHub repo (Step 1 above)
2. Run the commands to connect and push (Step 2)
3. Configure repo settings (topics, description)
4. Continue building (Week 1 tasks)

Your work is now backed up and version controlled! 🎉
