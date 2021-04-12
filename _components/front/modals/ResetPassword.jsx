import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';
import { CHANGE_PASSWORD_MODAL } from '../../../pages/kaontiko';
import { API_URL } from '../../../_constants/URLs';
import sanctumRequest from '../../../_helpers/sanctumRequest';
import UserContext from '../../../_react-contexts/user-context';
import InputLabel from '../../admin/posts/fields/InputLabel'

function ResetPassword({ setShowModal, setInModal }) {

	// C O N T E X T S
	const { user } = React.useContext(UserContext);

	// S T A T E S
	const [errors, setErrors] = React.useState({
		email: null, token: null, password: null, confirm_password: null
	});
	const [loading, setLoading] = React.useState(false);

	// R E F S
	const emailRef = user ? null : React.useRef();
	const tokenRef = React.useRef();
	const passwordRef = React.useRef();
	const confirmPasswordRef = React.useRef();

	// M E T H O D S
	const handleRequestToken = () => sanctumRequest(
		async () => {
			if (loading) return;
			setErrors({ ...errors, email: null });
			setLoading(true);
			const email = user ? user.email : emailRef.current.value;
			const response = await axios.post(`${API_URL}/reset-password/send-token`, { email });
			const { messages } = response.data;
			messages.forEach(message => toast.success(message));
		},
		error => setErrors({ ...errors, email: error.response.data.message }),
		() => setLoading(false)
	);

	const handleResetPassword = () => sanctumRequest(
		async () => {
			if (loading) return;
			setErrors({ email: null, token: null, password: null, confirm_password: null });
			setLoading(true);
			const email = user ? user.email : emailRef.current.value;
			const token = tokenRef.current.value;
			const password = passwordRef.current.value;
			const confirm_password = confirmPasswordRef.current.value;
			const response = await axios.put(`${API_URL}/reset-password`, { email, token, password, confirm_password });
			const { message } = response.data;
			toast.success(message);
			setShowModal(false);
		},
		error => {
			const response = error.response;
			const { data, status } = response;

			// Invalid data sent to the api
			if (status === 422) {
				const e = {};
				const errorsData = data.errors;
				if (errorsData.email) e.email = errorsData.email[0];
				if (errorsData.token) e.token = errorsData.token[0];
				if (errorsData.password) e.password = errorsData.password[0];
				if (errorsData.confirm_password) e.confirm_password = errorsData.confirm_password[0];
				setErrors({ ...errors, ...e });
			}
			// Else
			else setErrors({ ...errors, token: data.message });
		},
		() => setLoading(false)
	);

	return (
		<>
			<div className="font-semibold border-b border-gray-200 bg24 p-2 rounded-t-lg flex justify-center">
				<h2 className="text-uppercase tracking-widest text-lg">Tenimiafina adino :(</h2>
			</div>
			<div className="px-3 py-2 bg-black text-xs relative">
				{loading && <div className="absolute w-full h-full bg-black bg-opacity-70 flex justify-center items-center text-2xl font-bold tracking-widest">
					L O A D I N G . . .
				</div>}
				{!user && <InputLabel type="email" fieldRef={emailRef} label="Email anao" id="reset_password_email" errorNeeds={[errors, setErrors, "email"]} className="mb-3">
					Email
        </InputLabel>}
				<div className="mb-2">
					<button className="w-full success-bg success-bg-hover font-semibold py-1 rounded-lg" onClick={handleRequestToken}>
						HANGATAKA TOKEN
				</button>
					{user && errors.email && <small className="text-red-400 font-bold tracking-wider text-xs mt-1 block text-center">{errors.email}</small>}
				</div>
				<InputLabel fieldRef={tokenRef} label="Token avy tany @ email anao" id="reset_password_token" errorNeeds={[errors, setErrors, "token"]} className="mb-3">
					Token
        </InputLabel>
				<InputLabel type="password" fieldRef={passwordRef} label="Tenimiafina vaovao" id="reset_password_new" errorNeeds={[errors, setErrors, "password"]} className="mb-3">
					Tenimiafina
        </InputLabel>
				<InputLabel type="password" fieldRef={confirmPasswordRef} label="Avereno lay tenimiafina" id="reset_password_confirm" errorNeeds={[errors, setErrors, "confirm_password"]} className="mb-3">
					Tenimiafina
        </InputLabel>
				<button className="w-full py-1 rounded-lg twitter-bg twitter-bg-hover font-bold tracking-widest" onClick={handleResetPassword}>
					A L E F A
				</button>
				<p className="text-center text-sm font-semibold mt-2 twitter twitter-hover hover:underline cursor-pointer" onClick={() => setInModal(CHANGE_PASSWORD_MODAL)}>
					Fantatro ny tenimiafina ako
				</p>
			</div>
		</>
	)
}

export default ResetPassword
