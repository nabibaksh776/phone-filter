"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AIResposne, TranscriptionAPI, AddComment } from "../../../redux/Global/Apis";
import CustomModal from '../../components/Model/model'
import { FaComment } from "react-icons/fa";
import { Update_transcriptionData } from "../../../redux/Global/Slice";

const RecordingChat = () => {
  let dispatch = useDispatch()
  const [processedData, setProcessedData] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [audioTimes, setAudioTimes] = useState({});
  const [open, setOpen] = useState(false)
  const { AIResposneState, transcriptionData } = useSelector((state) => state.global)
  const [commentData, setCommentData] = useState(null)
  const [commentValue, setCommentValue] = useState("")
  const [uuidState, setUuid] = useState("")
  const [randomCommnt, setRandomCmnt] = useState("")

  const callAPI = () => {
    dispatch(AIResposne())
  }

  useEffect(() => {
    callAPI()
  }, [dispatch])




  useEffect(() => {
    console.log("transcriptionData---", transcriptionData.data)
    if (commentData !== null) {

      transcriptionData.data.forEach((item, index) => {
        if (item.response_id === commentData?.response_id) {
          setCommentData(item)
        }
      })
    }
  }, [transcriptionData])

  const handleRowClick = async (uuid) => {
    // setSelectedRowIndex(index);
    console.log("this is index--", uuid)
    setUuid(uuid)
    await dispatch(TranscriptionAPI({ uuid: uuid }))

  };




  const handleAddComment = async () => {
    let spaceText = commentValue.trim()
    if (spaceText !== "") {
      dispatch(Update_transcriptionData({ comment: commentValue, response_id: commentData?.response_id }))
      dispatch(AddComment({
        response_id: commentData?.response_id,
        comment: commentValue
      }))
    }
  }


  const renderChatMessage = (message, sender, timestamp, data) => (
    <div
      className={`flex ${sender === "AI" ? "justify-start" : "justify-end"
        } mb-4`}
    >
      <div
        className={`rounded-lg px-3 py-2 ${sender === "AI"
          ? "bg-[#F4F4F6] text-gray-800"
          : "bg-[#EBF4FF] text-gray-800"
          }`}
      >
        <p>{message}</p>
        <span className="block text-xs text-gray-500 mt-1">{timestamp}</span>
        <div className="flex items-center justify-end">
          <button
            onClick={() => {
              setRandomCmnt("")
              setCommentData(data)
              setOpen(true)
            }}
          >
            <FaComment />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-200 p-5">
      <div className="grid grid-cols-1 md:grid-cols-[35%,55%] gap-4 h-[700px]">
        {/* Recording Details Section */}
        <div className="col-span-1 md:col-span-1 border rounded-lg bg-white shadow-md overflow-y-auto p-5">
          <div className="font-bold text-2xl mb-2 text-[#343C6A] p-4">
            Recording Details
          </div>
          <table className="table-auto w-full text-left mb-4 overflow-y-auto">
            <thead>
              <tr className="border-b">
                <th className="py-2 w-1/3 text-[#1814F3]">Caller</th>
                <th className="w-1/3 text-center text-[#1814F3]">Date</th>
                {/* <th className="w-1/3 text-right text-[#1814F3]">Recording</th> */}
              </tr>
            </thead>
            <tbody>
              {AIResposneState?.data?.map((call, index) => {
                const startTime = new Date(call.createdAt).getTime();
                const endTime = new Date(call.endedAt).getTime();
                const audioDuration = Math.floor((endTime - startTime) / 1000);

                return (
                  <tr
                    key={index}
                    className="border-b py-6 cursor-pointer"
                    onClick={() => handleRowClick(call.call_uuid)}
                  >
                    <td className="py-2">

                      <div
                        className={`text-gray-500 ${!call.call_uuid && "opacity-0"
                          }`}
                      >
                        {call.call_uuid || "no name found"}
                      </div>
                    </td>
                    <td className="text-center text-gray-500">
                      <div>
                        {new Date(call.created_at).toLocaleDateString()}
                      </div>
                      {/* <div>
                        {new Date(call.startedAt).toLocaleTimeString()}
                      </div> */}
                    </td>
                    {/* <td className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayPause(call.recordingUrl, index);
                          }}
                        >
                          {playingIndex === index ? <FaPause /> : <FaPlay />}
                        </button>
                        <span>
                          {formatTime(audioTimes[index]?.currentTime || 0)} /{" "}
                          {formatTime(audioDuration)}
                        </span>
                        <FaEllipsisH className="cursor-pointer" />
                      </div>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Transcription Section */}
        <div className="col-span-1 md:col-span-1 border rounded-lg bg-white shadow-md overflow-y-auto">
          <div className="font-bold text-2xl mb-4 text-[#1814F3] p-4">
            Transcription
          </div>
          <div className="flex flex-col space-y-4 p-4">
            {transcriptionData?.data?.map((msg, index) => {
              const timestamp = new Date(
                processedData[selectedRowIndex ?? 0]?.startedAt
              ).toLocaleString();
              return (
                <div key={index}>
                  {renderChatMessage(msg.message, msg.role, msg.created_at, msg)}
                </div>
              );
            })}
          </div>
        </div>

        {/* custom Model */}
        <CustomModal
          open={open}
          setOpen={setOpen}
          title={"Add Comment"}
        >
          <div className="flex items-center justify-center">
            <textarea
              style={{
                width: "100%",
                padding: "8px",
                border: '1px solid lightgray',
                outline: "none",
                resize: 'none'
              }}
              onChange={(e) => {
                setCommentValue(e.target.value)
              }}
            ></textarea>
            <button style={{
              backgroundColor: "dodgerblue",
              padding: "8px",
              color: "white"
            }}
              onClick={handleAddComment}
            >
              Comment
            </button>
          </div>

          <div style={{ marginTop: '20px' }}>
            All Comments
          </div>
          <hr />
          {/* comments */}
          <div style={{
            maxHeight: "500px",
            minHeight: 'auto',
            overflowY: 'scroll',
            boxSizing: 'border-box',
          }}>


            {commentData?.comment ? (
              <div
                style={{
                  width: "100%",
                  margin: "10px auto",
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  fontFamily: "Arial, sans-serif",
                  color: "#333",
                }}
              >
                <div>{commentData?.comment}</div>
              </div>
            ) : null}
          </div>

        </CustomModal>
      </div>
    </div>
  );
};

export default RecordingChat;
