# Airship19 Landing Page

A modern, interactive landing page built with Next.js, featuring advanced UI components and animations.

## Design System

- Typography: Space Grotesk (Display) & Inter (Body)
- Color System: Custom palette with perspective-specific colors
- Animations: GSAP and Framer Motion
- Components: Custom Aceternity UI components

## Progress Tracking

### Completed Components ✅
- BackgroundBeams (Basic implementation)
- SparklesCore (Basic implementation)
- TextGenerateEffect (Basic implementation)
- TracingBeam (Basic implementation)

### In Progress 🚧
- Fix import path issues
- Resolve maximum update depth errors in SparklesCore
- Fix CSS variable warnings in TracingBeam
- Implement proper TypeScript path aliases

### Todo List 📝

#### High Priority
- [ ] Implement NavigationBar component
- [ ] Create HeroContainer with PerspectiveShowcase
- [ ] Add proper font configuration (Space Grotesk & Inter)
- [ ] Set up color system variables
- [ ] Implement responsive design system

#### Interactive Components
- [ ] Create PerspectiveCard with variants (wisp, rabbit, wolf, pilot)
- [ ] Implement TimelineNavigation
- [ ] Add TransformationDemo with PlatonicSolid
- [ ] Create MeteorsBackground effect

#### Content Sections
- [ ] Build FeaturesGrid
- [ ] Implement TestimonialSlider
- [ ] Create TechnologyStack showcase
- [ ] Add InteractiveDemo section

#### Animation Components
- [ ] Set up PageTransition effects
- [ ] Implement ScrollTriggeredAnimation
- [ ] Add ParallaxSection effects
- [ ] Create HoverCard interactions

#### Navigation Elements
- [ ] Add ScrollProgress indicator
- [ ] Implement NavigationDots
- [ ] Create PerspectiveSwitcher
- [ ] Build MobileDrawer component

#### Form Components
- [ ] Create NewsletterSignup
- [ ] Implement ContactForm
- [ ] Add FeedbackForm
- [ ] Build SearchBar

#### Utility Components
- [ ] Add LoadingSpinner
- [ ] Implement ErrorBoundary
- [ ] Create ToastNotification system
- [ ] Set up ModalContainer

#### Performance Optimizations
- [ ] Implement LazyLoadSection
- [ ] Add ImageOptimizer
- [ ] Set up DynamicImport system
- [ ] Create SuspenseWrapper

#### Accessibility
- [ ] Add SkipLink
- [ ] Implement A11yAnnouncer
- [ ] Create FocusTrap
- [ ] Set up KeyboardNavigation

## Current Issues to Resolve
1. Import path resolution (@/ aliases not working correctly)
2. Maximum update depth exceeded in SparklesCore component
3. CSS variable warnings in TracingBeam component
4. Proper TypeScript configuration
5. Component hydration warnings

## Next Steps
1. Fix current technical issues (import paths, component errors)
2. Implement core layout components (Navigation, Hero section)
3. Add interactive components (PerspectiveCard, Timeline)
4. Build content sections
5. Implement animations and transitions
6. Add form components and utilities
7. Optimize performance
8. Ensure accessibility compliance

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
