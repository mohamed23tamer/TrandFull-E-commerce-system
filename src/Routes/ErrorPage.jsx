import { FiAlertOctagon } from "react-icons/fi";

function ErrorPage() {
  return (
    <>
      <div className="w-[100%] h-[100%] top-[0px] left-[0px] ">
        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50%]">
          <div className=" text-[bold] mx-auto w-fit">
            <div className="text-[60px] text-center space-x-5 text-red-600 flex justify-center items-center">
              <FiAlertOctagon />
              <p>404</p>
            </div>

            <p className="text-[20px] text-center">Not Found</p>

            <p className="text-center">
              The resource requested not found on this server!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
