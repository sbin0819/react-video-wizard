import { useEffect, useMemo, useState } from 'react'

export const isWithinTimeRange = (time: number, range: [number, number]): boolean => {
  return range && time >= range[0] && time <= range[1]
}

interface VideoControlsProps {
  fullScreenRef: React.RefObject<HTMLDivElement>
  videoRef: React.RefObject<HTMLVideoElement>
  controlsRef: React.RefObject<HTMLDivElement>
}

export default function useVideoControls({ fullScreenRef, videoRef, controlsRef }: VideoControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const progressPercentage = useMemo(() => (currentTime / duration) * 100 || 0, [currentTime, duration])

  // const isOpening = useMemo(
  //   () => data && data.opening && isWithinTimeRange(currentTime, data?.opening),
  //   [currentTime, data],
  // )
  // const isEnding = useMemo(
  //   () => data && data.ending && isWithinTimeRange(currentTime, data?.ending),
  //   [currentTime, data],
  // )

  // const isSkipButtonVisible = useMemo(() => isOpening || isEnding, [isOpening, isEnding])

  const [isDragging, setIsDragging] = useState(false)

  const [showControls, setShowControls] = useState(true)

  const showControlsHandler = () => {
    setShowControls(true)
  }

  const hideControlsHandler = () => {
    setShowControls(false)
  }

  const playVideo = () => {
    if (!videoRef.current) return
    videoRef.current.play()
    setIsPlaying(true)
  }

  const pauseVideo = () => {
    if (!videoRef.current) return
    videoRef.current.pause()
    setIsPlaying(false)
  }

  const toggleVideoPlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      pauseVideo()
    } else {
      playVideo()
    }
  }

  const seekVideo = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressElement = e.currentTarget
    const newTime =
      ((e.clientX - progressElement.getBoundingClientRect().left) / progressElement.offsetWidth) * duration
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
      setCurrentTime(Math.min(Math.max(0, newTime), duration))
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    e.preventDefault()
  }

  const toggleFullScreen = () => {
    if (!fullScreenRef.current) return

    if (!document.fullscreenElement) {
      fullScreenRef.current.requestFullscreen().then(() => {
        setIsFullScreen(true)
      })
    } else {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false)
      })
    }
  }

  const moveForward = () => {
    if (videoRef.current) {
      const newTime = Math.min(videoRef.current.currentTime + 10, videoRef.current.duration)
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const moveBackward = () => {
    if (videoRef.current) {
      const newTime = Math.max(videoRef.current.currentTime - 10, 0)
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  // const moveSkipEnd = () => {
  //   if (videoRef.current) {
  //     if (isOpening && data?.opening) {
  //       const newTime = Math.min(data?.opening[1], videoRef.current.duration)
  //       setCurrentTime(newTime)
  //       videoRef.current.currentTime = newTime
  //     } else if (isEnding && data?.ending) {
  //       const newTime = Math.min(data?.ending[1], videoRef.current.duration)
  //       setCurrentTime(newTime)
  //       videoRef.current.currentTime = newTime
  //     }
  //   }
  // }

  // update initial duration and current time
  useEffect(() => {
    const videoElement = videoRef.current

    let timerId: ReturnType<typeof setTimeout>

    const updateDuration = () => {
      if (videoElement) {
        const durationTime = videoElement.duration

        const startTime = Number(0)

        const initialTime = startTime > 0 && startTime <= durationTime ? startTime : 0

        setCurrentTime(initialTime)
        setDuration(Math.round(durationTime))

        timerId = setTimeout(() => {
          setShowControls(false)
        }, 1000)
      }
    }

    if (videoElement) {
      videoElement.addEventListener('loadedmetadata', updateDuration)
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadedmetadata', updateDuration)
        clearTimeout(timerId)
      }
    }
  }, [videoRef])

  // play/pause video
  useEffect(() => {
    let animationFrameId: number | null = null
    let lastTime = Date.now()

    const updateCurrentTime = () => {
      if (videoRef.current) {
        const now = Date.now()
        if (now - lastTime >= 1000) {
          setCurrentTime(Math.min(Math.round(videoRef.current.currentTime), duration))
          lastTime = now
        }
        animationFrameId = requestAnimationFrame(updateCurrentTime)
      }
    }

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(updateCurrentTime)
    } else if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [isPlaying, videoRef, duration])

  // progress bar dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const progressElement = fullScreenRef.current
        if (progressElement) {
          const rect = progressElement.getBoundingClientRect()
          const newTime = ((e.clientX - rect.left) / rect.width) * duration
          setCurrentTime(Math.min(Math.max(0, newTime), duration))
        }
      }
    }

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
        if (videoRef.current) {
          videoRef.current.currentTime = currentTime
        }
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, currentTime, duration, fullScreenRef, videoRef])

  // show controls on mouse move
  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>

    const handleMouseMove = () => {
      setShowControls(true)
      clearTimeout(timerId)
      timerId = setTimeout(() => {
        setShowControls(false)
      }, 1000 * 3)
    }

    const controlsContainer = controlsRef.current

    if (!controlsContainer) return

    controlsContainer.addEventListener('mousemove', handleMouseMove)

    return () => {
      controlsContainer.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timerId)
    }
  }, [controlsRef])

  // fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement
      setIsFullScreen(isFullscreen)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  return {
    // isSkipButtonVisible,
    // isOpening,
    isPlaying,
    isFullScreen,
    currentTime,
    duration,
    progressPercentage,
    showControls,
    controlsRef,
    toggleVideoPlay,
    seekVideo,
    handleMouseDown,
    toggleFullScreen,
    moveForward,
    moveBackward,
    // moveSkipEnd,
    showControlsHandler,
    hideControlsHandler,
  }
}
