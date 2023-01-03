import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
// import { feedQuery, searchQuery } from '../utils/data'
import db from '../firebase'
import { doc, getDocs } from 'firebase/firestore'
import { collection, query, where } from "firebase/firestore";
 
const Feed = () => {

  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const categoryId = useParams();
  // console.log(categoryId.categoryId)

  useEffect(() => {
    setLoading(true);
    if(categoryId.categoryId){
      const category = categoryId.categoryId;
      const postRef = collection(db, 'posts');
      const q = query( postRef, where ("category", "==", `${category}`));
      const fun = async () => {
        const querySnapshot = await getDocs(q);
        setPins( querySnapshot.docs.map(doc => doc.data() ) )
      }
      fun();
      setLoading(false);
    }else{
      db.collection('posts').onSnapshot(snapshot => {
        setPins( snapshot.docs.map(doc => doc.data() ) )
      })
      setLoading(false);
    }
  }, [categoryId])

  if(loading)return <Spinner message="We are adding new ideas to your feed" />
  
  if(!pins?.length) return <h2>No Related Posts...</h2>

  return (
    <div>
      {pins && <MasonryLayout pins={pins} /> }
    </div>
  )
}

export default Feed
