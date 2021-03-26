import React from 'react'
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';
import Chapter from './Chapter';

export default function ChaptersGroup({ group, course }) {

	// S T A T E
	const [showChildren, setShowChildren] = React.useState(true);

	// J S X
	const { chapters } = group;
	return (
		<div className="mb-4">
			{/* if (group.show) */}
			{group.show && (
				<div>
					<div
						className="px-4 py-1 flex justify-between items-center bg-gray-400 hover:bg-gray-500 bg-opacity-50 hover:bg-opacity-50 cursor-pointer rounded-xl transition-colors duration-200 ease-in-out"
						onClick={(e) => setShowChildren(!showChildren)}
					>
						<h3 className="font-semibold tracking-widest">
							{group.title} <span className="text-sm ml-3">({chapters.length})</span>
						</h3>
						{showChildren ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
					</div>
					{group.show && showChildren && (
						<div className="ml-4 my-2">
							{chapters.map((chapter) => <Chapter course={course} chapter={chapter} key={chapter.id} />)}
						</div>
					)}
				</div>
			)}


			{/* else */}
			{!group.show && <div className="grid grid-rows-5 md:gap-x-8">
				{chapters.map((chapter) => <Chapter course={course} chapter={chapter} key={chapter.id} />)}
			</div>}
		</div>
	)
}

