import { useRef } from 'react'
import styled from 'styled-components'

import { Padding, Row, SizedBox } from 'components/common'
import { formatTime } from './Video.helper'

import { useVideoControls } from '../../../../../lib/main'

import { FaPlay, FaPause } from 'react-icons/fa'

import { MdFullscreen, MdFullscreenExit } from 'react-icons/md'

import { TbRewindBackward10, TbRewindForward10 } from 'react-icons/tb'

interface VideoControlsProps {
  data: {
    url: string
    title: string
  }
  fullScreenRef: React.RefObject<HTMLDivElement>
  videoRef: React.RefObject<HTMLVideoElement>
}

export default function VideoControls({ data, fullScreenRef, videoRef }: VideoControlsProps) {
  const controlsRef = useRef<HTMLDivElement>(null)

  const {
    duration,
    currentTime,
    isPlaying,
    isFullScreen,
    progressPercentage,
    showControls,
    showControlsHandler,
    hideControlsHandler,
    handleMouseDown,
    seekVideo,
    toggleVideoPlay,
    moveBackward,
    moveForward,
    toggleFullScreen,
  } = useVideoControls({ fullScreenRef, videoRef, controlsRef })

  return (
    <Wrapper>
      <Container show={showControls ? 1 : 0}>
        {data && duration > 0 && (
          <Padding top="30px" horizontal="40px">
            <Row align="flex-end" justify="space-between">
              <Title>{data?.title}</Title>
              <VideoTime width="auto" gap={8}>
                <span>
                  {duration >= 60 * 60 && currentTime < 60 * 60
                    ? '00:' + formatTime(currentTime)
                    : formatTime(currentTime)}
                </span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </VideoTime>
            </Row>
          </Padding>
        )}
        <ControlsContainer
          ref={controlsRef}
          horizontal="40px"
          bottom="40px"
          onMouseEnter={showControlsHandler}
          onMouseLeave={hideControlsHandler}
        >
          <SizedBox height={18} />
          <Progress onClick={seekVideo}>
            <ProgressBarContainer>
              <ProgressBar width={duration ? `${progressPercentage}%` : '0%'} />
              <DragHandle style={{ left: duration ? `${progressPercentage}%` : '0%' }} onMouseDown={handleMouseDown} />
            </ProgressBarContainer>
          </Progress>
          <SizedBox height={34} />
          <Row align="center" justify="space-between">
            <Row justify="flex-start" gap={24}>
              <Button onClick={toggleVideoPlay}>{isPlaying ? <FaPause size={36} /> : <FaPlay size={36} />}</Button>
              <Button onClick={moveBackward}>
                <TbRewindBackward10 size={36} />
              </Button>
              <Button onClick={moveForward}>
                <TbRewindForward10 size={36} />
              </Button>
            </Row>
            <Row width="auto">
              <Button onClick={toggleFullScreen}>
                {isFullScreen ? <MdFullscreenExit size={42} /> : <MdFullscreen size={42} />}
              </Button>
            </Row>
          </Row>
        </ControlsContainer>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`

const Container = styled.div<{ show: number }>`
  color: #fff;
  opacity: ${({ show }) => (show === 1 ? '1' : '0')};
  transition:
    opacity 0.5s ease,
    visibility 0.5s ease;
`

const Title = styled.div`
  color: #fff;
  font-size: 48px;
  font-weight: 700;
  line-height: 72px;
`

const VideoTime = styled(Row)`
  span {
    font-size: 24px;
    font-weight: 400;
    line-height: 36px;
  }
`

const ControlsContainer = styled(Padding)`
  background-color: linear-gradient(0deg, rgba(25, 26, 42, 0.52) 0%, rgba(25, 26, 42, 0) 58.19%);
`

const Progress = styled.div`
  padding-block: 10px;
  cursor: pointer;
`

const ProgressBarContainer = styled.div`
  position: relative;
  height: 4px;
  border-radius: 4px;
  background-color: #fff;

  cursor: pointer;
`

const ProgressBar = styled.div<{ width: string }>`
  position: relative;
  width: ${({ width }) => width};
  height: 100%;
  background-color: salmon;
`

const DragHandle = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;
`

const Button = styled.button`
  color: #fff;
`
