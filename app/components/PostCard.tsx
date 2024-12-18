import { Card } from '@/components/ui/card'
import { MessageCircle, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CopyLink from './CopyLink'
import { handleVote } from '../actions'
import { DownVote, UpVote } from './Buttons'
import getTimeAgo from '@/utils/getTimeAgo'

interface PostCardProps {
  title: string
  jsonContent: string | null
  id: string
  subName: string | null
  userName: string
  imageString: string | null
  voteCount: number
  createdAt: Date
}

function PostCard({ title, jsonContent, id, subName, userName, imageString, voteCount, createdAt }: PostCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex">
        <div className="flex flex-col items-center gap-y-2 bg-muted p-4">
          <form action={handleVote}>
            <input type="hidden" name="voteDirection" value="UP" />
            <input type="hidden" name="postId" value={id} />
            <UpVote />
          </form>

          <span className="font-semibold text-sm">{voteCount}</span>

          <form action={handleVote}>
            <input type="hidden" name="voteDirection" value="DOWN" />
            <input type="hidden" name="postId" value={id} />
            <DownVote />
          </form>
        </div>

        <div className="flex-1 p-4">
          <div className="flex items-center gap-x-2 mb-2">
            <Link
              className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary/20 transition-colors"
              href={`/r/${subName}`}
            >
              r/{subName}
            </Link>
            <p className="text-xs text-muted-foreground">
              Posted by{' '}
              <Link href={`/`} className="hover:text-primary hover:underline">
                u/{userName}
              </Link>
            </p>
            <span className="text-xs text-muted-foreground flex items-center gap-x-1">
              <Clock className="h-3 w-3" />
              {getTimeAgo(createdAt)}
            </span>
          </div>

          <Link href={`/post/${id}`} className="block group">
            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h2>
          </Link>

          {imageString ? (
            <div className="mb-4 rounded-lg overflow-hidden">
              <Image
                src={imageString}
                alt="Post image"
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
          ) : (
            <div>

            </div>
          )}

          <div className="flex items-center gap-x-4 text-sm text-muted-foreground">
            <Link
              href={`/post/${id}`}
              className="flex items-center gap-x-1"
            >
              <MessageCircle className="h-4 w-4" />
              <span className='text-muted-foreground font-medium text-xs'>30 Comments</span>
            </Link>
            <CopyLink id={id} />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default PostCard

