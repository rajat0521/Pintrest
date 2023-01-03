import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import db from '../firebase'
import { doc, getDocs } from 'firebase/firestore'
import { collection, query, where } from "firebase/firestore";



const PinDetail = ({ user }) => {
  const [postDetails, setPostDetails] = useState('')
  const [relatedPosts, setRelatedPosts] = useState('')
  const [postedByUser, setPostedByUser] = useState('')
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState('')
  const [commentsOnPost, setCommentsOnPost] = useState([])

  const { postId, postedBy } = useParams();
  const navigate = useNavigate();
  // console.log(postDetails)
  console.log(commentsOnPost)
  const arr = []
  
  
  useEffect(() => {
    const postedByUserRef = db.collection('users').doc(postedBy) ;
    const postRef = db.collection('posts').doc(postId);
    const fun = async () => {
      const doc = await postedByUserRef.get();
      setPostedByUser(doc.data())
      const doc2 = await postRef.get().then((doc) => {
        // if(doc){
        //   doc.data()?.comments?.map( async (comment) => {
        //     const doc = await comment.get();
        //     arr.push(doc.data());
        //   })
        // }
        setPostDetails(doc.data())
      })
      .catch((err) => {
        console.log(err)
      });
      
    } 
    fun();
  }, [postId])


  useEffect(() => {
    const category = postDetails.category;
      const postRef = collection(db, 'posts');
      const q = query( postRef, where ("category", "==", `${category}`));
      const fun = async () => {
        const querySnapshot = await getDocs(q);
        setRelatedPosts( querySnapshot.docs.map(doc => doc.data() ) )
      }
      fun();
      setAddingComment(false);
  }, [postDetails])
  

  // const addComment = async (c) => {
  //   // console.log(comment)
  //   // const commentv4 = uuidv4();
  //   // const data = {
  //   //   commentByUserId : `${user?.user_id}`,
  //   //   commentByUserImage: `${user?.image}`,
  //   //   commentByUserName: `${user?.userName}`,
  //   //   commentOnPost : `${postDetails?.imageId}`,
  //   //   data : `${comment}` ,
  //   //   comment_id : `${commentv4}`
  //   // }
  //   // const res = await 
  //   // db
  //   //   .collection(`comments/`)
  //   //   .doc(`${commentv4}`)
  //   //   .set(data)
  //   //   .then( () => {
  //   //     addCommentInPost(commentv4);
  //   //     // navigate('/home');
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err)
  //   //   });
  // }

  // const addCommentInPost = async (commentId) => { 
  //   const CommentRef = db.collection('comments').doc(commentId);
  //   const postRef = db.collection('posts').doc(postId);
  //   const post = await postRef.get();
  //   // console.log(post.data())
  //   const commentsArrayOfPost = post.data().comments;
  //   // console.log(commentsArrayOfPost)
  //   commentsArrayOfPost.push(CommentRef);
  //   try{
  //     const res = await 
  //     db
  //       .collection(`posts/`)
  //       .doc(`${postId}`)
  //       .update({
  //         comments: commentsArrayOfPost
  //       })
  //       .then( () => {
  //         setComment('');
  //         setAddingComment(false);
  //         navigate('/home')
  //         // window.location.reload();
  //       });
  //   }catch{
  //     console.log("error in adding comment")
  //   }

  // }

  if(!postDetails)return <Spinner message="Loading Post Details....."  />

  return (
    <>
      <div className='flex xl-flex-row flex-col m-auto bg-white' style={{maxWidth:'1500px', borderRadius: '32px'}}>
        <div className='flex justify-center items-center md:items-start flex-initial '>
          <img 
            src={postDetails.imageURL}
            alt="user-post" 
            className='rounded-3xl h-370 2xl:h-510'
          />
        </div>

        <div className='w-full p-5 flex-1 xl:min-w-620'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
            </div>
          </div>
          <div>
            <h1 className='text-4xl font-bold break-words mt-3'>
              {postDetails?.title}
            </h1>
            <p>
              {postDetails?.about}
            </p>
          </div>

          <button
            className='flex gap-2 mt-2 items-center'
            onClick={() => navigate(`/home/user-profile/${postedByUser?.user_id}`)}
          >
            <img
              className='w-8 h-8 rounded-full object-cover' 
              src={postedByUser.image} 
              alt="user-profile" 
            />
            <p className='font-semibold capitalize'>
              {postedByUser?.userName}
            </p>
          </button>
          
          {/* <h2 className='mt-5 text-2xl'> Comments </h2> */}

          {/* <div className='max-h-370 overflow-y-auto'>
            {commentsOnPost?.map( (comment, i) => ( 
              <div className='flex gap-2 mt-5 items-center bg-white rounded-lg ' key={i}>
                <img 
                key={i}
                  src={comment?.commentByUserImage} alt="user-profile" 
                  className='w-10 h-10 rounded-full cursor-pointer'
                  onClick={() => navigate(`/home/user-profile/${comment?.commentByUserId}`)} 
                />
                <div className='flex flex-col'>
                  <p className='font-bold'> {comment?.commentByUserName} </p>
                  <p > {comment?.data} </p>
                </div>
              </div>
            ))}
          </div> */}
          <div className='flex flex-wrap gap-3 mt-6'>

              {/* we can use either Link or button to show user profile image which will redirect us to user profile page */}
            {/* <button
              className='flex gap-2 mt-2 items-center'
              onClick={() => navigate(`/home/user-profile/${user?.user_id}`)}
            >
              <img className='w-8 h-8 rounded-full object-cover' src={user?.image} alt="user-profile" />
            </button> */}
          {/* <Link className='flex gap-2 mt-2 items-center' onClick={() => navigate(`/home/user-profile/${pinDetail?.postedBy?._id}`)} >
            <img className='w-8 h-8 rounded-full object-cover' src={pinDetail?.postedBy?.image} alt="user-profile" />
          </Link> */}


          {/* <input 
            type="text"
            placeholder='Add a Comment'
            value={comment} 
            className='flex-1 border-gray-00 outline-none border-2 p-2 focus:border-gray-00 border rounded-xl'
            onChange={ (e) => setComment(`${e.target.value}`) }
          />
          <button
            type='button'
            className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
            onClick={() => addComment(comment)}
          >
            {addingComment ? 'Posting the Comment': 'Post' } */}
          {/* </button> */}
          </div>
        </div>
      </div>
      {
        relatedPosts ? 
        (
          <>
            <h2 className='text-center font-bold text-2xl mt-8 mb-4'>
              More Like This 
            </h2>
            <MasonryLayout pins={relatedPosts} />
          </>
        )
        : 
        (
          <>
          <Spinner message="Loading Related Posts ..." />
          </>
        )
      }
    </>
    
    
  )
}

export default PinDetail
