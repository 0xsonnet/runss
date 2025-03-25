import { db } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { createPost } from '@/lib/actions'

import { SignIn, Delete, Submit, Like } from './_components/buttons'
import { unstable_cache } from 'next/cache'

const getPosts = unstable_cache(
  () => {
    return db.post.findMany({
      include: {
        user: true,
        like: { select: { user: { select: { id: true } } } },
        _count: { select: { like: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
  },
  ['posts'],
  { revalidate: 3600, tags: ['posts'] }
)

export default async function GuestBook() {
  const [posts, session] = await Promise.all([getPosts(), auth()])

  return (
    <>
      <form
        className="mb-2 flex flex-col gap-2 text-sm lg:flex-row lg:items-start"
        action={createPost}
      >
        <p className="truncate lg:w-36 mt-1">
          <span className="text-[#5de4c7]">~</span>/
          {session?.user?.name?.toLowerCase().replace(/\s/g, '-') ?? ''}
        </p>
        <p className="hidden lg:block">:</p>
        <textarea
          name="desc"
          id="desc"
          rows={4}
          className="flex-1 bg-transparent placeholder-opacity-50 caret-[#5de4c7] placeholder:text-[#898989]/90 focus:border-transparent focus:outline-none focus:ring-0 border border-[#444] rounded-md p-2 text-sm resize-y"
          placeholder={session ? '' : 'Sign in to write a message'}
          required
          minLength={3}
          maxLength={10000}
          autoComplete="off"
          disabled={!session}
        />
        {session ? <Submit /> : <SignIn />}
      </form>

      <ul className="flex flex-col gap-y-2 divide-y divide-[#898989]/20 text-sm lg:divide-y-0">
        {posts.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-1 py-1 lg:flex-row lg:gap-2 lg:border-y-0 lg:py-0 group"
          >
            <p className="flex-1 truncate lg:w-36 lg:flex-none">
              <span className="text-[#5de4c7]">~</span>/
              {item.user.name.toLowerCase().replace(/\s/g, '-')}
            </p>
            <p className="block lg:hidden">{item.desc}</p>
            <p className="hidden lg:block">:</p>
            <p className="hidden flex-1 whitespace-pre-wrap lg:block">{item.desc}</p>
            {session && (
              <div className="flex items-start mt-1 gap-x-1">
                <Like
                  postID={item.id}
                  userID={session.user.id}
                  likeCount={item._count.like}
                  likedBy={item.like.map((like) => like.user.id)}
                />
                {item.user.id === session.user.id && (
                  <Delete postID={item.id} userID={session.user.id} />
                )}
              </div>
            )}
            <p className="hidden lg:block text-xs text-[#888]">
              {new Date(item.createdAt)
                .toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })
                .replace(',', '')
                .replace(/\//g, '-')}
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}
