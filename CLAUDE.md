# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DarkBili is a browser extension that provides dark mode for bilibili.com. Built with Plasmo framework, it uses CSS inversion techniques to transform the site's appearance while preserving media content colors.

## Development Commands

Use pnpm (the only lockfile is `pnpm-lock.yaml`; CI installs with `--frozen-lockfile`).

- `pnpm dev` - Start development server (creates `build/chrome-mv3-dev` directory)
- `pnpm build` - Build production version with zip
- `pnpm build:firefox` - Build Firefox version with zip

## Architecture

### Core Components
- **Content Script (`contents/dark-mode.ts`)** - Main logic for dark mode switching and DOM manipulation
- **Popup (`popup/index.tsx`)** - Extension popup UI built with React and Radix UI
- **CSS (`contents/dark-mode.css`)** - Comprehensive CSS inversion rules for dark mode

### Dark Mode Implementation
The extension uses a CSS filter-based approach:
1. Applies `filter: invert()` to the entire page for dark appearance
2. Re-inverts media elements (images, videos, SVGs) to preserve original colors
3. Handles edge cases like background images and nested elements
4. Skips pages that already have native dark mode

### State Management
- Uses `@plasmohq/storage` for persistent settings
- Supports three modes: dark, light, system (follows OS preference)
- Legacy compatibility with boolean `darkBiliToggle` setting
- Real-time communication between popup and content script via `chrome.runtime.onMessage`

### Special Handling
- **User Profile Backgrounds**: Creates background layers for `.h-inner` elements to handle user space background images
- **Page Exclusions**: Skips certain pages (`/movie/`, `/tv/`, etc.) that already have dark themes
- **Blackboard Pages**: Special styling for blackboard-related pages
- **System Theme**: Listens to `prefers-color-scheme` changes

### File Structure
- `contents/` - Content scripts and styles
- `popup/` - Extension popup interface
- `build/` - Built extension files
- `docs/` - Documentation and landing page
- `images/` - Asset files

The extension targets `https://*.bilibili.com/*` and runs at `document_start` for immediate theme application.