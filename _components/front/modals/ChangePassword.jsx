import axios from 'axios';
import React from 'react'
import { RiLockPasswordLine, RiLockUnlockLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { RESET_PASSWORD_MODAL } from '../../../pages/kaontiko';
import { API_URL } from '../../../_constants/URLs';
import sanctumRequest from '../../../_helpers/sanctumRequest';
import InputLabel from '../../admin/posts/fields/InputLabel'
import InputForm from '../../simple-components/InputForm';

function ChangePassword({ setShowModal, setInModal }) {

	// S T A T E S
	const [errors, setErrors] = React.useState({
		current: null, new: null, confirm_new: null
	});
	const [showPassword, setShowPassword] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	const [currentPassword, setCurrentPassword] = React.useState("");
	const [newPassword, setNewPassword] = React.useState("");
	const [confirmNewPassword, setConfirmNewPassword] = React.useState("");

	// M E T H O D S
	const clearError = (property) => setErrors({ ...errors, [property]: null })

	const handleChangePassword = () => sanctumRequest(
		async () => {
			if (loading) return;
			setErrors({ current: null, new: null, confirm_new: null });
			setLoading(true);
			const response = await axios.put(`${API_URL}/change-password`, {
				current: currentPassword, new: newPassword, confirm_new: confirmNewPassword
			});
			const { message } = response.data;
			toast.success(<>{message}</>);
			setShowModal(false);
		},
		error => {
			const response = error.response;
			const { data, status } = response;

			// Invalid data sent to the api
			if (status === 422) {
				const e = {};
				const errorsData = data.errors;
				if (errorsData.current) e.current = errorsData.current[0];
				if (errorsData.new) e.new = errorsData.new[0];
				if (errorsData.confirm_new) e.confirm_new = errorsData.confirm_new[0];
				setErrors({ ...errors, ...e });
			}
		},
		() => setLoading(false)
	);

	return (
		<>
			<h2 className="text-center text-uppercase tracking-widest font-bold border-b border-gray-200 bg24 py-2 rounded-t-lg text-lg">Hanova tenimiafina</h2>
			<div className="px-3 py-2 bg-black text-xs">
				<InputForm
					label="Tenimiafina zao" type={!showPassword ? "password" : "text"} id="current-password" loading={loading}
					state={[currentPassword, setCurrentPassword]} error={errors.current}
					clearError={() => clearError("current")} marginBottom="mb-8"
					icon={
						<RiLockUnlockLine
							className={`absolute right-2 top-1 text-xl transition-color ease-in-out duration-200 cursor-pointer ${focus ? "twitter" : (errors.current ? "text-red-400" : "")}`}
							onClick={() => setShowPassword(!showPassword)}
						/>
					}
				/>
				<InputForm
					label="Tenimiafina vaovao" type={!showPassword ? "password" : "text"} id="new-password" loading={loading}
					state={[newPassword, setNewPassword]} error={errors.new}
					clearError={() => clearError("new")} marginBottom="mb-8"
					icon={
						<RiLockPasswordLine
							className={`absolute right-2 top-1 text-xl transition-color ease-in-out duration-200 cursor-pointer ${focus ? "twitter" : (errors.new ? "text-red-400" : "")}`}
							onClick={() => setShowPassword(!showPassword)}
						/>
					}
				/>
				<InputForm
					label="Tenimiafina vaovao" type={!showPassword ? "password" : "text"} id="confirm-new-password" loading={loading}
					state={[confirmNewPassword, setConfirmNewPassword]} error={errors.confirm_new}
					clearError={() => clearError("confirm_new")} marginBottom="mb-8"
					icon={
						<RiLockPasswordLine
							className={`absolute right-2 top-1 text-xl transition-color ease-in-out duration-200 cursor-pointer ${focus ? "twitter" : (errors.confirm_new ? "text-red-400" : "")}`}
							onClick={() => setShowPassword(!showPassword)}
						/>
					}
				/>
				<button className="w-full py-1 rounded-lg twitter-bg twitter-bg-hover text-center font-bold tracking-widest text-base" onClick={handleChangePassword}>
					A L E F A
				</button>
				<p className="twitter twitter-hover text-sm font-semibold text-center mt-2 hover:underline cursor-pointer" onClick={() => setInModal(RESET_PASSWORD_MODAL)}>
					Tenimiafina adino ?
				</p>
			</div>
		</>
	)
}

export default ChangePassword
