"use client";
import {
	createContext,
	useState,
	useEffect,
	ReactNode,
	useMemo,
	useContext,
} from "react";
import { useRouter } from "next/navigation";

interface IAuthenticationContextProps {
	isAuthenticated: boolean;
	setIsAuthenticated: (value: boolean) => void;
}

interface IAuthenticationProviderProps {
	children: ReactNode;
}

const AuthenticationContext = createContext<IAuthenticationContextProps>({
	isAuthenticated: false,
	setIsAuthenticated: () => {},
});

const AuthenticationProvider: React.FC<IAuthenticationProviderProps> = ({
	children,
}) => {
	const [isAuthenticated, _setIsAuthenticated] = useState<boolean>(false);

	const setIsAuthenticated = (value: boolean) => {
		_setIsAuthenticated(value);
	};

	const contextValue = useMemo(
		() => ({
			isAuthenticated,
			setIsAuthenticated,
		}),
		[isAuthenticated]
	);

	return (
		<AuthenticationContext.Provider value={contextValue}>
			{children}
		</AuthenticationContext.Provider>
	);
};

// Custom hook that shorthands the context!
export const useAuthentication = (): IAuthenticationContextProps => {
	return useContext(AuthenticationContext);
};

export default AuthenticationProvider;

