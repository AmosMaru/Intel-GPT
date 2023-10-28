import { useState, useEffect } from "react"
import {baseURL} from "../data.json"

function Image({path}){
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        fetch(baseURL+`/image/${path}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const imageUrl = URL.createObjectURL(blob);
                setImageSrc(imageUrl);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
            });
    }, []);

    return (
        <div>
            {imageSrc && <img src={imageSrc} alt="Server Image" />}
        </div>
    );
}
export default function Home(){
    let [images, setImages] = useState(null)

    useEffect(() => {
        fetch(`${baseURL}/imageList`)
            .then(res => res.json())
            .then(data => setImages(data.response))
            .catch(err => console.log(err))
    }, []);

    return (
        <div class="p-4 rounded-lg border-gray-700 mt-14 lg:mt-16 lg:overflow-y-none">
            <div className="grid grid-cols-3 gap-4">
                {
                    images &&
                    images.map(file => {
                        return <Image path={file} />
                    })
                }
            </div>
        </div>
    )
}