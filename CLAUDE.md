# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a complete HTML5/JavaScript/CSS game called "Les 12 Coups de Maths" (The 12 Math Strikes), a multiplayer math quiz game with three distinct rounds:
1. **Coup d'Envoi** (Opening Strike) - Players answer 2-choice questions in turns
2. **Coup par Coup** (Strike by Strike) - Players identify the "intruder" among 7 propositions
3. **Coup Fatal** (Fatal Strike) - Head-to-head timed competition between final 2 players

## File Structure

- `index.html` - Main HTML structure with all game screens and overlays
- `script.js` - Complete game logic with 900+ lines of JavaScript
- `style.css` - All styling with responsive design and animations
- `CLAUDE.md` - This file

## Game Architecture

The game follows a state-based architecture with these key components:

### 1. Game State (G object)
Centralized state management containing:
- Player information (names, status, errors)
- Current screen and round
- Question tracking and usage
- Turn management
- Round-specific data

### 2. Question Banks
Three distinct question arrays in `script.js`:
- `questionsCoupEnvoi` - Simple 2-choice questions
- `questionsCoupParCoup` - 7 propositions with 1 intruder
- `questionsCoupFatal` - Quick response questions

### 3. DOM References (D object)
All DOM elements are cached in the D object for efficient access.

### 4. Game Flow
1. Home screen for player setup
2. Coup d'Envoi round (automatic turns)
3. Coup par Coup round (automatic turns)
4. Coup Fatal round (keyboard-controlled timer battle)
5. Victory screen

## Common Development Tasks

### Modifying Questions
Questions are stored as arrays of objects in `script.js`:
- Add/modify entries in the appropriate question bank arrays
- Follow the exact structure shown in existing questions
- No code changes needed for new questions

### Changing Game Rules
Most rules are configurable through the G object:
- Player elimination thresholds
- Timer durations
- Round progression conditions

### Styling Changes
All visual elements are in `style.css`:
- Game screens and overlays
- Player status indicators (green/orange/red)
- Animations and responsive design
- Button and UI element styling

### Adding New Features
- New question types would require implementing a new game view
- New game mechanics would need integration with the turn system
- UI additions should follow existing CSS patterns

## Development Workflow

This is a client-side only application that runs directly in the browser. No build process is required.

To test changes:
1. Save your modifications
2. Open index.html in a browser
3. Play through the game to verify functionality

## Browser Compatibility

The game uses modern JavaScript features and CSS3 properties. It should work in all modern browsers (Chrome, Firefox, Safari, Edge) but may have issues with older browsers.

## Responsive Design

The game is designed to be responsive with specific breakpoints in the CSS for mobile devices. All elements should be tested on different screen sizes.