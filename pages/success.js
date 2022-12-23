import { useRouter } from "next/router"
import { motion as m } from "framer-motion"

import { useState, useEffect } from "react"

export default function Success() {
  const router = useRouter()

  return (
    <m.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex items-center justify-center h-screen "
    >
      <div className="w-1/3 p-16 text-gray-700 bg-white rounded-lg font-latoRegular">
        <h1 className="pb-4 text-3xl font-latoBold">
          Thanks for the email {router.query.name} ✨
        </h1>
        <p className="text-lg text-gray-500">
          We have sent you an email over at {router.query.email}. We will get
          back to you as soon as we can!
        </p>
      </div>
    </m.main>
  )
}
