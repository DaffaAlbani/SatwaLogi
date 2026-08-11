# DESIGN.md — Botanical Intellect Design System

## Design Philosophy
**Botanical Intellect** memadukan estetika alam tropis Indonesia (hutan hujan, flora nusantara, megafauna) dengan presisi jurnal ilmiah modern (frosted glassmorphism, tipografi dual-face, motion interaktif, dan kedalaman 3D).

## Color Palette Tokens
| Token | Color Code | Purpose |
|---|---|---|
| `--color-primary` | `#062e23` | Deep forest dark green (Primary branding, headers) |
| `--color-sage` | `#2d5a4c` | Sage green (Accents, labels, active states) |
| `--color-ochre` | `#d4a373` | Warm ochre gold (Highlights, badges, CTAs) |
| `--color-surface` | `#f9faf6` | Warm off-white background |
| `--color-card-flora` | `#f2f8f4` | Card background untuk taksa Plantae |
| `--color-card-fauna` | `#fdfbf7` | Card background untuk taksa Animalia |

## Typography Scale
- **Display / Headings**: `Source Serif 4` (Serif elegan bernuansa jurnal ilmiah)
- **Body & Controls**: `Plus Jakarta Sans` / `Inter` (Sans-serif modern dengan legibilitas tinggi)
- **Scientific Names**: `Source Serif 4` (Italic, weight 600)

## Component Library Standards
1. **Glassmorphic Panels (`.glass-card`)**: `background: rgba(249, 250, 246, 0.72); backdrop-filter: blur(20px); border: 1px solid rgba(6, 46, 35, 0.08);`
2. **Specimen Cards (`.specimen-card`)**: 3D transform hover effect (`perspective(1000px) translateY(-6px) scale(1.01)`).
3. **IUCN Status Badges (`.iucn-badge`)**: Badge berwarna kontras tinggi (CR = Red gradient, EN = Orange gradient, VU = Yellow gradient, NT = Lime gradient, LC = Green gradient) dengan pulse glow ring.
4. **Hero Gradient Mesh (`.hero-gradient`)**: Radial gradient animasi lembut memadukan hijau hutan dan warm ochre gold.
