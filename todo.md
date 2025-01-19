# Todo List 📝

## Phase 1: Core Platform Development

### Authentication & User Management
- [ ] Set up Supabase Database Schema
  - [ ] Create auth.user_role ENUM type ('admin', 'moderator', 'user')
  - [ ] Create auth.user_roles table for role management
  - [ ] Create public.user_profiles table for user info
  - [ ] Set up RLS policies for both tables

- [ ] Configure Database Triggers and Functions
  - [ ] Create handle_new_user() function for auto role/profile creation
  - [ ] Set up on_auth_user_created trigger for new signups
  - [ ] Create update_updated_at_column() function
  - [ ] Add triggers for updated_at timestamps

- [ ] Frontend Integration
  - [ ] Update useRBAC hook to fetch roles from user_roles table
  - [ ] Modify AuthContext to handle role-based signups
  - [ ] Update protected routes to use role checks
  - [ ] Add role-based UI elements in dashboard

- [ ] Testing and Documentation
  - [ ] Create admin user setup script
  - [ ] Test role-based access flows
  - [ ] Verify RLS policies
  - [ ] Document auth setup and role management
  - [ ] Add error handling for role-related operations

- [ ] Integrate NFTify wallet connection
- [ ] Add session management

### Blog Platform
- [ ] Set up Supabase blog tables
- [ ] Create custom blog admin interface
- [ ] Implement blog listing page
- [ ] Add blog post detail view
- [ ] Set up content scheduling system

### NFT Infrastructure
- [ ] Set up NFTify marketplace (airship19.nftify.network)
- [ ] Configure NFT collections
- [ ] Set up NFT metadata structure
- [ ] Implement marketplace redirect system
- [ ] Create NFT preview components
- [ ] Implement dynamic URI updates for evolution
- [ ] Set up soulbound achievement tokens
- [ ] Create smart contracts for:
  - [ ] Base Perspective NFTs
  - [ ] Shard Collection
  - [ ] Evolution Management

### Elemental Witness & Spiritual DNA System
- [ ] Create Enhanced Witness System
  - [ ] Implement lunar cycle tracking for Moon Witnesses
  - [ ] Add eclipse detection for Eclipse Witnesses
  - [ ] Create seasonal variation system
  - [ ] Implement Ancestral Memory mechanics
  - [ ] Add personal power amplification

- [ ] Develop Spiritual DNA Components
  - [ ] Biorhythm calculation engine
    - [ ] Physical cycle (23-day) tracking
    - [ ] Emotional cycle (28-day) tracking
    - [ ] Intellectual cycle (33-day) tracking
  - [ ] Zodiacal integration
    - [ ] Sign-specific trait amplification
    - [ ] Element affinity system
    - [ ] Season power cycles
  - [ ] Human Design & Gene Keys
    - [ ] Gate activation tracking
    - [ ] Shadow-to-siddhi progression
    - [ ] Transit power amplification
  - [ ] Divination Systems
    - [ ] Tarot integration for power-ups
    - [ ] I Ching consultation system
    - [ ] Special event windows
  - [ ] Lunar Node System
    - [ ] Node affinity calculation
    - [ ] Evolution path guidance
    - [ ] Transit ability triggers

### NFT Display
- [ ] Implement collection preview
- [ ] Create NFT card components
- [ ] Add direct purchase links
- [ ] Set up owner verification
- [ ] Display collection statistics

## Phase 2: Member Features

### Dashboard Development
- [ ] Create member dashboard UI
- [ ] Implement perspective collection view
- [ ] Add achievement tracking
- [ ] Create witness balance display
- [ ] Implement shard collection system

### Living Shard System
- [ ] Dynamic Trait Evolution
  - [ ] Usage pattern tracking
  - [ ] Trait specialization system
  - [ ] History recording
  - [ ] Power level calculation

- [ ] DNA Splicing Mechanics
  - [ ] Cross-species trait combination
  - [ ] Hybrid ability generation
  - [ ] Compatibility checking
  - [ ] Evolution tracking

- [ ] Environmental Imprint
  - [ ] Usage environment detection
  - [ ] Trait adaptation system
  - [ ] Special ability unlocks
  - [ ] Environment-specific bonuses

- [ ] Perspective Resonance
  - [ ] User interaction tracking
  - [ ] Synergy calculation
  - [ ] Temporary boost system
  - [ ] Group ability unlocks

### Marketplace & Community Features
- [ ] Create NFT marketplace UI
  - [ ] Perspective NFT listings
  - [ ] Shard trading interface
  - [ ] Witness token display
  - [ ] Evolution marketplace

- [ ] Community Systems
  - [ ] Group challenges interface
  - [ ] Team competition system
  - [ ] Governance portal
  - [ ] Event creation tools

- [ ] Transaction Systems
  - [ ] NFT trading
  - [ ] Shard exchange
  - [ ] Witness token staking
  - [ ] Reward distribution
  - [ ] Transaction history

## Original UI Components
- [x] Create PerspectiveCard with variants
- [x] Create MeteorsBackground effect
- [x] Set up PageTransition effects
- [x] Create HoverCard interactions
- [x] Add ScrollProgress indicator
- [x] Build MobileDrawer component
- [x] Implement NavigationBar
- [ ] Create HeroContainer
- [ ] Add proper font configuration
- [ ] Set up color system

## Current Technical Debt
1. Import path resolution (@/ aliases not working correctly)
2. Maximum update depth exceeded in SparklesCore component
3. CSS variable warnings in TracingBeam component
4. Proper TypeScript configuration
5. Component hydration warnings

## Next Development Sprint
1. Fix current technical issues
2. Implement authentication system
3. Set up NFT infrastructure
4. Create member dashboard
5. Implement marketplace features
