import {useEffect} from 'react'

const Home = () => {
  useEffect(() => {
  fetch("http://localhost:5000/api/visitors/track", { method: "POST" });
}, []);

  return (
    <>
      <p>Home page</p>
    </>
  )
}

export default Home