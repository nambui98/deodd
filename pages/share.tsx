import React from 'react'

type Props = {}

function share({ }: Props) {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Shared from my React app',
                    text: 'Check out this awesome content!',
                    url: 'https://www.example.com',
                });
                console.log('Shared successfully');
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            console.log('Share API not supported');
        }
    };

    return (
        <button onClick={handleShare}>
            Share
        </button>
    );
}

export default share