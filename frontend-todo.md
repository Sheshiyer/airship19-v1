# Frontend Implementation Todo

## 1. Authentication Components
- [x] Basic auth setup with Supabase client
- [x] Sign in page
- [x] Sign up page
- [x] Protected routes

## 2. User Dashboard Components
- [ ] Spiritual DNA Components
  ```typescript
  // Biorhythm Calculation
  const { data: biorhythms } = await supabase.rpc('calculate_biorhythms', {
    user_id: user.id,
    birth_date: userProfile.birth_date
  })

  // Zodiacal Powers
  const { data: zodiacPowers } = await supabase.rpc('get_zodiac_powers', {
    user_id: user.id,
    current_transits: getCurrentTransits()
  })

  // Human Design & Gene Keys
  const { data: designProfile } = await supabase.rpc('get_human_design_profile', {
    user_id: user.id,
    birth_data: userProfile.birth_data
  })

  // Divination Systems
  const { data: divinationPowers } = await supabase.rpc('get_divination_powers', {
    user_id: user.id,
    celestial_events: getCurrentCelestialEvents()
  })
  ```

- [ ] Living Shard Interface
  ```typescript
  // Dynamic Trait Evolution
  const { data: evolvingTraits } = await supabase.rpc('get_evolving_traits', {
    user_id: user.id,
    usage_patterns: getUsagePatterns()
  })

  // DNA Splicing
  const { data: spliceOptions } = await supabase.rpc('get_splice_combinations', {
    perspective_id: currentPerspective.id,
    available_traits: userTraits
  })

  // Environmental Imprint
  const { data: environmentalBonus } = await supabase.rpc('calculate_environment_bonus', {
    user_id: user.id,
    current_environment: getCurrentEnvironment()
  })

  // Perspective Resonance
  const { data: activeResonance } = await supabase.rpc('get_active_resonance', {
    user_id: user.id,
    nearby_perspectives: getNearbyPerspectives()
  })
  ```

- [ ] Animal Perspectives Grid
  ```typescript
  // Use get_user_perspectives function
  const { data: unlockedPerspectives } = await supabase.rpc('get_user_perspectives', {
    user_id: user.id
  })
  ```

- [ ] Raffle System
  ```typescript
  // Get active raffles
  const { data: activeRaffles } = await supabase
    .from('raffles')
    .select('*')
    .eq('status', 'active')

  // Get user's entries
  const { data: userEntries } = await supabase.rpc('get_user_raffle_entries', {
    user_id: user.id
  })
  ```

## 3. Elemental Witness Components
- [ ] Celestial Witness Interface
  ```typescript
  // Check Elemental Witness Status
  const { data: elementalWitness } = await supabase.rpc('get_elemental_witness', {
    user_id: user.id,
    celestial_events: getCurrentCelestialEvents()
  })
  
  // Ancestral Memory Interface
  const { data: ancestralMemories } = await supabase
    .from('ancestral_memories')
    .select('*')
    .eq('activation_status', 'available')
    .filter('power_level', 'gte', userPowerLevel)

  // Power Amplification
  const { data: amplifiedPowers } = await supabase.rpc('calculate_power_amplification', {
    user_id: user.id,
    biorhythm: currentBiorhythm,
    zodiac: currentZodiac,
    nodes: currentNodes
  })
  ```

- [ ] Governance Interface
  ```typescript
  // Proposal Creation
  const { data: proposal } = await supabase.rpc('create_governance_proposal', {
    title,
    description,
    voting_period,
    witness_level_requirement
  })

  // Voting Interface
  const { data: voteWeight } = await supabase.rpc('calculate_vote_weight', {
    user_id: user.id,
    proposal_id
  })
  ```

## 4. Admin Dashboard Components
- [ ] Content Management
  ```typescript
  // Fetch all posts with author info
  const { data: posts } = await supabase
    .from('posts')
    .select(`
      *,
      user_profiles (
        username,
        full_name
      )
    `)
  ```

- [ ] Activity Monitoring
  ```typescript
  // Fetch activity logs (admin only)
  const { data: activityLogs } = await supabase
    .from('activity_logs')
    .select('*')
    .order('created_at', { ascending: false })
  ```

- [ ] User Management
  ```typescript
  // Fetch all users with roles
  const { data: users } = await supabase
    .from('user_profiles')
    .select(`
      *,
      auth.user_roles (role)
    `)
  ```

## 5. Navigation Implementation
- [ ] Update nav-items.tsx to include:
  - User Dashboard route (/dashboard/user)
  - Admin Dashboard route (/dashboard/admin)
  - Profile route (/profile)

- [ ] Role-based navigation using useRBAC hook
  ```typescript
  const { hasPermission } = useRBAC()
  
  // Show admin routes only if user has admin role
  {hasPermission('manage:users') && (
    <Link href="/dashboard/admin">Admin Dashboard</Link>
  )}
  ```

## 6. Data Management
- [ ] Implement optimistic updates for better UX
- [ ] Add error handling and loading states
- [ ] Set up real-time subscriptions for activity feed

## 7. Testing
- [ ] Test role-based access control
- [ ] Verify database policies
- [ ] Test real-time updates
