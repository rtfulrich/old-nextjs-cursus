import axios from 'axios';
import React from 'react'
import UserContext from "../_react-contexts/user-context";
import { useRouter } from "next/router";
import { API_URL, FRONT_URL } from '../_constants/URLs';
import { FaEdit, FaLock, FaPhone, FaPlus, FaTrash, FaUser } from 'react-icons/fa';
import InputLabel from '../_components/admin/posts/fields/InputLabel';
import { toast } from 'react-toastify';
import ChangePassword from '../_components/front/modals/ChangePassword';
import { Modal } from 'react-bootstrap';
import ResetPassword from '../_components/front/modals/ResetPassword';

export const CHANGE_PASSWORD_MODAL = "CHANGE_PASSWORD";
export const RESET_PASSWORD_MODAL = "RESET_PASSWORD";

export default function Kaontiko({ currentUser }) {
	// console.log(currentUser);

	// V A R I A B L E S 
	const router = useRouter();

	// S T A T E S
	const [errors, setErrors] = React.useState({
		first_name: null, last_name: null, email: null, pseudo: null, phone_number: null
	});
	const [showModal, setShowModal] = React.useState(false);
	const [inModal, setInModal] = React.useState(CHANGE_PASSWORD_MODAL);

	// R E F S
	const fnameRef = React.useRef();
	const lnameRef = React.useRef();
	const emailRef = React.useRef();
	const pseudoRef = React.useRef();
	const phoneRef = React.useRef();

	// C O N T E X T S
	const { user } = React.useContext(UserContext);

	React.useEffect(() => {
		if (user === null) router.replace("/");
		else router.replace("/kaontiko");
	}, [user]);

	// M E T H O D S
	const addPhoneNumber = () => {
		const phone_number = phoneRef.current.value;
		axios.post(`${API_URL}/current-user/add-phone-number`, { phone_number })
			.then(response => {
				// console.log(response, response.data);
				phoneRef.current.value = "";
				router.replace("/kaontiko");
				toast.success(response.data.message);
			})
			.catch(error => {
				console.log(error.response);
				const { status, message } = error.response;
				if (status === 422) {
					const errors = error.response.data.errors;
					let phone_number = null;
					if (errors.phone_count) phone_number = errors.phone_count[0];
					if (errors.phone_number) phone_number = errors.phone_number[0];
					setErrors({ ...errors, phone_number });
				}
			});
	}

	const handleShowModal = () => {
		setInModal(CHANGE_PASSWORD_MODAL);
		setShowModal(true);
	};

	return (
		<>
			{user && (
				<div className="p-4 md:px-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
						<div className="md:col-span-2 p-2 rounded-xl border-2 border-gray-500">
							<div className="flex justify-between items-center mb-4">
								<h1 className="flex items-center text-xl font-bold tracking-widest">
									<FaUser className="mr-4" /> <span>Momba ahy</span>
								</h1>
								<span className="flex items-center text-xs font-semibold twitter twitter-hover cursor-pointer" onClick={handleShowModal}>
									<FaLock className="mr-2" /> Hanova tenimiafina
								</span>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<InputLabel fieldRef={pseudoRef} label="Pseudo" id="pseudo" errorNeeds={[errors, setErrors, "pseudo"]} className="mb-3" defaultValue={currentUser.pseudo}>
									Pseudo
          		</InputLabel>
								<InputLabel fieldRef={emailRef} label="Email" id="email" errorNeeds={[errors, setErrors, "email"]} className="mb-3" defaultValue={currentUser.email} type="email">
									Email
          		</InputLabel>

								<InputLabel fieldRef={fnameRef} label="First name" id="fname" errorNeeds={[errors, setErrors, "first_name"]} className="mb-3" defaultValue={currentUser.first_name}>
									First Name
          			</InputLabel>
								<InputLabel fieldRef={lnameRef} label="Last name" id="lname" errorNeeds={[errors, setErrors, "last_name"]} className="mb-3" defaultValue={currentUser.last_name}>
									Last Name
          			</InputLabel>
							</div>
						</div>
						<div className="p-2 rounded-xl border-2 border-gray-500">
							<div className="flex justify-center items-center">
								<h1 className="flex items-center text-xl font-bold tracking-widest mb-4">
									<FaPhone className="mr-4" /> <span>Laharana finday</span>
								</h1>
							</div>
							{currentUser.phone_numbers.length === 0 && (
								<div className="text-center text-gray-500 text-opacity-75 font-bold tracking-widest">Mbola tsy misy !</div>
							)}
							{currentUser.phone_numbers.map(phone => (
								<div key={phone.id} className="flex justify-between items-center mb-2">
									<div className="flex items-center font-semibold">
										<span className="">{phone.phone_number}</span>
										<span className="text-xs mx-2 py-1 px-2 bg-yellow-300 rounded-full text-black">{phone.money} ar</span>
									</div>
									<div className="flex items-center">
										<FaEdit className="text-blue-500 hover:text-blue-600 cursor-pointer mr-2" />
										<FaTrash className="text-red-400 hover:text-red-500 cursor-pointer" />
									</div>
								</div>
							))}
							{currentUser.phone_numbers.length <= 2 && (
								<div>
									<hr className="mt-4 mb-2" />
									<div className="flex justify-between items-start">
										<InputLabel fieldRef={phoneRef} label={null} id="phone" errorNeeds={[errors, setErrors, "phone_number"]} className="flex-1 mr-4" accept="number">
											Laharana finday vaovao
          				</InputLabel>
										<button className="p-2 cursor-pointer relative rounded-lg twitter-bg twitter-bg-hover" onClick={addPhoneNumber}>
											<FaPlus className="" />
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
					<Modal show={showModal} onHide={() => setShowModal(false)} size="sm" centered>
						<div className="bg45 rounded-xl border-2 overflow-hidden border-yellow-400">
							{inModal === CHANGE_PASSWORD_MODAL && <ChangePassword setShowModal={setShowModal} setInModal={setInModal} />}
							{inModal === RESET_PASSWORD_MODAL && <ResetPassword setShowModal={setShowModal} setInModal={setInModal} />}
						</div>
					</Modal>
				</div>
			)}
			{!user && (
				<div className="h-full flex justify-center items-center">
					<h1 className="text-2xl font-bold tracking-widest">R E D I R E C T I N G ...</h1>
				</div>
			)}
		</>
	)
}

export async function getServerSideProps({ req }) {
	try {
		const response = await axios.get(`${API_URL}/current-user`, {
			headers: { credentials: "include", referer: FRONT_URL, cookie: req.headers.cookie }
		});
		const { currentUser } = response.data;
		return {
			props: {
				page: {
					title: currentUser.name,
				},
				currentUser
			}
		}
	} catch (error) {
		console.log("e", error.response);
		return {
			redirect: {
				destination: "/",
				permanent: true
			}
		};
	}
}
