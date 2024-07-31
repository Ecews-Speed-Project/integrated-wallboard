export const auth = () => {
    const user = JSON.parse(localStorage.getItem('user') as string);
	return user
}