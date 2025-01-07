# Airship19 Home Page Component List

## 1. Layout Components

### Header
```jsx
<NavigationBar />
<FloatingNav />
<MobileMenu />
```

### Hero Section
```jsx
<HeroContainer>
  <PerspectiveShowcase />
  <ValueProposition />
  <CallToAction />
</HeroContainer>
```

### Main Content Sections
```jsx
<TimelineSection />
<FeaturesGrid />
<InteractiveDemo />
<TestimonialSlider />
<TechnologyStack />
```

## 2. Interactive Components

### Perspective Viewer
```jsx
<PerspectiveCard
  variants={['wisp', 'rabbit', 'wolf', 'pilot']}
  currentView={currentPerspective}
  onSwitch={handlePerspectiveChange}
/>
```

### Timeline Navigation
```jsx
<TimelineNavigation>
  <ChronologicalView />
  <GeographicalView />
  <TemporalView />
  <TimelineControls />
</TimelineNavigation>
```

### Media Transformation Preview
```jsx
<TransformationDemo>
  <PlatonicSolid />
  <PhysicsSimulation />
  <InteractionGuide />
</TransformationDemo>
```

## 3. UI Components

### Interactive Elements
```jsx
<BackgroundBeam />
<SparklesEffect />
<TextGenerateEffect />
<MeteorsBackground />
```

### Navigation Elements
```jsx
<ScrollProgress />
<NavigationDots />
<PerspectiveSwitcher />
<MobileDrawer />
```

### Content Components
```jsx
<FeatureCard />
<TestimonialCard />
<StatisticCard />
<TechnologyCard />
```

## 4. Animation Components

### Transition Effects
```jsx
<PageTransition />
<SectionTransition />
<ContentFade />
<SlideEffect />
```

### Interactive Animations
```jsx
<HoverCard />
<FloatingElement />
<ParallaxSection />
<ScrollTriggeredAnimation />
```

## 5. Form Components
```jsx
<NewsletterSignup />
<ContactForm />
<FeedbackForm />
<SearchBar />
```

## 6. Utility Components
```jsx
<LoadingSpinner />
<ErrorBoundary />
<ToastNotification />
<ModalContainer />
```

## 7. Performance Optimizations
```jsx
<LazyLoadSection />
<ImageOptimizer />
<DynamicImport />
<SuspenseWrapper />
```

## 8. Accessibility Components
```jsx
<SkipLink />
<A11yAnnouncer />
<FocusTrap />
<KeyboardNavigation />
```