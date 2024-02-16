import Link from "next/link";

interface Props {
  title: string;
  path: string;
}

const LinkButton = ({ title, path }: Props) => {
  return (
    <>
      <Link
        className="bg-gray-900 no-underline hover:bg-gray-800 text-white py-2 px-4 rounded-md"
        href={path}
      >
        {title}
      </Link>
    </>
  );
};

export default LinkButton;
