const LoadingSpinner = () => {
    return (
        <section className="flex flex-col items-center justify-center gap-6">
            <div className="relative h-28 w-28">
                {/* outer ring */}
                <div className="absolute inset-0 rounded-full border-4 border-red-600/20 border-t-red-600 animate-spin" />
                {/* inner ring, counter-rotating */}
                <div
                    className="absolute inset-3 rounded-full border-4 border-white/10 border-b-white animate-spin"
                    style={{ animationDirection: "reverse", animationDuration: "1.2s" }}
                />
                {/* pulsing core */}
                <div className="absolute inset-[38%] rounded-full bg-red-600 animate-ping" />
            </div>
            <p className="text-red-600 font-bold tracking-widest animate-pulse">LOADING</p>
        </section>
    );
};

export default LoadingSpinner;
