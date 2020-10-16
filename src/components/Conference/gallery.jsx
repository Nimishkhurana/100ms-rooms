import React, { useEffect } from "react"
import { LocalVideoView, MainVideoView, SmallVideoView } from "../../videoview"
import ContainerDimensions from "react-container-dimensions"
import { largestRect } from "rect-scaler"
import VideoStreamMerger from "video-stream-merger"

const Gallery = ({
  id,
  videoCount,
  client,
  localScreen,
  localStream,
  audioMuted,
  videoMuted,
  streams,
  onPin,
}) => {
  return (
    <div
      className={`absolute top-0 bottom-0 w-full flex flex-wrap justify-center items-center`}
      style={{ height: "calc(100vh - 128px)", backgroundColor: "#1a1619" }}
    >
      <ContainerDimensions>
        {({ width, height }) => {
          console.log({ width, height })
          let w = "100%"
          let h = "100%"
          if (videoCount > 0) {
            let largestRectObj = largestRect(width, height, videoCount, 160, 90)
            w = largestRectObj.width
            h = largestRectObj.height
          }

          return (
            <>
              {localStream && (
                <div style={{ height: h, width: w }}>
                  <LocalVideoView
                    id={id + "-video"}
                    label="(You)"
                    client={client}
                    stream={localStream}
                    audioMuted={audioMuted}
                    videoMuted={videoMuted}
                    videoType="localVideo"
                    onPin={() => {
                      onPin(id + "-video")
                    }}
                  />
                </div>
              )}
              {streams.map((item, index) => {
                return (
                  <div key={item.mid} style={{ height: h, width: w }}>
                    <MainVideoView
                      id={item.mid}
                      stream={item.stream}
                      onPin={() => {
                        onPin(item.mid)
                      }}
                    />
                  </div>
                )
              })}

              {localScreen && (
                <div style={{ height: h, width: w }}>
                  <LocalVideoView
                    id={id + "-screen"}
                    label="Screen Sharing (You)"
                    client={client}
                    stream={localScreen}
                    audioMuted={false}
                    videoMuted={false}
                    videoType="localScreen"
                    onPin={() => {
                      onPin(id + "-screen")
                    }}
                  />
                </div>
              )}
            </>
          )
        }}
      </ContainerDimensions>
    </div>
  )
}

export { Gallery }
