import Header from "@/components/Header";
import WatchHistory from "@/components/WatchHistory";

export const metadata = {
    title: "Watch History | MovieDB",
    description: "Movies you've watched.",
};

export default function HistoryPage() {
    return (
        <>
            <Header />
            <main className="container mx-auto px-4 pt-24 pb-12">
                <h1 className="text-3xl font-bold mb-8">Watch History</h1>
                <WatchHistory />
            </main>
        </>
    );
}
