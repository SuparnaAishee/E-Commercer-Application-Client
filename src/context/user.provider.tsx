// import {
//   createContext,
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// import { IUser } from "../types/global";
// import { getCurrentUser } from "../services/Auth";

// export const UserContext = createContext<IUserContext | undefined>(undefined);

// interface IUserContext {
//   isUserLoading: boolean;
//   setIsUserLoading: Dispatch<SetStateAction<boolean>>;
//   user: IUser | null;
//   setUser: (user: IUser | null) => void;
//   showCompareModal: boolean;
//   setShowCompareModal: Dispatch<SetStateAction<boolean>>;
// }

// const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [showCompareModal, setShowCompareModal] = useState(false);
//   const [isUserLoading, setIsUserLoading] = useState(true);
//   const [user, setUser] = useState<IUser | null>(null);

//   const handleUser = async () => {
//     const user = await getCurrentUser();
//     setUser(user);
//     setIsUserLoading(false);
//   };

//   useEffect(() => {
//     handleUser();
//   }, [isUserLoading]);

//   return (
//     <UserContext.Provider
//       value={{
//         isUserLoading,
//         setIsUserLoading,
//         setUser,
//         user,
//         showCompareModal,
//         setShowCompareModal,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (context === undefined || context === null) {
//     throw new Error("useUser must be used within the userProvider context");
//   }
//   return context;
// };

// export default UserProvider;
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { IUser } from "../types/global";
import { getCurrentUser } from "../services/Auth";

export const UserContext = createContext<IUserContext | undefined>(undefined);

interface IUserContext {
  isUserLoading: boolean;
  setIsUserLoading: Dispatch<SetStateAction<boolean>>;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  showCompareModal: boolean;
  setShowCompareModal: Dispatch<SetStateAction<boolean>>;
  cartOpen: boolean;
  setCartOpen: Dispatch<SetStateAction<boolean>>;
  chatOpen: boolean;
  setChatOpen: Dispatch<SetStateAction<boolean>>;
}

const UserProvider = ({
  children,
  initialUser = null,
}: {
  children: ReactNode;
  initialUser?: IUser | null;
}) => {
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(initialUser);

  const handleUser = async () => {
    const fetched = await getCurrentUser();
    setUser(fetched as IUser | null);
    setIsUserLoading(false);
  };

  useEffect(() => {
    if (isUserLoading) handleUser();
  }, [isUserLoading]);

  return (
    <UserContext.Provider
      value={{
        isUserLoading,
        setIsUserLoading,
        setUser,
        user,
        showCompareModal,
        setShowCompareModal,
        cartOpen,
        setCartOpen,
        chatOpen,
        setChatOpen,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined || context === null) {
    throw new Error("useUser must be used within the userProvider context");
  }
  return context;
};

export default UserProvider;