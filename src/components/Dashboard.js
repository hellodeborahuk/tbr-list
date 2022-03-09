import { useHistory } from 'react-router'
import { useAuth } from '../contexts/Auth'
import {useState, useEffect} from "react"
import { supabase } from './Client'
import { MdDeleteForever } from "react-icons/md"

export function Dashboard() {
  const { user, signOut } = useAuth()
  const history = useHistory()
  const [books, setBooks] = useState([])
  const [book, setBook] = useState({title: "", author: ""})
  

  useEffect(() => {
    fetchBooks()
  }, [])
  async function fetchBooks() {
      const { data } = await supabase
        .from('books')
        .select()
      setBooks(data)
      console.log("data: ", data)
  }

  async function createBook() {
    const { title, author } = book
    await supabase
      .from("books")
      .insert([
          { title, author }
      ])
    setBook({ title: "", author: ""})
    fetchBooks()
  }

 async function deleteBook(id) {
    const { data, error } = await supabase
    .from('books')
    .delete()
    .eq( "id", id )
    setBooks(books.filter(book => { return book.id != id}))
 }

  async function handleSignOut() {
    // Ends user session
    await signOut()

    // Redirects the user to Login page
    history.push('/login')
  }
  
    return (
      <div>
        <p>Welcome, {user?.id}!</p>
        <p>What book do you want to read today?</p>
        
          <input 
            placeholder='Title'
            value={book.title}
            onChange={e => setBook({ ...book, title: e.target.value })}
          />
          <input 
            placeholder='Author'
            value={book.author}
            onChange={e => setBook({ ...book, author: e.target.value })}
          />
          <button className="btn" onClick={createBook}>Add book</button>
        {
          books.map(book => {
            return (
              <div key={book.id} className="flex flex-row gap-4 items-center cursor-pointer">
                <p>{book.title}</p><p>{book.author}</p><span className="text-pink-500 text-xl" onClick={() => deleteBook(book.id)}><MdDeleteForever /></span>
              </div>
          )
          })
        }
        <button onClick={handleSignOut} className="btn mt-40">Sign out</button>
      </div>
    )
  }
