import React from 'react'
import Head from "next/head"
import { FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'
import { RiHome2Line } from 'react-icons/ri'

export default function NotFoundPage() {
	return (
		<div className="h-full flex flex-col justify-center items-center">
			<Head>
				<title>Pejy tsy tazana | IanaTek</title>
			</Head>
			<h1 className="text-2xl font-bold tracking-widest mb-8 -mt-8">Pejy tsy tazana - ianatek</h1>
			<Link href="/">
				<a className="text-xl font-semibold tracking-widest flex items-center hover:text-blue-500 transition-colors duration-300 ease-in-out">
					<FaArrowLeft className="mr-4" /> Ho any amy <RiHome2Line className="twitter ml-4 mr-2" /> Pejitrano
					</a>
			</Link>
		</div>
	)
}
