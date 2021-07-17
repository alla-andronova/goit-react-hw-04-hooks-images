import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

export default function Spiner() {
  return (
    <div className="wrapper">
      <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={100}
        width={300}
        timeout={30000} //3 secs
      />
    </div>
  );
}
