import EditPostForm from './edit-post-form'

// Remove the dynamic route parameter validation for now
export default function Page({ params }: any) {
  return <EditPostForm postId={params.id} />
}
