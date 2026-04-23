import { HeroBanner } from './components/hero';
import { Categories, Bestsellers } from './components/sections';

/*Komponent sekcji głównych na stronie głównej sklepu*/
export default function Home() {
    return(
        <div>
                <HeroBanner/>
                <Categories />
                <Bestsellers />
        </div>
    );
}