import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle, Clock } from 'lucide-react'
import getTimeAgo from '@/utils/getTimeAgo'
import { handleVote } from '../actions'
import { DownVote, UpVote } from './Buttons'
import { SharePopup } from './SharePopup'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface PostCardProps {
  title: string
  jsonContent: string
  id: string
  subName: string
  userName: string
  imageString?: string
  voteCount: number
  createdAt: Date
  commentCount: number | null
}

export default function PostCard({
  title,
  id,
  subName,
  userName,
  imageString,
  voteCount,
  createdAt,
  commentCount
}: PostCardProps) {
  return (
    <TooltipProvider>
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="flex">
          <div className="flex flex-col items-center gap-y-2 bg-muted p-4">
            <form action={handleVote}>
              <input type="hidden" name="voteDirection" value="UP" />
              <input type="hidden" name="postId" value={id} />
              <UpVote className="hover:bg-primary hover:text-primary-foreground" />
            </form>

            <span className="font-semibold text-sm">{voteCount}</span>

            <form action={handleVote}>
              <input type="hidden" name="voteDirection" value="DOWN" />
              <input type="hidden" name="postId" value={id} />
              <DownVote className="hover:bg-blue-500 hover:text-white" />
            </form>
          </div>

          <div className="flex-1 p-4">
            <div className="flex items-center gap-x-3 mb-3">
              <Link
                className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
                href={`/r/${subName}`}
              >
                r/{subName}
              </Link>
              <p className="text-xs text-muted-foreground">
                Posted by{' '}
                <Link href={`/u/${userName}`} className="hover:text-primary hover:underline">
                  u/{userName}
                </Link>
              </p>
              <span className="text-xs text-muted-foreground flex items-center gap-x-1">
                <Clock className="h-3 w-3" />
                {getTimeAgo(createdAt)}
              </span>
            </div>

            <Link href={`/post/${id}`} className="block group">
              <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{title}</h2>
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
              <div className="mb-4 text-sm text-muted-foreground line-clamp-3">
                Hello some content here!
              </div>
            )}

            <div className="flex items-center gap-x-2 text-xs">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-muted-foreground hover:bg-muted hover:text-primary"
                    asChild
                  >
                    <Link href={`/post/${id}`}>
                      <MessageCircle className="h-4 w-4" />
                      {commentCount}
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Comments</p>
                </TooltipContent>
              </Tooltip>
              <SharePopup id={id} />
            </div>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  )
}