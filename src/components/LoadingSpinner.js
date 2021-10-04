import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const LoadingSpinner = () => {
    return <>
    <Loader
        type="ThreeDots"
        color="#F7F7C5"
        height={50}
        width={50}
        timeout={10000} //3 secs
      />
    </>
}
 
export default LoadingSpinner;