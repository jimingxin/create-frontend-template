#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const { targetName, gitUrl, branch } = parseArgs(process.argv.slice(2))
const targetDir = path.resolve(process.cwd(), targetName)
const templateDir = path.resolve(__dirname, '..', 'template')

if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
  console.error(`Target directory is not empty: ${targetDir}`)
  process.exit(1)
}

if (gitUrl) {
  cloneTemplateFromGit(gitUrl, branch, targetDir)
} else {
  fs.mkdirSync(targetDir, { recursive: true })
  copyDir(templateDir, targetDir)
}
rewritePackageName(path.join(targetDir, 'package.json'), targetName)

console.log(`Project created at ${targetDir}`)
console.log('Next steps:')
console.log(`  cd ${targetName}`)
console.log('  npm install')
console.log('  npm run dev')

function copyDir(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true })
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function rewritePackageName(pkgPath, projectName) {
  if (!fs.existsSync(pkgPath)) return
  const content = fs.readFileSync(pkgPath, 'utf8')
  const pkg = JSON.parse(content)
  pkg.name = normalizePackageName(projectName)
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8')
}

function normalizePackageName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/^-+|-+$/g, '') || 'frontend-template-app'
}

function parseArgs(argv) {
  let target = null
  let git = null
  let branchName = null

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]

    if (arg === '--git') {
      const value = argv[i + 1]
      if (!value || value.startsWith('--')) {
        fail('Missing value for --git')
      }
      git = value
      i += 1
      continue
    }

    if (arg === '--branch') {
      const value = argv[i + 1]
      if (!value || value.startsWith('--')) {
        fail('Missing value for --branch')
      }
      branchName = value
      i += 1
      continue
    }

    if (arg.startsWith('--')) {
      fail(`Unknown option: ${arg}`)
    }

    if (target) {
      fail(`Unexpected argument: ${arg}`)
    }
    target = arg
  }

  if (branchName && !git) {
    fail('--branch can only be used with --git')
  }

  return {
    targetName: target || 'frontend-template-app',
    gitUrl: git,
    branch: branchName,
  }
}

function cloneTemplateFromGit(gitUrl, branchName, destination) {
  const args = ['clone', '--depth', '1']
  if (branchName) {
    args.push('--branch', branchName)
  }
  args.push(gitUrl, destination)

  const result = spawnSync('git', args, { stdio: 'inherit' })
  if (result.status !== 0) {
    fail(`Git clone failed for ${gitUrl}`)
  }

  const gitDir = path.join(destination, '.git')
  if (fs.existsSync(gitDir)) {
    fs.rmSync(gitDir, { recursive: true, force: true })
  }
}

function fail(message) {
  console.error(message)
  console.error('Usage: create-frontend-template [project-name] [--git <url>] [--branch <name>]')
  process.exit(1)
}
