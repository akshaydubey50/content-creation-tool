import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import VisitWebsite from "../visit-website/VisitWebsite";

export default function Shimmer() {
  return (
    <>
      <div
        className="rounded-2xl max-w-sm  flex flex-col  border border-black 
        border-solid  shadow-2xl"
      >
        <section className="border-b border-black border-solid w-full">
          <div
            // loading="lazy"
            /*    width="1280"
            height="720" */
            // decoding="async"
            // data-nimg="1"
            className="w-[1280] h-[720] rounded-t-2xl object-cover"
          />
        </section>

        <section className="bg-light-gray pt-7 px-5 rounded-b-2xl h-full">
          <div className="flex flex-col justify-between h-full">
            <div className="">
              <div className="pb-4 flex flex-1 flex-row justify-between">
                <div className="flex items-center gap-x-2">
                  <div
                    className="font-bold text-Title-Medium md:text-Title-Large 
                  w-40 bg-gray-400 px-8 h-6 "
                  ></div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="text-Description">
                <p>Description</p>
              </div>
            </div>
            <div className="tool-btn-section pb-7">
              <p
                className="my-6 bg-white rounded-full  text-tags font-medium border 
              border-solid border-black px-5 py-1"
              >
                Tags
              </p>
              <div
                className="text-white text-Title-Medium  flex 
        justify-between items-center"
              >
                <VisitWebsite url="" />
                <button title="Bookmark" type="button">
                  <BsBookmark className="text-3xl   text-black" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
