import React from "react"
import { Link } from "gatsby"
import Header from "./header"

import { rhythm, scale } from "../utils/typography"

export default ({ children, ...props }) => (
  <div className='max-w-2xl container mx-auto px-2 py-8'>
    <Header {...props} />

    <main>{children}</main>
    <footer>Footer</footer>
  </div>
)
