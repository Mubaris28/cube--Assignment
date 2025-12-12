# GTG Perfumes - HTML Developer Assignment

## Project Overview

This project is a pixel-perfect, fully responsive webpage implementation of the GTG Perfumes design. Built using vanilla HTML, CSS, and JavaScript without any frameworks.

## Features

- **Pixel-Perfect Design**: Exact implementation matching the Figma design
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**:
  - Hamburger menu for tablet and mobile views
  - Functional image gallery with thumbnails, arrows, and dots navigation
  - Dynamic radio button selections affecting "Add to Cart" link
  - Expandable subscription options
  - Count-up animation for percentage statistics
  - Smooth hover effects and transitions
- **Cross-Browser Compatible**: Works seamlessly on Chrome, Firefox, Edge, and Safari
- **Performance Optimized**: Minified CSS, optimized images, and lazy loading

## Project Structure

```
/project-folder
   /assets
      /images         (all images exported from Figma)
   /css
      styles.css      (main stylesheet)
   /js
      script.js       (interactive functionality)
   index.html         (main HTML file)
   README.md          (this file)
```

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript (ES6+)
- No frameworks or libraries

## Color Palette

- **Shop Now Button**: `linear-gradient(180deg, #032E15 0%, #016630 100%)`
- **Award Background**: `linear-gradient(180deg, rgba(3, 46, 21, 0.6) 0%, rgba(1, 102, 48, 0.6) 100%)`
- **Logo Background**: `linear-gradient(180deg, rgba(3, 46, 21, 0.6) 0%, rgba(1, 102, 48, 0.6) 100%)`
- **Hero Heading**: `#032E15`
- **Star Rating**: `#00C950`
- **Most Popular**: `linear-gradient(270deg, #032E15 0%, #008236 51.92%, #00C950 100%)`
- **Add to Cart**: `linear-gradient(180deg, #032E15 0%, #016630 100%)`
- **Percent CTA**: `linear-gradient(180deg, #032E15 0%, #016630 100%)`
- **Footer**: `#032E15`
- **Subscription Badge**: `#653B09`

## Interactive Features

### 1. Responsive Navigation
- Desktop: Full navigation menu
- Tablet/Mobile: Hamburger menu with slide-in navigation

### 2. Product Gallery
- Click arrows (left/right) to navigate images
- Click dots to jump to specific images
- Click thumbnails to view corresponding image
- Smooth transitions between images

### 3. Dynamic Add to Cart
The "Add to Cart" link changes based on:
- **Fragrance Selection**: Original, Lily, Rose
- **Purchase Type**: Single Subscription, Double Subscription
- 9 different cart variations based on user selection

### 4. Expandable Subscriptions
- Single Subscription and Double Subscription expand/collapse based on radio selection
- Smooth animation transitions

### 5. Count-Up Animation
- Percentage statistics (84%, 78%, 89%, 90%) count up from 0
- Triggers when user scrolls to the section
- Smooth easing animation

### 6. Comparison Table
- Semantic HTML table structure
- Fully responsive with horizontal scroll on mobile

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Lazy loading for images
- Optimized image formats
- Minimal CSS and JavaScript
- CSS animations using GPU acceleration
- Debounced scroll events

## Installation & Usage

1. Extract the zip file
2. Open `index.html` in your browser
3. No build process or dependencies required

## Deployment

This project can be easily deployed to:
- GitHub Pages
- Vercel
- Netlify
- Any static hosting service

Simply upload the entire project folder to your hosting provider.

## Responsive Breakpoints

- Desktop: 1024px and above
- Tablet: 768px - 1023px
- Mobile: 320px - 767px

## Credits

Design: GTG Perfumes Figma Design
Development: HTML Developer Assignment

## License

This project is created for assessment purposes.



