# Frontend Implementation Todo

## 1. Authentication Components
- [x] Basic auth setup with Supabase client
- [x] Sign in page
- [x] Sign up page
- [x] Protected routes

## 2. User Dashboard Components
- [ ] Witness Token Display
  ```typescript
  // Use get_user_tokens function
  const { data: tokenBalance } = await supabase.rpc('get_user_tokens', {
    user_id: user.id
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

## 3. Admin Dashboard Components
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

## 4. Navigation Implementation
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

## 5. Data Management
- [ ] Implement optimistic updates for better UX
- [ ] Add error handling and loading states
- [ ] Set up real-time subscriptions for activity feed

## 6. Testing
- [ ] Test role-based access control
- [ ] Verify database policies
- [ ] Test real-time updates
