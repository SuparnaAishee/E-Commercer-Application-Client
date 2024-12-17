import Link from "next/link";
import { BiHome } from "react-icons/bi";

const BreadCrumbs = () => {
  return (
    <div className="container py-5 flex items-center">
      <Link href="/" className="flex  items-center">
        <span className="text-primary">
          <BiHome size={20} />
        </span>
        <span>
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6l-6-6z"
            ></path>
          </svg>
        </span>
      </Link>
      <Link href="/admin" className="text-secondary text-[13px] sm:text-base">
        User
      </Link>
    </div>
  );
};

export default BreadCrumbs;
