import React from 'react'
import { Modal } from 'react-bootstrap';
import { FaCheckSquare, FaShoppingBasket, FaSquare } from 'react-icons/fa'
import UserContext from '../../../_react-contexts/user-context';
import PostGridItem from '../PostGridItem';

function Payment({ post, type }) {

	// S T A T E
	const [showModal, setShowModal] = React.useState(false);
	const [paymentMethod, setPaymentMethod] = React.useState(null);

	// C O N T E X T
	const { user } = React.useContext(UserContext);

	return (
		<>
			<button className="px-4 rounded-full twitter-bg twitter-bg-hover transition-all duration-500 ease-in-out tracking-widest cursor-pointer flex items-center transform hover:scale-105 hover:-rotate-1" onClick={() => setShowModal(true)}>
				<FaShoppingBasket className="mr-2 text-2xl" /> Hividy
			</button>
			{user && (
				<Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
					<div className="bg45 rounded-xl border-2 overflow-hidden border-yellow-400">
						<h2 className="text-uppercase tracking-widest font-bold border-b border-gray-200 bg24 py-2 rounded-t-lg text-lg flex items-center justify-center">
							<FaShoppingBasket className="mr-4 text-2xl" /> Hividy
					</h2>
						<section className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
							<section className="hidden lg:block lg:cols-span-1">
								<PostGridItem post={post} url="#" />
							</section>
							<section className="lg:col-span-2">
								<p className="text-gray-300">
									<strong className="font-bold tracking-widest text-yellow-300">{user.full_name}</strong> <strong>&lt; {user.email} &gt;</strong>, eo andalam-pividianana ity fampianarana ity ianao zao : <br />
									<strong className="font-semibold tracking-widest text-white">{post.title}</strong>, zay misara <i className="font-semibold text-white tracking-wider">{post.price} ar</i>.
								</p>
								<p className="my-1">
									Safidio amireto àry zay andefasanao azy :
								</p>
								<ul className="flex justify-around my-2">
									<PaymentMethodComponent checked={paymentMethod === "MVOLA"} text="MVola" onClick={() => setPaymentMethod("MVOLA")} />
									<PaymentMethodComponent checked={paymentMethod === "ORANGE_MONEY"} text="Orange Money" onClick={() => setPaymentMethod("ORANGE_MONEY")} />
								</ul>
							</section>
						</section>
					</div>
				</Modal>
			)}
		</>
	)
}

export default Payment

function PaymentMethodComponent({ checked, text, onClick }) {
	return (
		<li className={`flex items-center cursor-pointer font-semibold tracking-widest ${checked ? "success" : "text-gray-400"}`} onClick={onClick}>
			{!checked && <FaSquare />}
			{checked && <FaCheckSquare className="success" />}
			<p className="ml-2">{text}</p>
		</li>
	);
}