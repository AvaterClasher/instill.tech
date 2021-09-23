import { FC } from "react";

interface Props {}

const GetAccessButton: FC<Props> = () => {
  return (
    <button
      className="px-6 py-2 border border-gray-700 rounded-md"
    >
      Get access
    </button>
  )
}

export default GetAccessButton