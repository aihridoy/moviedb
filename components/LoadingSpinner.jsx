import spinner from "/public/spinner.svg";
import Image from "next/image";

const LoadingSpinner = () => {
    return (
        <section className="flex items-center justify-center">
            <Image
                width={500}
                height={500}
                src={spinner}
                alt="Loading..."
                className="animate-spin w-16 h-16"
            />
        </section>
    );
};

export default LoadingSpinner;
