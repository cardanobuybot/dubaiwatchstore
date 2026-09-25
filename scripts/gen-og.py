#!/usr/bin/env python3
"""Regenerate public/og.png (1200x630) — The Palm Collection."""
import io
from pathlib import Path

import cairosvg
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
ICON_SVG = ROOT / "app" / "icon.svg"
OUT = ROOT / "public" / "og.png"

W, H = 1200, 630
BG = (11, 11, 13)
FG = (238, 234, 220)
MUTED = (168, 158, 138)
GOLD = (196, 168, 108)

SERIF_R = "/system/fonts/NotoSerif-Regular.ttf"
SERIF_B = "/system/fonts/NotoSerif-Bold.ttf"
SANS = "/system/fonts/Roboto-Regular.ttf"

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

png_bytes = cairosvg.svg2png(url=str(ICON_SVG), output_width=96, output_height=96)
icon = Image.open(io.BytesIO(png_bytes)).convert("RGBA")
img.paste(icon, (72, 72), icon)

d.text((184, 92), "THE PALM COLLECTION", font=ImageFont.truetype(SANS, 26), fill=GOLD)
d.text((184, 128), "Three One-of-One Automatic Watches", font=ImageFont.truetype(SERIF_R, 22), fill=MUTED)

d.text((72, 240), "Dubai, on your wrist.", font=ImageFont.truetype(SERIF_B, 84), fill=FG)

d.text((72, 356), "The Palm, drawn into the dial.", font=ImageFont.truetype(SERIF_R, 34), fill=FG)
d.text((72, 400), "One of each finish. When they're gone, they're gone.",
       font=ImageFont.truetype(SERIF_R, 24), fill=MUTED)

d.text((72, 470), "5,500 AED · Free worldwide tracked shipping",
       font=ImageFont.truetype(SERIF_R, 30), fill=MUTED)

d.line([(72, 538), (172, 538)], fill=GOLD, width=2)
d.text((72, 552), "The Palm  ·  Black    Steel    Gold",
       font=ImageFont.truetype(SANS, 22), fill=FG)

img.save(OUT, "PNG", optimize=True)
print(f"wrote {OUT}  ({OUT.stat().st_size // 1024} KB)")
