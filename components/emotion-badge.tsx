import { Badge } from "@/components/ui/badge"
import type { Emotion } from "@/lib/types"
import { getEmotionColor, getEmotionIcon } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface EmotionBadgeProps {
  emotion: Emotion
  showIcon?: boolean
  className?: string
}

export function EmotionBadge({ emotion, showIcon = true, className }: EmotionBadgeProps) {
  return (
    <Badge className={cn("font-normal text-sm", getEmotionColor(emotion), className)}>
      {showIcon && <span className="mr-1">{getEmotionIcon(emotion)}</span>}
      {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
    </Badge>
  )
}
