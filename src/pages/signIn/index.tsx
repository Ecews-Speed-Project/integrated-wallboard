import { FunctionComponent, useCallback, useState } from 'react';
import styles from './Style.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/authContext ';

const SignIn: FunctionComponent = () => {
	const [email, setUsername] = useState('delta@speed.com');
	const [password, setPassword] = useState('P@ssw0rd');
	const navigate = useNavigate();
	const { login } = useAuth();


	const onFrameImageClick = useCallback(() => {
		// Add your code here
	}, []);

	const onSignInClick = useCallback(async () => {

		try {
			//navigate('/summary')
			const response = await fetch('http://eboard.ecews.org/api/account/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (response.ok) {
				const data = await response.json();
				// Assume the response contains a token
				localStorage.setItem('user', JSON.stringify(data));
				login()
				navigate('/summary'); // Redirect to the dashboard or another page
			} else {
				alert('Authentication failed. Please check your credentials.');
			}
		} catch (error) {
			console.error('Error during authentication', error);
			alert('An error occurred. Please try again later.');
		}
	}, [email, password, navigate]);



	return (
		<div className={styles.signIn}>
			<div className={styles.signInChild} />
			<div className={styles.signInItem} />
			<div className={styles.signInParent}>
				<b className={styles.signIn1}>Sign In</b>
				<div className={styles.textFieldParent}>
					<div className={styles.textField}>
						<div className='col-md-12'>
							<input type='text' className='form-control col-md-12' value={email}
								onChange={(e) => setUsername(e.target.value)} />

						</div>
						<div className={styles.label}>
							<b className={styles.label1}>Username</b>
						</div>
					</div>
					<div className={styles.textField1}>
						<div className='col-md-12'>
							<input type='text' className='form-control col-md-12' value={password}
								onChange={(e) => setPassword(e.target.value)} />
						</div>
						<div className={styles.label2}>
							<b className={styles.label1}>Password</b>
						</div>
					</div>
					<div className='col-md-12'>
						<button className='col-md-12 buttons' onClick={onSignInClick}>Sign In</button>
					</div>
				</div>
			</div>
			<div className={styles.parent}>
				<b className={styles.b}>10:46</b>
				<b className={styles.july2024}>16 July, 2024</b>
			</div>
			<div className={styles.group}>
				<b className={styles.b1}>1000</b>
				<b className={styles.totalCases}>Total Cases</b>
			</div>
			<div className={styles.container}>
				<b className={styles.b1}>1000</b>
				<b className={styles.totalReached}>Total Reached</b>
			</div>
			<div className={styles.frameDiv}>
				<b className={styles.b1}>27</b>
				<b className={styles.totalStatesCovered}>Total States covered</b>
			</div>
			<div className={styles.integratedDiseaseParent}>
				<b className={styles.integratedDisease}>Integrated Disease</b>
				<b className={styles.b}>WALLBOARD</b>
			</div>
			<div className={styles.pepfarLogo1Parent}>
				<img className={styles.pepfarLogo1Icon} alt="" src="/images/cdc.svg" />
				<img className={styles.pngwing2Icon} alt="" src="/images/pepfar-logo.svg" />
				<img className={styles.icon} alt="" src="/images/nigeria.svg" />
				<img className={styles.pngwing1Icon} alt="" src="/images/ecews.svg" />
			</div>
			<b className={styles.poweredBy}>Powered by</b>
			<div className={styles.frameParent}>
				<img className={styles.frameChild} alt="" src="/images/slider/thumbnail/1.png" onClick={onFrameImageClick} />
				<img className={styles.frameChild} alt="" src="/images/slider/thumbnail/2.png" onClick={onFrameImageClick} />
				<img className={styles.frameInner} alt="" src="/images/slider/thumbnail/3.png" />
				<img className={styles.frameChild} alt="" src="/images/slider/thumbnail/4.png" onClick={onFrameImageClick} />
				<img className={styles.frameChild} alt="" src="/images/slider/thumbnail/5.png" onClick={onFrameImageClick} />
			</div>
		</div>);
};

export default SignIn;
