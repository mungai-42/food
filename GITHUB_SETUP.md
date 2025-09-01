# 📚 GitHub Repository Setup Guide

This guide will help you set up your GitHub repository and push the Digi-Farm code.

## 🔗 Step 1: Create GitHub Repository

1. **Go to [GitHub](https://github.com) and sign in**
2. **Click the "+" icon in the top right corner**
3. **Select "New repository"**
4. **Repository name**: `digi-farm`
5. **Description**: `A comprehensive digital agriculture platform connecting farmers with agricultural experts and buyers`
6. **Visibility**: Choose Public or Private
7. **Initialize with**: Don't initialize with README (we already have one)
8. **Click "Create repository"**

## 📋 Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

```bash
# Add the remote origin (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/digi-farm.git

# Verify the remote was added
git remote -v

# Push your code to GitHub
git branch -M main
git push -u origin main
```

## 🔄 Step 3: Push Updates

Whenever you make changes to your code:

```bash
# Add all changes
git add .

# Commit changes with a descriptive message
git commit -m "Description of your changes"

# Push to GitHub
git push origin main
```

## 🌿 Step 4: Create Development Branch (Optional)

For better development workflow:

```bash
# Create and switch to a development branch
git checkout -b develop

# Push the development branch
git push -u origin develop

# Switch back to main branch
git checkout main
```

## 📝 Step 5: Update Repository Information

1. **Go to your repository on GitHub**
2. **Click "Settings"**
3. **Update repository description and topics**
4. **Add topics**: `agriculture`, `farming`, `mern-stack`, `react`, `nodejs`, `mongodb`

## 🚀 Step 6: Enable GitHub Pages (Optional)

If you want to host documentation:

1. **Go to repository Settings**
2. **Click "Pages" in the left sidebar**
3. **Source**: Select "Deploy from a branch"
4. **Branch**: Select `main` and `/docs` folder
5. **Click "Save"**

## 🔧 Step 7: Set Up GitHub Actions (Optional)

Create `.github/workflows/deploy.yml` for automated deployment:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        working-directory: ./
```

## 📊 Step 8: Repository Features

### Issues
- **Enable Issues** for bug reports and feature requests
- **Create issue templates** for better organization

### Projects
- **Create a project board** for task management
- **Use GitHub Projects** for agile development

### Wiki
- **Enable Wiki** for detailed documentation
- **Create pages** for different aspects of the project

## 🔒 Step 9: Security Settings

1. **Go to repository Settings**
2. **Click "Security" in the left sidebar**
3. **Enable Dependabot alerts**
4. **Enable Code scanning**
5. **Set up branch protection rules**

## 📈 Step 10: Analytics and Insights

1. **Go to repository Insights**
2. **View traffic statistics**
3. **Monitor contributor activity**
4. **Track repository growth**

## 🎯 Next Steps After GitHub Setup

1. **Connect to Vercel** for deployment
2. **Set up environment variables** in Vercel
3. **Configure custom domains** if needed
4. **Set up monitoring** and analytics
5. **Invite collaborators** if working with a team

## 📞 Support

- **GitHub Help**: [help.github.com](https://help.github.com)
- **GitHub Community**: [github.community](https://github.community)
- **GitHub Status**: [status.github.com](https://status.github.com)

---

**Happy Coding! 🚀**
