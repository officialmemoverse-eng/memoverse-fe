import { forwardRef, PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'

type ContainerProps = {
  className?: string
  size?: 'sm' | 'md'
}

const Container = forwardRef<HTMLDivElement, PropsWithChildren<ContainerProps>>((props, ref) => {
  const { children, size = 'md', className } = props
  return (
    <div
      className={cn(
        'mx-auto w-full',
        size === 'md' && 'px-4 min-[1940px]:w-[1680px] min-[1940px]:px-0',
        size === 'sm' && 'px-4 min-[1240px]:w-[1178px] min-[1240px]:px-0',
        className,
      )}
      ref={ref}
    >
      {children}
    </div>
  )
})
Container.displayName = 'Container'

export { Container }
