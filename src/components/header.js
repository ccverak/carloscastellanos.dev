import React from "react"
import { Link } from "gatsby"

export default ({ children, title, ...props }) => {
  return (
    <nav class='flex items-center justify-between flex-wrap pt-4 fixed w-full z-10 top-0'>
      <ul class='flex w-full'>
        <li class='mr-10 pr-32 md:pr-48 lg:pr-56'>
          <Link
            to='/'
            className='tracking-wide shadow-focus text-sm transition-all  duration-300 hover:bg-link uppercase font-bold'
          >
            Home
          </Link>
        </li>
        <li class='mr-10 pl-2 md:pl-48 lg:pl-48'>
          <Link
            to='/posts'
            className='tracking-wide shadow-focus text-sm transition-all  duration-300 hover:bg-link uppercase font-bold'
          >
            /Blog
          </Link>
        </li>
        <li class='mr-10'>
          <Link
            to='/About'
            className='tracking-wide shadow-focus text-sm transition-all  duration-300 hover:bg-link uppercase font-bold'
          >
            /About
          </Link>
        </li>
      </ul>
    </nav>
  )
}
