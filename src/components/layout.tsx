import { Outlet } from 'react-router-dom';
import { HeaderTop } from '../navComponents/header';
import { Footer } from './sections';

/*Komponent który określa stały szablon strony*/
export const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <HeaderTop />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};