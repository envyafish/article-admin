import type { Article } from '@/types/article.ts';
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardFooter } from '@/components/ui/card.tsx';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog.tsx'
import { useState } from 'react'


interface ArticleCardProps {
  article: Article
}



export function ArticleCard({ article }: ArticleCardProps) {
  const images = article.preview_images.split(',')
  const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <Card className="overflow-hidden rounded-2xl transition-shadow hover:shadow-xl">
      {/* 图片 */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative h-56 cursor-zoom-in overflow-hidden">
            <img
              src={images[0]}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-7xl p-4">
          <div className="relative">
            <img
              src={images[currentIndex]}
              alt={`${article.title}-${currentIndex}`}
              className="max-w-7xl rounded-lg object-contain"
            />

            {/* 左右切换按钮 */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white"
                >
                  ‹
                </button>

                <button
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev === images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-4 flex gap-2 overflow-x-auto">
              {images.map((img, index) => (
                <button
                  key={img}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded border-2 ${
                    currentIndex === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`preview-${index}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 内容 */}
      <CardContent className="space-y-3 pt-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <Badge variant="secondary">{article.section}</Badge>
          <span>{article.publish_date}</span>
        </div>

        <h3 className="line-clamp-2 font-semibold leading-snug">
          {article.title}
        </h3>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button className="flex-1">复制磁力</Button>
        <Button variant="outline" className="flex-1">推送下载</Button>
      </CardFooter>
    </Card>
  )
}
