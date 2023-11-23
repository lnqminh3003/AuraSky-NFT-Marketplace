import { useEffect, useState } from "react";
import { HOST } from "../../../utils/constant";
// import CardNFT from "./card-nfts";
// import Loading from "./loading";

export default function Highlight() {
    const [error, setError] = useState<any | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(`${HOST}/nft/get-all`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    function sideScroll(
        element: any,
        direction: any,
        speed: any,
        distance: any,
        step: any
    ) {
        let scrollAmount = 0;
        var slideTimer = setInterval(function () {
            if (direction == "left") {
                element.scrollLeft -= step;
            } else {
                element.scrollLeft += step;
            }
            scrollAmount += step;
            if (scrollAmount >= distance) {
                if (window !== undefined) {
                    window.clearInterval(slideTimer);
                }
            }
        }, speed);
    }
}
// const ScreenSizeDetector = require("screen-size-detector");
// const screen = new ScreenSizeDetector();
// let slideWidth = screen.width * 0.2;
// screen.setMainCallback("widthchange", () => {
//   slideWidth = screen.width * 0.2;
// });