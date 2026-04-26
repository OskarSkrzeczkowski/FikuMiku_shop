import { HeroBanner } from './components/hero';
import { Bestsellers } from './components/bestsellers';
import { Categories } from './components/categories';

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