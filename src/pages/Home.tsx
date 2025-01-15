import Carousel from "../components/Carousel";
import BookSection from "../components/BookSection";
import { carouselImages, bookSections } from "../js/homeData";

const Home = () => {
    return (
        <div className="h-[150vh]">
            <section className="my-12">
                <Carousel images={carouselImages} />
            </section>

            <section className="container mx-auto flex flex-wrap">
                {bookSections.map((section, index) => (
                    <BookSection key={index} title={section.title} items={section.items} />
                ))}
            </section>
        </div>
    );
};

export default Home;
