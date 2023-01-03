import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import MasonryLayout from './MasonryLayout'
// import { client } from '../client'
// import { feedQuery } from '../utils/data'
// import { searchQuery } from '../utils/data'
import Spinner from './Spinner'
import { collection, query, where } from "firebase/firestore";
import db from '../firebase'
import { doc, getDocs } from 'firebase/firestore'


const Search = ({ searchTerm, setSearchTerm}) => {
  // console.log(searchTerm)

  const [pins, setPins] = useState(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(searchTerm){
      setLoading(true);
      const postRef = collection(db, 'posts');
      var strSearch = `${searchTerm.toLowerCase()}`;
      var strlength = strSearch.length;
      var strFrontCode = strSearch.slice(0, strlength-1);
      var strEndCode = strSearch.slice(strlength-1, strSearch.length);
      var startcode = strSearch;
      var endcode= strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
      const q = query( postRef, where ("category", ">=", startcode), where("category", "<", endcode) );
      const fun = async () => {
        const querySnapshot = await getDocs(q);
        setPins( querySnapshot.docs.map(doc => doc.data() ) )
        setLoading(false);
      }
      fun();
      // const query = searchQuery(searchTerm.toLowerCase());
      // client.fetch(query)
      //   .then((data) => {
      //     setPins(data);
      //     setLoading(false);
      //   })
    }else{
      db.collection('posts').onSnapshot(snapshot => {
        setPins( snapshot.docs.map(doc => doc.data() ) )
      })
      setLoading(false);
      // client.fetch(feedQuery)
      //   .then((data) => {
      //     setPins(data);
      //     setLoading(false);
      //   })
    }
  }, [searchTerm])
  

  return (
    <div>
      {loading && <Spinner message={"Searching for Posts..."}/>} 
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className='mt-10 text-center text-xl'>
          No Posts Found
        </div>
      )}
    </div>
  )
}

export default Search
