import { useRef } from 'react'
import VideoControls from './Video.Controls'
import { mockData } from './data'

export default function Video() {
  const fullScreenRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <>
      <video ref={videoRef} src={mockData.url} />
      <VideoControls data={mockData} fullScreenRef={fullScreenRef} videoRef={videoRef} />
    </>
  )
}
