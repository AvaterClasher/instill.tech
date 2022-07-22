import { FC } from "react";
import { ReactMDWrapper } from "../../ReactMDWrapper";

export type PolicyPageLayoutProps = {
  content: string;
};

const PolicyPageLayout: FC<PolicyPageLayoutProps> = ({ content }) => {
  return (
    <div className="flex w-full bg-instillGrey95">
      <div className="max-w-[1440px] md:mx-auto md:grid md:w-10/12 md:grid-cols-3">
        <ReactMDWrapper
          styleName="prose-white mx-5 md:mx-0 mt-[180px] mb-[60px] md:col-span-2"
          content={content}
        />
        <div className="relative md:col-span-1 md:mt-[180px]">
          <div className="mb-40 flex flex-col gap-y-2 px-4 pt-40 md:sticky md:top-0 md:mb-0 md:px-16">
            <p className="text-instillGrey05">
              We&apos;re happy to hear from you. Get in touch at
            </p>
            <a
              className="flex text-instillBlue50"
              href="mailto:hello@instill.tech"
            >
              hello@instill.tech
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyPageLayout;