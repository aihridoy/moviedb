import Header from "@/components/Header";
import RandomPicker from "@/components/RandomPicker";

export const metadata = {
    title: "Random Movie Picker | MovieDB",
    description: "Can't decide what to watch? Let us pick for you.",
};

export default function RandomPage() {
    return (
        <>
            <Header />
            <main className="container mx-auto px-4 pt-28 pb-12 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-2 text-center">Can&apos;t decide what to watch?</h1>
                <p className="text-gray-400 mb-8 text-center">Pick a genre (or not) and let fate choose.</p>
                <RandomPicker />
            </main>
        </>
    );
}
