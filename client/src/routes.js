import CreateQuote from "./components/Quotes/createQuote/CreateQuote";
import Login from "./components/login-user/Login/Login";
import Register from "./components/login-user/Register/Register";
import Profile from "./components/Profile/Profile";
import GetAllQuotes from "./components/Quotes/getAllQuotes/getAllQuotes";


export const routes = [
    { path: '/', element: <GetAllQuotes /> },
    { path: '/create-quote', element: <CreateQuote /> },
    { path: '/profile', element: <Profile /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
]