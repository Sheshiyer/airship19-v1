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

### Daily Raffle System
- [ ] Create raffle mechanism
- [ ] Implement shard distribution
- [ ] Add participation tracking
- [ ] Create winner selection system
- [ ] Implement reward distribution

### Marketplace Features
- [ ] Create NFT marketplace UI
- [ ] Implement buying/selling functionality
- [ ] Add witness token system
- [ ] Create shard exchange mechanism
- [ ] Implement transaction history

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
