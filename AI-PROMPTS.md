# SACHI — AI image prompts

Generate these and drop the files into `public/images/generated/` using the exact
filenames given. The site's palette is porcelain off-white `#F5F4F0`, warm ink
`#12100C`, ultramarine `#2430D6`, with a soft film-grain texture over everything.
Every image should feel magical/atmospheric, never like a stock photo.

Common style suffix — append to every prompt:

> soft porcelain off-white background, warm paper texture, ultramarine blue accents,
> analog film grain, subtle chromatic noise, dreamy studio light, editorial art
> direction, shallow depth of field, shot on medium format film, no text, no logos

---

## 1. `hero-silk.jpg` (optional hero fallback, 2400×1600)
Abstract macro of flowing silk fabric caught mid-air, porcelain white silk with a
single fold catching deep ultramarine light, sculptural, weightless, magical
atmosphere + style suffix

## 2. `about-vizag.jpg` (About page atmosphere, 2000×1400)
Dawn over the Visakhapatnam coastline seen through soft haze, fishing boats as
tiny silhouettes, sky washed in porcelain and pale ultramarine, painterly,
quiet and cinematic + style suffix

## 3. `texture-paper-01.jpg` (background texture, 2000×2000, tileable)
Handmade cotton paper texture, subtle fibers, porcelain off-white, faint warm
shadows, extremely subtle, seamless tile + style suffix

## 4. `girish-still.jpg` (Girish page atmosphere, 1600×2000)
A single vintage brass desk lamp glowing over an open notebook with sketched
brand diagrams, floating dust motes in the light beam, deep shadows, intimate
and studious, magical realism + style suffix

## 5. `sahith-still.jpg` (Sahith page atmosphere, 1600×2000)
An open leather travel journal with a boarding pass and small compass, resting
on a map of the Egyptian coast, warm afternoon light, wanderlust, magical
realism + style suffix

## 6. `og-image.jpg` (social share card, 1200×630)
The word-free composition: porcelain silk field with one deep ultramarine fold
crossing the frame diagonally, film grain, cinematic light — leave the left
third calm for a logo overlay + style suffix

---

### Founder portraits (when the real photos arrive)
Place them as:
- `public/images/girish.jpg` — 3:4 portrait, min 1200×1600
- `public/images/sahith.jpg` — 3:4 portrait, min 1200×1600

Then tell Claude "wire in the founder portraits" — the placeholder frames in
`components/home/Founders.tsx` and `components/ProfileLayout.tsx` are ready for them.
