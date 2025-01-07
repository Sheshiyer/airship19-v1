# Airship19 Design Specifications

## 1. Typography

### Primary Font System
```css
--font-display: 'Space Grotesk', sans-serif;
--font-body: 'Inter', sans-serif;
```

### Font Sizes
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

## 2. Color System

### Primary Palette
```css
--color-primary-50: #f0f9ff;
--color-primary-100: #e0f2fe;
--color-primary-200: #bae6fd;
--color-primary-300: #7dd3fc;
--color-primary-400: #38bdf8;
--color-primary-500: #0ea5e9;
--color-primary-600: #0284c7;
--color-primary-700: #0369a1;
```

### Perspective-Specific Colors
```css
--color-wisp: #8B5CF6;
--color-rabbit: #10B981;
--color-wolf: #6B7280;
--color-pilot: #F59E0B;
```

### Semantic Colors
```css
--color-success: #10B981;
--color-warning: #F59E0B;
--color-error: #EF4444;
--color-info: #3B82F6;
```

## 3. Spacing System
```css
--spacing-px: 1px;
--spacing-0: 0;
--spacing-0.5: 0.125rem;
--spacing-1: 0.25rem;
--spacing-2: 0.5rem;
--spacing-3: 0.75rem;
--spacing-4: 1rem;
--spacing-5: 1.25rem;
--spacing-6: 1.5rem;
```

## 4. Animation Specifications

### Timing Functions
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### Duration
```css
--duration-75: 75ms;
--duration-100: 100ms;
--duration-150: 150ms;
--duration-200: 200ms;
--duration-300: 300ms;
--duration-500: 500ms;
--duration-700: 700ms;
--duration-1000: 1000ms;
```

## 5. Breakpoints
```css
--screen-sm: 640px;
--screen-md: 768px;
--screen-lg: 1024px;
--screen-xl: 1280px;
--screen-2xl: 1536px;
```

## 6. Component-Specific Styles

### Cards
```css
--card-radius: 1rem;
--card-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--card-padding: 1.5rem;
```

### Buttons
```css
--button-radius: 0.5rem;
--button-padding: 0.75rem 1.5rem;
--button-transition: all 0.2s var(--ease-in-out);
```

### Timeline Elements
```css
--timeline-width: 4px;
--timeline-dot-size: 1rem;
--timeline-spacing: 2rem;
```