"use client"

import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
} from "next-share";

const SocialShare = ({ currentUrl, movie }) => {
    return (
        <div className="flex flex-wrap gap-4">
            <FacebookShareButton url={currentUrl}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={currentUrl} title={movie.title}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={currentUrl} title={movie.title} summary={movie.overview}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
        </div>
    );
};

export default SocialShare;