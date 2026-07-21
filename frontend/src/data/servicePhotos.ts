// Photos per service, matched by the item "id" from src/messages/*.json → prices.categories.
// Drop image files under public/images/prices/<id>/ and list their paths here to show thumbnails.

export const servicePhotos: Record<string, string[]> = {
  "manicure-classic": ["/images/prices/1.webp"],
  "manicure-hybrid": ["/images/prices/2.webp", "/images/prices/3.webp", "/images/prices/4.webp", "/images/prices/5.webp"],
  "manicure-removal": [],
  "manicure-fill": ["/images/prices/6.webp", "/images/prices/7.webp", "/images/prices/8.webp"],
  "manicure-extension-s": ["/images/prices/9.webp", "/images/prices/10.webp"],
  "manicure-extension-m": ["/images/prices/11.webp", "/images/prices/12.webp", "/images/prices/13.webp", "/images/prices/14.webp"],
  "pedicure-classic": ["/images/prices/15.webp"],
  "pedicure-hybrid": ["/images/prices/16.webp", "/images/prices/17.webp", "/images/prices/18.webp", "/images/prices/19.webp"],
  "pedicure-toes": ["/images/prices/20.webp", "/images/prices/21.webp"],
  "set-gel-pedicure": ["/images/prices/22.webp", "/images/prices/23.webp", "/images/prices/24.webp"],
  "set-hybrid-pedicure": ["/images/prices/25.webp", "/images/prices/26.webp"],
  "set-removal-manicure": ["/images/prices/27.webp"],
  "set-classic-hands-feet": ["/images/prices/28.webp"],
};
