import { useEffect, useRef, useState } from 'react'

// Renders the real, live site scaled down inside a browser-style frame.
// It only loads once it scrolls near the viewport, to keep the page fast.
const DESKTOP_WIDTH = 1280
const DESKTOP_HEIGHT = 800

const ProjectPreview = ({ url, title }) => {
  const boxRef = useRef(null)
  const [scale, setScale] = useState(0.35)
  const [inView, setInView] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = boxRef.current
    if (!el) return

    const resize = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / DESKTOP_WIDTH)
    })
    resize.observe(el)

    const visible = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          visible.disconnect()
        }
      },
      { rootMargin: '300px' }
    )
    visible.observe(el)

    return () => {
      resize.disconnect()
      visible.disconnect()
    }
  }, [])

  const host = url ? new URL(url).host : ''

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="flex items-center border-b border-line bg-mist px-3 py-2">
        <span className="truncate rounded-md bg-white px-3 py-1 text-xs text-muted">
          {host || 'Live demo coming soon'}
        </span>
      </div>

      <div ref={boxRef} className="relative aspect-[16/10] overflow-hidden bg-mist">
        {url && inView && (
          <iframe
            src={url}
            title={`Live preview of ${title}`}
            tabIndex={-1}
            aria-hidden="true"
            onLoad={() => setLoaded(true)}
            sandbox="allow-scripts allow-same-origin"
            className={`pointer-events-none absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ width: DESKTOP_WIDTH, height: DESKTOP_HEIGHT, transform: `scale(${scale})` }}
          />
        )}
        {(!url || !loaded) && (
          <div className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold text-muted/60">
            {title}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectPreview
