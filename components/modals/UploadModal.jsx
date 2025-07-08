import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import { url } from "@/constants/url";
import toast, { Toaster } from "react-hot-toast";

function UploadModal({ onClose, isOpen, shortName, fileFullName, extfields, title, filePath }) {
  
  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  const [getImage, setImage] = useState(null);

  //File Upload Handler

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [closeBtn, setCloseBtn] = useState(null);
  const ref = useRef();
  let endpoints ;

  const config = {
    onUploadProgress: (progressEvent) => {
      setProgress((prev) => {
        return { ...prev, pc: progressEvent.progress * 100 };
      });
    }
  };

  const reset = () => {
    ref.current.value = "";
  };

  //Check file Size Limit

  const checkFileSize = (file) => {
    const maxSize = 9000000;
    if (file.size > maxSize) {
      toast.error("Image Size Must be Less than 400 KB");
      return false;
    }
    return true;
  };

  const handleFileUpload = async (e) => {
    try {
      if (!file) {
        toast.error("No File Selected");
        return;
      }

      if (!checkFileSize(file)) {
        return;
      }

      function getFileExtension(filename) {
        if (typeof filename !== "string") {
          console.error("Invalid input. Expected a string.");
          return "";
        }

        const parts = filename.split(".");
        if (parts.length > 1) {
          return parts[parts.length - 1];
        } else {
          return "";
        }
      }

      const renamedBlob = new Blob([file], { type: file?.type });

      const fd = new FormData();
      fd.append("myFile", renamedBlob, `${fileFullName}.${getFileExtension(file?.name)}`);
      setMsg("Uploading....");
      setCloseBtn(true);
      setProgress((prev) => {
        return { ...prev, started: true };
      });
      if(filePath =="dealer"){
        endpoints = `file_path=dealer&c_id=${extfields.c_id}&d_id=${extfields.d_id}&app_date=${extfields.app_date}&appl_no=${extfields.appl_no}&doc_type=${shortName}`
      }
      if(filePath =="employee"){
        endpoints = `file_path=employee&c_id=${extfields.c_id}&e_id=${extfields.e_id}&app_date=${extfields.app_date}&appl_no=${extfields.appl_no}&doc_type=${shortName}`
      }
      axios.post(
          `${url}/api/upload_file/?${endpoints}`,
          fd,
          config
        )
        .then((res) => {
          setMsg("Upload Successful");
          setTimeout(() => {
            setProgress({ started: false, pc: 0 });
            setFile(null);
            reset();
            setMsg(null);
            setCloseBtn(false);
          }, 2000);
          console.log(res.data);
        })
        .catch((err) => {
          const message = err?.response?.data
          if(message){
            toast.error(message)
            setCloseBtn(false);
          }
        }
      );
    } catch (error) {
      console.log("ee", error);
     

    }
  };

  const closeButtonHandler = () => {
    onClose(false);
    setProgress({ started: false, pc: 0 });
    setMsg(null);
  };


  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" font-arial  max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-[1.14rem] font-bold leading-6 text-center text-gray-900"
                  >
                    Upload {title}
                  </Dialog.Title>
                  <div className="my-4">
                    <input
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      id="picture"
                      name="picture"
                      type="file"
                      multiple
                      ref={ref}
                      accept=".png,.jpg,.pdf, .doc, .docx, .xlsx"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-full">
                    {progress.started && (
                      <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 ">
                        <div
                          className="bg-orange-600 text-xs h-4 font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                          style={{ width: `${Math.floor(progress.pc)}%` }}
                        >
                          {`${Math.floor(progress.pc)} %`}
                        </div>
                      </div>
                    )}
                    <div className="py-1">{msg && <span>{msg}</span>}</div>
                  </div>

                  <div className="mt-1  flex items-center justify-between py-3">
                    <button
                      type="button"
                      disabled={closeBtn}
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-1.5 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        handleFileUpload();
                      }}
                    >
                      Upload
                    </button>
                    <button
                      type="button"
                      disabled={closeBtn}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => closeButtonHandler()}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default UploadModal;
