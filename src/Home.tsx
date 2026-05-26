import { HeroBanner } from './components/hero';
import { Bestsellers } from './components/bestsellers';
import { Categories } from './components/categories';


export default function Home() {
    return(
        <div>
                <HeroBanner/>
                <Categories />
                <Bestsellers />
        </div>
    );
}