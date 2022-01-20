import React, { useState, useEffect } from 'react';
import { BsDownload } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner'; 

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();

  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query)
        .then((data) => {
          setPinDetail(data[0]);
          if (data[0]) {
            const que = pinDetailMorePinQuery(data[0]);

            client.fetch(que)
              .then((res) => setPins(res));
          }
        })
    }
  }

  useEffect(() => {
    fetchPinDetails();
  }, [pinId])


  // useEffect(() => {
  //   const fetchPinDetails = () => {
  //     const query = pinDetailQuery(pinId);

  //     if (query) {
  //       client.fetch(query)
  //         .then((data) => {
  //           setPinDetail(data[0]);

  //           if (data[0]) {
  //             const que = pinDetailMorePinQuery(data[0]);

  //             client.fetch(que)
  //               .then((res) => setPins(res));
  //           }
  //         })
  //     }
  //   }

  //   fetchPinDetails();
  // }, [pinId])


  const addComment = () => {
    if (comment) {
      setAddingComment(true)

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{
          comment,
          _key: uuidv4(),
          postedBy: {
            _type: 'postedBy',
            _ref: user._id
          }
        }])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        })
    }
  }

  if(!pinDetail) return (<div className="mt-10"><Spinner /></div>);

  return (
    <>
      <div className="flex xl-flex-row flex-col m-auto bg-white dark:bg-slate-800" style={{ maxWidth: '1500px', borderRadius: '32px'}}>
        <div className="flex justify-center items-center md:items-start flex-initial">
          <img 
            src={(pinDetail?.image && urlFor(pinDetail?.image).url())}
            className="rounded-t-lg rounded-b-lg"
            alt="user-post"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
            <a 
              href={`${pinDetail.image.asset?.url}?dl=`}
              download
              onClick={(e) => e.stopPropagation()}
              className="animate-bounce w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
            >
              <BsDownload />
            </a>
            </div>
            <a href={pinDetail.destination} target="_blank" rel="noreferrer" className="text-slate-400">
              URL: {pinDetail.destination}
            </a>
          </div>
          <div>
            <h1 className="text-2xl font-semibold break-words mt-3">
              {pinDetail.title}
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              {pinDetail.about}
            </p>
          </div>
          <Link to={`/user-profile/${pinDetail.postedBy?._id}`} className="flex gap-2 mt-5 items-center  rounded-lg ">
            <img src={pinDetail?.postedBy.image} className="w-5 h-5 rounded-full" alt="user-profile" />
            <p className="font-semibold">{pinDetail.postedBy?.userName}</p>
          </Link>
          <div className="mt-10 text-xl text-slate-800 dark:text-slate-300">Comments</div>
          <div className="max-h-370 ml-10 overflow-y-auto">
            {pinDetail?.comments?.map((item) => (
              <div className="flex gap-2 mt-5 items-center rounded-lg" key={item.comment}>
                <img 
                  src={item.postedBy?.image} 
                  alt="user-profile" 
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-slate-500">{item.postedBy?.userName}</p>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
            {/* <Link to={`/user-profile/${pinDetail.postedBy?._id}`} className="flex justify-center items-center">
              <img src={pinDetail.postedBy?.image} className="w-8 rounded-full cursor-pointer" alt="user-profile" />
            </Link> */}
            <input
              className="flex-1 border-gray-100 outline-none dark:bg-slate-700 border-2 dark:border-slate-600 p-2 rounded-2xl focus:border-gray-300"
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value) }
            />
            <button
              type="button"
              className="bg-blue-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
              onClick={addComment}
            >
              {addingComment ? 'Posting the comment...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
      {pins?.length > 0 ? (
        <>
          <h2 className="text-center text-slate-500 font-bold text-2x mt-8 mb-4 ">
            More like this
          </h2>
          <MasonryLayout pins={pins} />
        </> 
      ): (
        <div></div>
      )}
    </>
  )
}

export default PinDetail
