import { useRouter } from "next/router";
import { FC, ReactElement, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { ContentContainer, PageBase, PageHead } from "@/components/layouts";
import { sendAmplitudeData } from "../lib/amplitude";
import { useOnScreen } from "../hooks/useOnScreen";
import { useAmplitudeCtx } from "../contexts/AmplitudeContext";
import { GetStaticProps } from "next";
import { IClickUpTask } from "../types/clickUp";
import {
  listClickUpTasksInListQuery,
  transformClickUpTaskToMemberDetails,
} from "../lib/clickUp";
import { TMemberDetails } from "../types/instill";
import { OurMembersSection } from "@/components/sections";

const SecureYourSpotSection = dynamic(() =>
  import("@/components/sections").then((mod) => mod.SecureYourSpotSection)
);

const StayInTheLoopSection = dynamic(() =>
  import("@/components/sections").then((mod) => mod.StayInTheLoopSection)
);

interface GetLayOutProps {
  page: ReactElement;
}

interface Props {
  members: TMemberDetails[];
}

const AboutPage: FC<Props> & {
  getLayout?: FC<GetLayOutProps>;
} = ({ members }) => {
  const router = useRouter();
  const { amplitudeIsInit } = useAmplitudeCtx();

  useEffect(() => {
    if (router.isReady && amplitudeIsInit) {
      sendAmplitudeData("hit_about_page", { type: "navigation" });
    }
  }, [router.isReady, amplitudeIsInit]);

  // Lazy loading SecureYourSpotBlock
  const secureYourSpotBlockRef = useRef<HTMLDivElement>();
  const [loadSecureYourSpotBlock, setLoadSecureYourSpotBlock] = useState(false);
  const secureYourSpotBlockOnScreen = useOnScreen(
    secureYourSpotBlockRef,
    !loadSecureYourSpotBlock,
    "100px"
  );

  useEffect(() => {
    if (!loadSecureYourSpotBlock && secureYourSpotBlockOnScreen) {
      setLoadSecureYourSpotBlock(true);
    }
  }, [secureYourSpotBlockOnScreen, loadSecureYourSpotBlock]);

  // Lazy loading StayInTheLoopSection
  const stayInTheLoopSectionRef = useRef<HTMLDivElement>();
  const [loadStayInTheLoopSection, setLoadStayInTheLoopSection] =
    useState(false);
  const stayInTheLoopSectionOnScreen = useOnScreen(
    secureYourSpotBlockRef,
    !loadStayInTheLoopSection,
    "100px"
  );

  useEffect(() => {
    if (!loadStayInTheLoopSection && stayInTheLoopSectionOnScreen) {
      setLoadStayInTheLoopSection(true);
    }
  }, [stayInTheLoopSectionOnScreen, loadStayInTheLoopSection]);

  return (
    <>
      <PageHead
        pageTitle="About us | Instill AI"
        pageDescription="Instill AI, founded in 2020 (June 11th 2020, to be more specific), provides no-/low-code tools to convert unstructured visual data to meaningful structured representations."
      />
      <ContentContainer>
        <div className="mx-auto flex w-full max-w-[1128px] flex-col">
          <div className="flex w-full pt-[87px] pb-[152px] sm:h-[584px] sm:py-0">
            <h1 className="instill-text-h1 m-auto max-w-[934px] text-center text-instillGrey05">
              Make Vision AI Accessible to Everyone
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-6">
            <div className="flex flex-col gap-y-5 rounded-[1px] bg-white p-10">
              <h2 className="instill-text-h2 mb-1 text-instillGrey95">
                Our Company
              </h2>
              <p className="instill-text-body text-instillGrey95">
                Instill AI, founded in 2020 (June 11th 2020, to be more
                specific), provides no-/low-code tools to convert unstructured
                visual data to meaningful structured representations. Users can
                integrate our service into their data stack, and start tapping
                into the wealth of their visual data and benefit from Vision AI
                in a snap.
              </p>
              <p className="instill-text-body text-instillGrey95">
                We are a small and ambitious team of passionate
                engineers/researchers sharing an unconventional culture fused by
                DevOps, MLOps and academic research lab. We are hands-on and
                love to automate everything. We care about our products and
                deliver to the highest standard.
              </p>
            </div>
            <div className="flex flex-col gap-y-5 rounded-[1px] bg-white p-10">
              <h2 className="instill-text-h2 text-instillGrey95">Our Value</h2>
              <div className="flex flex-col">
                <h3 className="instill-text-h3 text-instillGrey95">
                  User obsession
                </h3>
                <p className="instill-text-body text-instillGrey95">
                  We succeed only when our users succeed. Learning what can
                  really help our users and delivering the value they need will
                  always be Instill&#39;s highest interest.
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="instill-text-h3 text-instillGrey95">
                  High-performing company with shared values
                </h3>
                <p className="instill-text-body text-instillGrey95">
                  We always deliver more than expected. To achieve that, we are
                  the optimisers obsessively chasing intrinsic efficiency and
                  effectiveness.
                </p>
              </div>
            </div>
          </div>
        </div>
        <OurMembersSection members={members} marginBottom="mb-10" />
        <div ref={secureYourSpotBlockRef}>
          {loadSecureYourSpotBlock && (
            <SecureYourSpotSection bgColor="black" layout="main" />
          )}
        </div>
        <div className="mb-20" ref={stayInTheLoopSectionRef}>
          {loadStayInTheLoopSection && <StayInTheLoopSection />}
        </div>
      </ContentContainer>
    </>
  );
};

AboutPage.getLayout = (page) => {
  return <PageBase>{page}</PageBase>;
};

export default AboutPage;

export const getStaticProps: GetStaticProps = async () => {
  let tasks: IClickUpTask[];
  let members: TMemberDetails[] = [];

  try {
    tasks = await listClickUpTasksInListQuery("181513244");
    tasks.forEach((task) => {
      members.push(transformClickUpTaskToMemberDetails(task));
    });
    members = members.sort((a, b) => a.order - b.order);
  } catch (err) {
    console.error("Something went wrong when retrieve member on Clickup", err);
  }

  return {
    props: {
      members,
    },

    // This page is using ISR
    revalidate: 10,
  };
};